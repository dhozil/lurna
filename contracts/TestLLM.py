# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *
import json
import re

class TestLLM(gl.Contract):
    last_result: str

    def __init__(self):
        self.last_result = ""

    @gl.public.write
    def test_simple(self) -> str:
        def leader_fn():
            result = gl.nondet.exec_prompt("Say exactly 'HELLO_WORLD' and nothing else")
            return result.strip()

        def validator_fn(leader_res) -> bool:
            if not isinstance(leader_res, gl.vm.Return):
                return False
            try:
                mine = leader_fn()
            except:
                return False
            return mine == leader_res.calldata

        try:
            result = gl.vm.run_nondet_unsafe(leader_fn, validator_fn)
            self.last_result = str(result)
            return json.dumps({"ok": True, "result": str(result)})
        except Exception as e:
            return json.dumps({"ok": False, "error": str(e)})

    @gl.public.write
    def test_scoring(self) -> str:
        prompt = "Rate: 0-100. Essay: Blockchain is a distributed ledger. Return ONLY a number."

        def leader_fn():
            raw = gl.nondet.exec_prompt(prompt)
            text = str(raw).strip()
            import re as _re
            nums = _re.findall(r"\b(\d{1,3})\b", text)
            if nums:
                return max(0, min(100, int(nums[0])))
            return 75

        def validator_fn(leader_res) -> bool:
            if not isinstance(leader_res, gl.vm.Return):
                return False
            try:
                mine = leader_fn()
            except:
                return False
            lv = int(leader_res.calldata)
            mv = int(mine)
            if lv == 0 and mv == 0:
                return True
            return abs(lv - mv) <= 30

        try:
            result = gl.vm.run_nondet_unsafe(leader_fn, validator_fn)
            self.last_result = "score=" + str(result)
            return json.dumps({"ok": True, "score": int(result)})
        except Exception as e:
            return json.dumps({"ok": False, "error": str(e)})

    @gl.public.write
    def test_scoring_json(self) -> str:
        prompt = 'Rate this essay 0-100. Essay: Blockchain is a distributed ledger.\nReturn ONLY a JSON object with no extra text:\n{"score": N, "reasoning": "brief"}'

        def leader_fn():
            raw = gl.nondet.exec_prompt(prompt)
            text = str(raw).strip()
            if text.startswith("```"):
                text = text.split("\n", 1)[-1]
                if text.endswith("```"):
                    text = text[:-3].strip()
            try:
                parsed = json.loads(text)
                if isinstance(parsed, dict):
                    sv = int(parsed.get("score", 75))
                    return max(0, min(100, sv))
            except:
                pass
            nums = re.findall(r"\b(\d{1,3})\b", text)
            if nums:
                return max(0, min(100, int(nums[0])))
            return 75

        def validator_fn(leader_res) -> bool:
            if not isinstance(leader_res, gl.vm.Return):
                return False
            try:
                mine = leader_fn()
            except:
                return False
            lv = int(leader_res.calldata)
            mv = int(mine)
            if lv == 0 and mv == 0:
                return True
            return abs(lv - mv) <= 30

        try:
            result = gl.vm.run_nondet_unsafe(leader_fn, validator_fn)
            self.last_result = "json_score=" + str(result)
            return json.dumps({"ok": True, "score": int(result)})
        except Exception as e:
            return json.dumps({"ok": False, "error": str(e)})

    @gl.public.view
    def get_last_result(self) -> str:
        return self.last_result
