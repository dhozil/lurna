# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *
import json


MODULE_HASHES = {
"what-is-genlayer": "2623820666",
    "optimistic-democracy": "985185969",
    "intelligent-contracts": "4041795474",
    "use-cases": "2038760605",
    "genlayer-fundamentals-essay-1": "2581032219",
    "genlayer-fundamentals-essay-2": "1479463283",
    "genlayer-fundamentals-essay-3": "3985129270",
    "what-is-blockchain": "3303368022",
    "consensus-mechanisms": "1563080575",
    "blocks-transactions": "1959500932",
    "blockchain-use-cases": "2703470420",
    "blockchain-fundamentals-essay-1": "3452789907",
    "blockchain-fundamentals-essay-2": "127668626",
    "blockchain-fundamentals-essay-3": "1714218282",
    "what-are-smart-contracts": "3789000933",
    "solidity-basics": "3402094500",
    "security-best-practices": "3762185479",
    "real-world-applications": "2465555272",
    "smart-contract-fundamentals-essay-1": "3888267613",
    "smart-contract-fundamentals-essay-2": "3228275203",
    "smart-contract-fundamentals-essay-3": "3961737901",
    "crypto-basics": "2587577773",
    "wallets-transactions": "420772899",
    "security-storage": "3552766181",
    "markets-trading": "75715671",
    "crypto-fundamentals-essay-1": "2790153726",
    "crypto-fundamentals-essay-2": "4186025260",
    "crypto-fundamentals-essay-3": "1293922998",
    "ai-intro": "859929846",
    "machine-learning": "2251541621",
    "neural-networks": "1345373540",
    "ai-ethics": "1236414753",
    "ai-fundamentals-essay-1": "2807624337",
    "ai-fundamentals-essay-2": "1316916760",
    "ai-fundamentals-essay-3": "964768866",
    "sol-intro": "2485036489",
    "sol-inheritance": "2533370186",
    "sol-gas": "2549345678",
    "sol-patterns": "3921752829",
    "solidity-deep-dive-essay-1": "1576323958",
    "solidity-deep-dive-essay-2": "3272027118",
    "solidity-deep-dive-essay-3": "3234378037",
    "web3-intro": "177529562",
    "web3-stack": "1041585820",
    "web3-wallets": "1462657905",
    "web3-building": "2480848045",
    "web3-fundamentals-essay-1": "2425258135",
    "web3-fundamentals-essay-2": "578905426",
    "web3-fundamentals-essay-3": "1263228148",
    "eth-intro": "4206584027",
    "eth-evm": "2472484737",
    "eth-defi": "743169187",
    "eth-l2": "2897532064",
    "ethereum-protocol-essay-1": "4060712296",
    "ethereum-protocol-essay-2": "4234380649",
    "ethereum-protocol-essay-3": "813826573",
    "defi-intro": "1812675194",
    "defi-lending": "3882716790",
    "defi-amm": "3393467812",
    "defi-risk": "3412764781",
    "defi-deep-dive-essay-1": "1891012680",
    "defi-deep-dive-essay-2": "2426580114",
    "defi-deep-dive-essay-3": "2508243714",
    "nft-intro": "292330698",
    "nft-minting": "654292642",
    "nft-marketplaces": "562039961",
    "nft-use-cases": "378655443",
    "nft-mastery-essay-1": "2752210559",
    "nft-mastery-essay-2": "2518669530",
    "nft-mastery-essay-3": "654425948",
    "cyber-intro": "3428191225",
    "cyber-network": "4170266234",
    "cyber-crypto": "1957964339",
    "cyber-practice": "4208170711",
    "cyber-essentials-essay-1": "1779420369",
    "cyber-essentials-essay-2": "660148286",
    "cyber-essentials-essay-3": "3909981858",
    "prog-intro": "67340002",
    "prog-control": "4135200924",
    "prog-func": "2033266251",
    "prog-ds": "2626839481",
    "programming-fundamentals-essay-1": "600130194",
    "programming-fundamentals-essay-2": "4174137432",
    "programming-fundamentals-essay-3": "4157436736",
    "js-basics": "3568698494",
    "js-async": "2196379258",
    "js-dom": "651254555",
    "js-es6": "128299200",
    "javascript-mastery-essay-1": "4213629248",
    "javascript-mastery-essay-2": "3101715527",
    "javascript-mastery-essay-3": "745744709",
    "ts-basics": "1382523516",
    "ts-interfaces": "2116152990",
    "ts-generics": "2172295406",
    "ts-advanced": "3274779877",
    "typescript-deep-essay-1": "2463167442",
    "typescript-deep-essay-2": "2365388501",
    "typescript-deep-essay-3": "3870850901",
    "react-intro": "886027406",
    "react-hooks": "520409515",
    "react-performance": "3643967255",
    "react-ecosystem": "4036520240",
    "react-mastery-essay-1": "3263077611",
    "react-mastery-essay-2": "2648805911",
    "react-mastery-essay-3": "1978484018",
    "next-intro": "1370490896",
    "next-routing": "1537821702",
    "next-advanced": "2621857260",
    "next-deploy": "384592953",
    "nextjs-fullstack-essay-1": "916792529",
    "nextjs-fullstack-essay-2": "1224959272",
    "nextjs-fullstack-essay-3": "2678868760",
    "db-intro": "3874370985",
    "db-sql": "407727818",
    "db-design": "3928833394",
    "db-nosql": "1035800201",
    "database-essentials-essay-1": "2459007947",
    "database-essentials-essay-2": "2101037638",
    "database-essentials-essay-3": "1738914104",
    "supa-intro": "3718549305",
    "supa-auth": "13251172",
    "supa-realtime": "1625027809",
    "supa-edge": "856869095",
    "supabase-platform-essay-1": "2531342805",
    "supabase-platform-essay-2": "1940864336",
    "supabase-platform-essay-3": "1052518338",
    "pm-intro": "3323199712",
    "pm-strategy": "1580517701",
    "pm-research": "2798686827",
    "pm-delivery": "3575198356",
    "product-leadership-essay-1": "385572120",
    "product-leadership-essay-2": "1017879916",
    "product-leadership-essay-3": "106205446",
    "ux-intro": "2779216766",
    "ui-design": "2009425046",
    "ui-prototyping": "3427781949",
    "ui-testing": "2734762180",
    "uiux-essentials-essay-1": "4029369702",
    "uiux-essentials-essay-2": "2364287689",
    "uiux-essentials-essay-3": "2576366015",
    "startup-intro": "3670787228",
    "startup-business": "1776551888",
    "startup-growth": "2295981129",
    "startup-fundraising": "1764022676",
    "startup-essentials-essay-1": "3269964082",
    "startup-essentials-essay-2": "1697021588",
    "startup-essentials-essay-3": "291404787",
    "ds-intro": "3195451481",
    "ds-tokens": "2691601546",
    "ds-components": "4083377992",
    "ds-operations": "1678085334",
    "design-systems-essay-1": "3712021125",
    "design-systems-essay-2": "2385990389",
    "design-systems-essay-3": "2457877527"
}



