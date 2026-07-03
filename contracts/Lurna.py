# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *
import json
import re as regex_mod


def _clean_json(text: str) -> str:
    backticks = "``" + "`"
    text = text.replace(backticks + "json", "").replace(backticks, "")
    return text.strip()


def _parse_ai_scores(raw: any, expected_count: int) -> list | None:
    """Extract list of {score: N} from AI response. Returns None on failure."""
    if isinstance(raw, list):
        if all(isinstance(x, dict) and "score" in x for x in raw):
            return raw
        if all(isinstance(x, (int, float)) for x in raw):
            return [{"score": int(x)} for x in raw]
        return None
    if isinstance(raw, dict):
        for v in raw.values():
            if isinstance(v, list):
                return _parse_ai_scores(v, expected_count)
        return None
    if isinstance(raw, str):
        text = _clean_json(raw)
        try:
            return _parse_ai_scores(json.loads(text), expected_count)
        except (json.JSONDecodeError, ValueError):
            pass
        match = regex_mod.search(r"\[[\s\S]*\]", text)
        if match:
            try:
                return _parse_ai_scores(json.loads(match.group(0)), expected_count)
            except (json.JSONDecodeError, ValueError):
                pass
        return None
    return None


class Lurna(gl.Contract):
    # ── Evaluation ──
    evaluations: TreeMap[u256, str]
    total_evaluations: u256

    # ── Scores & leaderboard ──
    all_attempts: TreeMap[u256, str]
    student_attempts: TreeMap[str, str]
    best_scores: TreeMap[str, str]
    total_best_scores: TreeMap[str, u256]
    leaderboard_students: DynArray[str]
    total_attempts: u256

    # ── Certificates ──
    certificates: TreeMap[u256, str]
    student_certs: TreeMap[str, str]
    total_supply: u256

    # ── Display names ──
    display_names: TreeMap[str, str]

    # ── Admin ──
    admin: str

    def __init__(self, owner_address: str):
        self.admin = owner_address
        self.total_evaluations = 0
        self.total_attempts = 0
        self.total_supply = 0

    # ───────── helpers ─────────

    def _grade_from_pct(self, pct: u256) -> str:
        if pct >= 90:
            return "A"
        elif pct >= 80:
            return "B"
        elif pct >= 70:
            return "C"
        else:
            return "F"

    def _tier_from_grade(self, grade: str) -> str:
        if grade == "A":
            return "Platinum"
        elif grade == "B":
            return "Gold"
        elif grade == "C":
            return "Silver"
        else:
            return "Not Passed"

    # ───────── views ─────────

    @gl.public.view
    def get_evaluation(self, eval_id: u256) -> str:
        if eval_id in self.evaluations:
            return self.evaluations[eval_id]
        return "{}"

    @gl.public.view
    def get_total_evaluations(self) -> u256:
        return self.total_evaluations

    @gl.public.view
    def get_attempt(self, attempt_id: u256) -> str:
        if attempt_id in self.all_attempts:
            return self.all_attempts[attempt_id]
        return "{}"

    @gl.public.view
    def get_student_attempts(self, student: str) -> str:
        return self.student_attempts.get(student, "[]")

    @gl.public.view
    def get_student_best_scores(self, student: str) -> str:
        return self.best_scores.get(student, "{}")

    @gl.public.view
    def get_student_total_best_score(self, student: str) -> u256:
        return self.total_best_scores.get(student, u256(0))

    @gl.public.view
    def get_leaderboard(self, limit: u256) -> str:
        entries = []
        for student in self.leaderboard_students:
            total = self.total_best_scores.get(student, u256(0))
            if total == 0:
                continue
            raw_scores = self.best_scores.get(student, "{}")
            try:
                scores = json.loads(raw_scores)
            except:
                scores = {}
            passed = 0
            best_grade = "F"
            best_val = 99
            for mod_id, s in scores.items():
                if s.get("passed", False):
                    passed += 1
                pct = s.get("percentage", 0)
                if pct < best_val:
                    best_val = pct
                    best_grade = s.get("grade", "F")
            entries.append({
                "student": student,
                "handle": self.display_names.get(student, ""),
                "total_best_score": int(total),
                "modules_passed": passed,
                "certificates_earned": passed,
                "highest_grade": best_grade,
            })
        entries.sort(key=lambda e: e["total_best_score"], reverse=True)
        return json.dumps(entries[:int(limit)])

    @gl.public.view
    def get_total_attempts(self) -> u256:
        return self.total_attempts

    @gl.public.view
    def get_leaderboard_count(self) -> u256:
        return u256(len(self.leaderboard_students))

    @gl.public.view
    def get_certificate(self, cert_id: u256) -> str:
        if cert_id in self.certificates:
            return self.certificates[cert_id]
        return "{}"

    @gl.public.view
    def get_student_certificates(self, student: str) -> str:
        ids_str = self.student_certs.get(student, "[]")
        try:
            ids = json.loads(ids_str)
        except:
            return "[]"
        certs = []
        for cert_id in ids:
            raw = self.certificates.get(u256(int(cert_id)), "")
            if raw:
                try:
                    certs.append(json.loads(raw))
                except:
                    pass
        return json.dumps(certs)

    @gl.public.view
    def get_total_supply(self) -> u256:
        return self.total_supply

    @gl.public.view
    def verify_certificate(self, cert_id: u256, student: str) -> bool:
        if cert_id not in self.certificates:
            return False
        try:
            meta = json.loads(self.certificates[cert_id])
            return meta.get("student") == student
        except:
            return False

    # ───────── writes ─────────

    @gl.public.write
    def submit_quiz(
        self,
        student: str,
        module_id: str,
        category: str,
        course: str,
        questions: str,
        points_per_question: u256,
        module_summary: str,
    ) -> str:
        try:
            qs = json.loads(questions)
        except:
            return json.dumps({"error": "Invalid questions JSON"})

        num_q = len(qs)
        total_score = u256(0)
        max_score = u256(0)
        for q in qs:
            max_score += u256(int(q.get("points", 20)))

        scores_data = json.loads(self._evaluate_all(module_summary, qs, num_q))

        for i in range(num_q):
            q = qs[i]
            q_pts = u256(int(q.get("points", 20)))
            score_val = u256(int(scores_data[i].get("score", 0))) if i < len(scores_data) else u256(0)
            total_score += (score_val * q_pts) // u256(100)
            eval_id = self.total_evaluations + 1
            self.evaluations[eval_id] = json.dumps({
                "question": q.get("question", ""),
                "student_answer": q.get("student_answer", ""),
                "correct_answer": q.get("correct_answer", ""),
                "score": int(score_val),
            })
            self.total_evaluations = eval_id

        percentage = u256(0)
        if max_score > 0:
            percentage = (total_score * u256(100)) // max_score

        passed = percentage >= 70
        attempt_id = self.total_attempts + 1

        attempt = {
            "attempt_id": int(attempt_id),
            "student": student,
            "module_id": module_id,
            "category": category,
            "course": course,
            "score": int(total_score),
            "max_score": int(max_score),
            "percentage": int(percentage),
            "passed": passed,
            "timestamp": gl.message_raw["datetime"],
        }
        self.all_attempts[attempt_id] = json.dumps(attempt)

        student_ids = json.loads(self.student_attempts.get(student, "[]"))
        student_ids.append(int(attempt_id))
        self.student_attempts[student] = json.dumps(student_ids)
        self.total_attempts = attempt_id

        raw_scores = self.best_scores.get(student, "{}")
        try:
            scores = json.loads(raw_scores)
        except:
            scores = {}
        old_total = self.total_best_scores.get(student, u256(0))

        if module_id in scores:
            existing = scores[module_id]
            if int(percentage) <= existing.get("percentage", 0):
                return json.dumps(attempt)
            old_total -= u256(existing.get("percentage", 0))

        grade = self._grade_from_pct(percentage)
        scores[module_id] = {
            "module_id": module_id,
            "category": category,
            "course": course,
            "percentage": int(percentage),
            "score": int(total_score),
            "max_score": int(max_score),
            "passed": passed,
            "grade": grade,
            "earned_at": gl.message_raw["datetime"],
        }
        self.best_scores[student] = json.dumps(scores)

        new_total = old_total + percentage
        self.total_best_scores[student] = new_total

        if student not in self.leaderboard_students:
            self.leaderboard_students.append(student)

        if passed:
            tier = self._tier_from_grade(grade)
            cert_id = self.total_supply + 1
            meta = {
                "student": student,
                "category": category,
                "course": course,
                "score": int(total_score),
                "grade": grade,
                "tier": tier,
                "timestamp": gl.message_raw["datetime"],
                "attempt_id": int(attempt_id),
            }
            self.certificates[cert_id] = json.dumps(meta)
            self.total_supply = cert_id
            cert_ids = json.loads(self.student_certs.get(student, "[]"))
            cert_ids.append(int(cert_id))
            self.student_certs[student] = json.dumps(cert_ids)

        return json.dumps(attempt)

    def _evaluate_all(self, summary: str, questions_list: list, num_q: int) -> str:
        lines = []
        for i, q in enumerate(questions_list):
            qtype = q.get("type", "mcq")
            sa = str(q.get("student_answer", "")).strip()
            ca = str(q.get("correct_answer", "")).strip()
            if qtype == "essay":
                lines.append(
                    f"Q{i+1} (Essay): {q.get('question', '')}\n"
                    f"Student: {'(no answer)' if not sa else sa}\n"
                )
            else:
                lines.append(
                    f"Q{i+1} (MCQ): {q.get('question', '')}\n"
                    f"Correct: {ca}\n"
                    f"Student: {'(no answer)' if not sa else sa}\n"
                )
        prompt = (
            "Grade this mixed quiz. Rules per question type:\n"
            "- MCQ: if student_answer equals correct_answer → score 100, else 0\n"
            "- Essay: evaluate quality, depth, and relevance → score 0-100\n"
            "- Empty student_answer → score 0\n\n"
            f"Context: {summary}\n\n"
            + "\n".join(lines) +
            "\nReturn ONLY a JSON array like [{\"score\": 100}, {\"score\": 0}, ...]"
        )

        def leader_fn() -> list:
            raw = gl.nondet.exec_prompt(prompt)
            return _parse_ai_scores(raw, num_q)

        def validator_fn(leader_res) -> bool:
            return isinstance(leader_res, gl.vm.Return)

        ai_result = gl.vm.run_nondet_unsafe(leader_fn, validator_fn)

        if isinstance(ai_result, list) and len(ai_result) == num_q:
            return json.dumps(ai_result)

        fallback = []
        for q in questions_list:
            qtype = q.get("type", "mcq")
            if qtype == "essay":
                sa = str(q.get("student_answer", "")).strip()
                fallback.append({"score": 50 if sa else 0})
            else:
                sa = str(q.get("student_answer", "")).strip()
                ca = str(q.get("correct_answer", "")).strip()
                fallback.append({"score": 100 if sa and sa == ca else 0})
        return json.dumps(fallback)

    # ───────── display name ─────────

    @gl.public.write
    def set_display_name(self, student: str, name: str) -> str:
        if len(name) < 1 or len(name) > 32:
            return json.dumps({"error": "Name must be 1-32 characters"})
        self.display_names[student] = name
        return json.dumps({"name": name, "address": student})

    @gl.public.view
    def get_display_name(self, address: str) -> str:
        return self.display_names.get(address, "")

    @gl.public.write
    def transfer_admin(self, new_admin: str):
        if str(gl.message.sender_address) != self.admin:
            return
        self.admin = new_admin
