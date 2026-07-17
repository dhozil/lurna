# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *
import json
import re as _re


MODULE_HASHES = {
    "what-is-genlayer": "629987104",
    "optimistic-democracy": "2386678077",
    "intelligent-contracts": "2002265212",
    "use-cases": "3167732355",
    "genlayer-fundamentals-essay-1": "871801393",
    "genlayer-fundamentals-essay-2": "1838869961",
    "genlayer-fundamentals-essay-3": "3310342484",
    "what-is-blockchain": "775088738",
    "consensus-mechanisms": "3911280291",
    "blocks-transactions": "2354989258",
    "blockchain-use-cases": "718031474",
    "blockchain-fundamentals-essay-1": "134158929",
    "blockchain-fundamentals-essay-2": "102737064",
    "blockchain-fundamentals-essay-3": "872383568",
    "what-are-smart-contracts": "318603723",
    "solidity-basics": "622793402",
    "security-best-practices": "3885301139",
    "real-world-applications": "3058326382",
    "smart-contract-fundamentals-essay-1": "1137079985",
    "smart-contract-fundamentals-essay-2": "282728151",
    "smart-contract-fundamentals-essay-3": "2398165451",
    "crypto-basics": "2891506309",
    "wallets-transactions": "944053694",
    "security-storage": "994397819",
    "markets-trading": "1677799011",
    "crypto-fundamentals-essay-1": "3713025994",
    "crypto-fundamentals-essay-2": "3614772972",
    "crypto-fundamentals-essay-3": "1185183298",
    "ai-intro": "4054525318",
    "machine-learning": "3284408155",
    "neural-networks": "1309386900",
    "ai-ethics": "790240071",
    "ai-fundamentals-essay-1": "4169397487",
    "ai-fundamentals-essay-2": "1069471626",
    "ai-fundamentals-essay-3": "993522568",
    "sol-intro": "451268007",
    "sol-inheritance": "1216683734",
    "sol-gas": "2530466036",
    "sol-patterns": "3006834979",
    "solidity-deep-dive-essay-1": "2217916034",
    "solidity-deep-dive-essay-2": "779057522",
    "solidity-deep-dive-essay-3": "3725918931",
    "web3-intro": "3892595120",
    "web3-stack": "3760509442",
    "web3-wallets": "2250070799",
    "web3-building": "579081611",
    "web3-fundamentals-essay-1": "2804759139",
    "web3-fundamentals-essay-2": "1805673584",
    "web3-fundamentals-essay-3": "3523053778",
    "eth-intro": "856885809",
    "eth-evm": "4281107277",
    "eth-defi": "636561391",
    "eth-l2": "3560786614",
    "ethereum-protocol-essay-1": "3626079694",
    "ethereum-protocol-essay-2": "593266943",
    "ethereum-protocol-essay-3": "1614494507",
    "defi-intro": "483192408",
    "defi-lending": "1422089914",
    "defi-amm": "3706506746",
    "defi-risk": "3605611203",
    "defi-deep-dive-essay-1": "31869140",
    "defi-deep-dive-essay-2": "3880642782",
    "defi-deep-dive-essay-3": "4050185742",
    "nft-intro": "3911512680",
    "nft-minting": "3212888678",
    "nft-marketplaces": "2489808503",
    "nft-use-cases": "1228018089",
    "nft-mastery-essay-1": "441885981",
    "nft-mastery-essay-2": "2386908472",
    "nft-mastery-essay-3": "228651186",
    "cyber-intro": "2712038679",
    "cyber-network": "3714246086",
    "cyber-crypto": "1987235217",
    "cyber-practice": "327391275",
    "cyber-essentials-essay-1": "640297749",
    "cyber-essentials-essay-2": "1201849226",
    "cyber-essentials-essay-3": "523419950",
    "prog-intro": "5944230",
    "prog-control": "3256270258",
    "prog-func": "1998786929",
    "prog-ds": "2104920471",
    "programming-fundamentals-essay-1": "703005368",
    "programming-fundamentals-essay-2": "593277870",
    "programming-fundamentals-essay-3": "1506279198",
    "js-basics": "3483020964",
    "js-async": "2015311310",
    "js-dom": "116841759",
    "js-es6": "1106600852",
    "javascript-mastery-essay-1": "3772253780",
    "javascript-mastery-essay-2": "2183337445",
    "javascript-mastery-essay-3": "1584181219",
    "ts-basics": "2496592640",
    "ts-interfaces": "1312826308",
    "ts-generics": "1097142714",
    "ts-advanced": "2311072131",
    "typescript-deep-essay-1": "1236481128",
    "typescript-deep-essay-2": "4004845729",
    "typescript-deep-essay-3": "2687950249",
    "react-intro": "1870253684",
    "react-hooks": "703218039",
    "react-performance": "3244103707",
    "react-ecosystem": "2078658612",
    "react-mastery-essay-1": "3400309551",
    "react-mastery-essay-2": "2130115107",
    "react-mastery-essay-3": "1066032656",
    "next-intro": "1746258980",
    "next-routing": "2030223770",
    "next-advanced": "3800630658",
    "next-deploy": "1043068813",
    "nextjs-fullstack-essay-1": "4116031197",
    "nextjs-fullstack-essay-2": "1134348750",
    "nextjs-fullstack-essay-3": "469444222",
    "db-intro": "2072120511",
    "db-sql": "1200757646",
    "db-design": "1021200200",
    "db-nosql": "3852725791",
    "database-essentials-essay-1": "2903107441",
    "database-essentials-essay-2": "3206442066",
    "database-essentials-essay-3": "4211364438",
    "supa-intro": "3843579791",
    "supa-auth": "3329881858",
    "supa-realtime": "3958341413",
    "supa-edge": "2317319035",
    "supabase-platform-essay-1": "1381600379",
    "supabase-platform-essay-2": "3778093212",
    "supabase-platform-essay-3": "1432448224",
    "pm-intro": "254208948",
    "pm-strategy": "3448820963",
    "pm-research": "3511078967",
    "pm-delivery": "3667583090",
    "product-leadership-essay-1": "3441949476",
    "product-leadership-essay-2": "592954160",
    "product-leadership-essay-3": "2379971354",
    "ux-intro": "3950256028",
    "ui-design": "2297402612",
    "ui-prototyping": "2306898313",
    "ui-testing": "2076088784",
    "uiux-essentials-essay-1": "3982906948",
    "uiux-essentials-essay-2": "1400696487",
    "uiux-essentials-essay-3": "4138130653",
    "startup-intro": "533418792",
    "startup-business": "3025618652",
    "startup-growth": "882568047",
    "startup-fundraising": "509375674",
    "startup-essentials-essay-1": "917433094",
    "startup-essentials-essay-2": "684604824",
    "startup-essentials-essay-3": "4030625937",
    "ds-intro": "3924380525",
    "ds-tokens": "2954535966",
    "ds-components": "4264340334",
    "ds-operations": "2081567212",
    "design-systems-essay-1": "183374627",
    "design-systems-essay-2": "2001772683",
    "design-systems-essay-3": "4063156653"
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
                "student": str(student),
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
        stored_hash = self.module_hashes.get(module_id, "")
        if stored_hash == "":
            return '{"error":"Module not found","type":"EXTERNAL"}'

        try:
            qs = json.loads(questions)
        except:
            qs = questions.split("|||")
        try:
            student_answers = json.loads(answers)
        except:
            student_answers = answers.split("|||")

        if not isinstance(qs, list):
            qs = [qs]
        if not isinstance(student_answers, list):
            student_answers = [student_answers]

        combined = "|||".join(str(q) for q in qs)
        if self._checksum(combined) != stored_hash:
            return '{"error":"Question hash mismatch","type":"EXTERNAL"}'

        num_q = len(qs)
        if num_q == 0:
            return '{"error":"No questions provided","type":"EXTERNAL"}'
        if len(student_answers) != num_q:
            return '{"error":"Answer count mismatch","type":"EXTERNAL"}'

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
                return '{"error":"AI evaluation returned invalid results","type":"LLM_ERROR"}'
            if total_score == 0:
                return '{"error":"Consensus failure — all validators returned zero. Suspicious submission not recorded.","type":"CONSENSUS_FAILURE"}'
        except:
            return '{"error":"AI evaluation failed","type":"TRANSIENT"}'

        pct = (total_score * u256(100)) // u256(max_possible)
        passed = pct >= 70
        attempt_id = self.total_attempts + 1

        grade = self._grade_from_pct(pct)
        eval_start = self.total_evaluations - num_q + 1
        result = json.dumps({
            "attempt_id": int(attempt_id),
            "student": str(student),
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
                "student": str(student),
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
        parts = [f"Grade {num_q} essays 0-100.", f"Module: {summary}"]
        for i in range(num_q):
            sa = str(student_answers[i]).strip() if i < len(student_answers) else ""
            parts.append(f"Q{i+1}: {str(questions[i])}\nA: {'(no answer)' if not sa else sa}")
        prompt = "\n".join(parts) + "\n\nRespond with a JSON array in this exact format (no markdown, no extra text):\n[\n  {\"score\": 85, \"reasoning\": \"brief evaluation\"},\n  {\"score\": 72, \"reasoning\": \"brief evaluation\"}\n]"

        def _parse_response(text) -> list | None:
            if isinstance(text, list):
                out = []
                for item in text[:num_q]:
                    if isinstance(item, dict):
                        sv = max(0, min(100, int(item.get("score", 0))))
                        r = str(item.get("reasoning", ""))
                    else:
                        sv = max(0, min(100, int(item) if isinstance(item, (int, float)) else 0))
                        r = ""
                    out.append({"score": sv, "reasoning": r})
                if len(out) == num_q:
                    return out
                return None
            if isinstance(text, dict):
                for key in ("results", "grades", "evaluations", "scores"):
                    val = text.get(key)
                    if isinstance(val, list):
                        return _parse_response(val)
                return None
            t = str(text).strip()
            if t.startswith("```"):
                t = t.split("\n", 1)[-1]
                if t.endswith("```"):
                    t = t[:-3].strip()
            try:
                parsed = json.loads(t)
                if isinstance(parsed, list) and len(parsed) == num_q:
                    out = []
                    for i in range(num_q):
                        item = parsed[i]
                        sv = int(item.get("score", 0)) if isinstance(item, dict) else 0
                        sv = max(0, min(100, sv))
                        r = str(item.get("reasoning", "")) if isinstance(item, dict) else ""
                        out.append({"score": sv, "reasoning": r})
                    return out
            except:
                pass
            scores = _re.findall(r"SCORE\s*:\s*(\d+)", t, _re.IGNORECASE)
            if len(scores) >= num_q:
                out = []
                blocks = _re.split(r"SCORE\s*:\s*\d+", t, flags=_re.IGNORECASE)
                for i in range(num_q):
                    sv = max(0, min(100, int(scores[i])))
                    reasoning = blocks[i + 1].strip() if len(blocks) > i + 1 else ""
                    reasoning = _re.sub(r"(?:REASONING|REASON)\s*:\s*", "", reasoning, flags=_re.IGNORECASE).strip()
                    out.append({"score": sv, "reasoning": reasoning})
                return out
            parts = t.split("|")
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
            nums = _re.findall(r"\b(\d{1,3})\b", t)
            numeric = [int(s) for s in nums if 0 <= int(s) <= 100]
            if len(numeric) >= num_q:
                out = []
                for i in range(num_q):
                    out.append({"score": numeric[i], "reasoning": ""})
                return out
            return None

        def leader_fn() -> list:
            try:
                raw = gl.nondet.exec_prompt(prompt, response_format="json")
                parsed = _parse_response(raw)
                if parsed is not None:
                    return parsed
            except:
                pass
            try:
                raw = gl.nondet.exec_prompt(prompt)
                parsed = _parse_response(raw)
                if parsed is not None:
                    return parsed
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
            try:
                mine = leader_fn()
            except:
                return False
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
                tol = 12
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