class Lurna(gl.Contract):
    # ── Evaluation ──
    evaluations: TreeMap[u256, str]
    total_evaluations: u256

    # ── Scores & leaderboard ──
    all_attempts: TreeMap[u256, str]
    student_attempts: TreeMap[Address, str]
    best_scores: TreeMap[Address, str]
    total_best_scores: TreeMap[Address, u256]
    leaderboard_students: DynArray[Address]
    total_attempts: u256

    # ── Certificates ──
    certificates: TreeMap[u256, str]
    student_certs: TreeMap[Address, str]
    student_module_certs: TreeMap[str, str]  # "student:module_id" -> cert_id
    total_supply: u256

    # ── On-chain curriculum hashes ──
    module_hashes: TreeMap[str, str]

    # ── Display names ──
    display_names: TreeMap[Address, str]

    def __init__(self):
        self.total_evaluations = 0
        self.total_attempts = 0
        self.total_supply = 0
        for mid, h in MODULE_HASHES.items():
            self.module_hashes[mid] = h

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

    def _checksum(self, text: str) -> str:
        h = 0
        for c in str(text):
            h = (h * 31 + ord(c)) & 0xFFFFFFFF
        return str(h)

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
    def get_student_attempts(self, student: Address) -> str:
        return self.student_attempts.get(student, "[]")

    @gl.public.view
    def get_student_best_scores(self, student: Address) -> str:
        return self.best_scores.get(student, "{}")

    @gl.public.view
    def get_student_total_best_score(self, student: Address) -> u256:
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
    def get_student_certificates(self, student: Address) -> str:
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
        questions: str,
        module_summary: str,
    ) -> str:
        # Verify module exists on-chain
        stored_hash = self.module_hashes.get(module_id, "")
        if stored_hash == "":
            return '{"error":"Module not found"}'

        # Verify question integrity via checksum
        if self._checksum(questions) != stored_hash:
            return '{"error":"Question hash mismatch"}'

        try:
            qs = json.loads(questions)
        except:
            return '{"error":"Invalid questions JSON"}'

        try:
            student_answers = json.loads(answers)
        except:
            return '{"error":"Invalid answers JSON"}'

        if not isinstance(qs, list) or not isinstance(student_answers, list):
            return '{"error":"Questions and answers must be arrays"}'

        num_q = len(qs)
        if num_q == 0:
            return '{"error":"No questions provided"}'
        if len(student_answers) != num_q:
            return '{"error":"Answer count mismatch"}'

        student = gl.message.sender_address
        total_score = u256(0)
        max_possible = u256(num_q * 100)

        try:
            scores_raw = self._evaluate_all(module_summary, qs, student_answers, num_q)
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
                        "question": str(qs[i]),
                        "student_answer": str(student_answers[i]),
                        "score": sv,
                        "reasoning": str(sd.get("reasoning", "")) if hasattr(sd, "get") else "",
                    })
                    self.evaluations[eval_id] = ev
                    self.total_evaluations = eval_id
            else:
                return '{"error":"AI evaluation returned invalid results"}'
            if total_score == 0:
                return '{"error":"Consensus failure — all validators returned zero. Suspicious submission not recorded."}'
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
            cert_key = student.as_hex + ":" + module_id
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

    def _evaluate_all(self, summary: str, questions, student_answers, num_q: int) -> str:
        parts = [f"Grade {num_q} essays. Module: {summary}"]
        for i in range(num_q):
            sa = str(student_answers[i]).strip() if i < len(student_answers) else ""
            parts.append(f"\nEssay {i+1}:\nQuestion: {str(questions[i])}\nAnswer: {'(no answer)' if not sa else sa}")
        prompt = "\n".join(parts) + "\n\nFor each essay, respond with EXACTLY one line:\nSCORE: <0-100>\nREASONING: <brief>\n\nExample:\nSCORE: 85\nREASONING: Good analysis with clear examples\n\nNow grade all essays one by one:"

        def leader_fn() -> list:
            try:
                raw = gl.nondet.exec_prompt(prompt)
                text = str(raw) if not isinstance(raw, str) else raw
                text = text.strip()
                if text.startswith("```"):
                    text = text.split("\n", 1)[-1]
                    if text.endswith("```"):
                        text = text[:-3].strip()
                import re as _re
                scores = _re.findall(r"SCORE\s*:\s*(\d+)", text, _re.IGNORECASE)
                if len(scores) >= num_q:
                    out = []
                    blocks = _re.split(r"SCORE\s*:\s*\d+", text, flags=_re.IGNORECASE)
                    for i in range(num_q):
                        sv = max(0, min(100, int(scores[i])))
                        reasoning = blocks[i + 1].strip() if len(blocks) > i + 1 else ""
                        reasoning = _re.sub(r"(?:REASONING|REASON)\s*:\s*", "", reasoning, flags=_re.IGNORECASE).strip()
                        out.append({"score": sv, "reasoning": reasoning})
                    return out
                parts = text.split("|")
                if len(parts) >= num_q:
                    out = []
                    has_valid = False
                    for i in range(num_q):
                        nums = _re.findall(r"\b(\d{1,3})\b", parts[i])
                        val = 0
                        for n in nums:
                            iv = int(n)
                            if 0 <= iv <= 100:
                                val = iv
                                has_valid = True
                                break
                        out.append({"score": val, "reasoning": parts[i].strip()})
                    if has_valid:
                        return out
                nums = _re.findall(r"\b(\d{1,3})\b", text)
                numeric = [int(s) for s in nums if 0 <= int(s) <= 100]
                if len(numeric) >= num_q:
                    out = []
                    for i in range(num_q):
                        out.append({"score": numeric[i], "reasoning": ""})
                    return out
            except:
                pass
            return [{"score": 75, "reasoning": "Auto-assigned"} for _ in range(num_q)]

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
                tol = 30
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

        return json.dumps([{"score": 75, "reasoning": "Auto-assigned"} for _ in range(num_q)])

    # ───────── display name ─────────

    @gl.public.write
    def set_display_name(self, name: str) -> str:
        if len(name) < 1 or len(name) > 32:
            return json.dumps({"error": "Name must be 1-32 characters"})
        student = gl.message.sender_address
        self.display_names[student] = name
        return json.dumps({"name": name, "address": student.as_hex})

    @gl.public.view
    def get_display_name(self, address: Address) -> str:
        return self.display_names.get(address, "")

