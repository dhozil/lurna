# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *
import json


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
    student_module_certs: TreeMap[str, str]  # "student:module_id" -> cert_id
    total_supply: u256

    # ── Display names ──
    display_names: TreeMap[str, str]

    def __init__(self):
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
            best_grade = "A"
            best_val = 0
            for mod_id, s in scores.items():
                if s.get("passed", False):
                    passed += 1
                pct = s.get("percentage", 0)
                if pct > best_val:
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
        module_id: str,
        category: str,
        course: str,
        answers: str,
        module_summary: str,
    ) -> str:
        try:
            qs = json.loads(answers)
        except:
            return '{"error":"Invalid answers JSON"}'

        student = str(gl.message.sender_address)
        num_q = len(qs)
        if num_q == 0:
            return '{"error":"No answers provided"}'

        total_score = u256(0)
        max_possible = u256(num_q * 100)

        try:
            scores_raw = self._evaluate_all(module_summary, qs, num_q)
            scores_data = json.loads(scores_raw)
            n = len(scores_data)
            if n > 0 and n == num_q:
                for i in range(num_q):
                    sd = scores_data[i]
                    sv = int(sd.get("score", 0)) if hasattr(sd, "get") else 0
                    if sv < 0: sv = 0
                    if sv > 100: sv = 100
                    total_score += u256(sv)
                    eval_id = self.total_evaluations + 1
                    ev = json.dumps({
                        "question": str(qs[i].get("question", "")),
                        "student_answer": str(qs[i].get("student_answer", "")),
                        "score": sv,
                        "reasoning": str(sd.get("reasoning", "")) if hasattr(sd, "get") else "",
                    })
                    self.evaluations[eval_id] = ev
                    self.total_evaluations = eval_id
            else:
                return '{"error":"AI evaluation returned invalid results"}'
        except:
            return '{"error":"AI evaluation failed"}'

        pct = (total_score * u256(100)) // u256(max_possible)
        passed = pct >= 70
        attempt_id = self.total_attempts + 1

        grade = self._grade_from_pct(pct)
        eval_start = self.total_evaluations - num_q + 1
        result = json.dumps({
            "attempt_id": int(attempt_id),
            "student": student,
            "module_id": module_id,
            "category": category,
            "course": course,
            "score": int(total_score),
            "max_score": int(max_possible),
            "percentage": int(pct),
            "passed": passed,
            "eval_start": int(eval_start),
        })
        self.all_attempts[attempt_id] = result

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
            if int(pct) <= existing.get("percentage", 0):
                return result
            old_total -= u256(existing.get("score", 0))

        scores[module_id] = {
            "module_id": module_id, "category": category, "course": course,
            "percentage": int(pct), "score": int(total_score), "max_score": int(max_possible),
            "passed": passed, "grade": grade,
        }
        self.best_scores[student] = json.dumps(scores)

        new_total = old_total + total_score
        self.total_best_scores[student] = new_total

        if student not in self.leaderboard_students:
            self.leaderboard_students.append(student)

        if passed:
            tier = self._tier_from_grade(grade)
            cert_key = student + ":" + module_id
            existing = self.student_module_certs.get(cert_key, "")
            if existing:
                cert_id = u256(int(existing))
            else:
                cert_id = self.total_supply + 1
                self.total_supply = cert_id
                self.student_module_certs[cert_key] = str(int(cert_id))
                cert_ids = json.loads(self.student_certs.get(student, "[]"))
                cert_ids.append(int(cert_id))
                self.student_certs[student] = json.dumps(cert_ids)
            meta = json.dumps({
                "student": student,
                "category": category,
                "course": course,
                "score": int(total_score),
                "max_score": int(max_possible),
                "percentage": int(pct),
                "grade": grade,
                "tier": tier,
                "attempt_id": int(attempt_id),
            })
            self.certificates[cert_id] = meta

        return result

    def _evaluate_all(self, summary: str, questions_list, num_q: int) -> str:
        parts = [f"Grade {num_q} essays 0-100.", f"Module: {summary}"]
        for i in range(num_q):
            q = questions_list[i]
            sa = str(q.get("student_answer", "")).strip()
            parts.append(f"Q{i+1}: {q.get('question', '')}\nA: {'(no answer)' if not sa else sa}")
        prompt = "\n".join(parts) + "\n\nFor each essay write a brief evaluation then give score.\nFormat:\nEssay 1: Strong analysis... Score: 85\nEssay 2: Lacks depth... Score: 72\nEssay 3: Good arguments... Score: 91"

        def leader_fn() -> list:
            try:
                raw = gl.nondet.exec_prompt(prompt)
                if isinstance(raw, str):
                    import re as _re
                    scores = _re.findall(r"Score:\s*(\d+)", raw)
                    if len(scores) >= num_q:
                        reasoning = _re.split(r"Score:\s*\d+", raw)
                        out = []
                        for i in range(num_q):
                            sv = max(0, min(100, int(scores[i])))
                            r = reasoning[i].strip() if i < len(reasoning) else ""
                            out.append({"score": sv, "reasoning": r})
                        return out
            except:
                pass
            return [{"score": 0, "reasoning": "AI evaluation failed"} for _ in range(num_q)]

        def validator_fn(leader_res) -> bool:
            if not isinstance(leader_res, gl.vm.Return):
                return False
            leader_data = leader_res.calldata
            try:
                n = len(leader_data)
            except:
                return False
            if n != num_q:
                return False
            mine = leader_fn()
            try:
                mn = len(mine)
            except:
                return False
            if mn != num_q:
                return False
            leader_zero = all(int(leader_data[i].get("score", 0)) == 0 for i in range(num_q))
            validator_zero = all(int(mine[i].get("score", 0)) == 0 for i in range(num_q))
            if leader_zero and validator_zero:
                return True
            for i in range(num_q):
                lv = int(leader_data[i].get("score", 0))
                mv = int(mine[i].get("score", 0))
                tol = 20
                if abs(lv - mv) > tol:
                    return False
            return True

        try:
            ai_result = gl.vm.run_nondet_unsafe(leader_fn, validator_fn)
            try:
                n = len(ai_result)
            except:
                n = 0
            if n == num_q:
                plain = []
                for i in range(num_q):
                    item = ai_result[i]
                    sv = int(item.get("score", 0)) if hasattr(item, "get") else int(item)
                    if sv < 0: sv = 0
                    if sv > 100: sv = 100
                    reasoning = str(item.get("reasoning", "")) if hasattr(item, "get") else ""
                    plain.append({"score": sv, "reasoning": reasoning})
                return json.dumps(plain)
        except:
            pass

        return json.dumps([{"score": 0, "reasoning": "AI evaluation failed"} for _ in range(num_q)])

    # ───────── display name ─────────

    @gl.public.write
    def set_display_name(self, name: str) -> str:
        if len(name) < 1 or len(name) > 32:
            return json.dumps({"error": "Name must be 1-32 characters"})
        student = str(gl.message.sender_address)
        self.display_names[student] = name
        return json.dumps({"name": name, "address": student})

    @gl.public.view
    def get_display_name(self, address: str) -> str:
        return self.display_names.get(address, "")
