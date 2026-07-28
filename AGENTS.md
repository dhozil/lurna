<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Goal
Build a complete GenLayer-powered learning platform (Lurna) with AI-consensus essay grading, on-chain certificates, leaderboard, and wallet-based identity.

## Constraints & Preferences
- GenLayer contracts in Python using `genlayer` SDK
- Frontend: TanStack Start (React), TypeScript, TailwindCSS, Shadcn UI, Vite
- Search params for filtering instead of dynamic route segments
- npm for local dev
- Single unified contract for all platform logic
- **StudioNet** — gasless, `response_format="json"` works
- `/assessments` route with `?category`, `?module`, `?tab` search params
- **Wallet required** — no quiz without connected wallet
- **Display name required** — prompt right after connect
- **Essay only** — all MCQ removed
- **No answer key anywhere** — only AI consensus grades essays
- `submit_quiz` binds sender via `gl.message.sender_address`, no `student` parameter
- **Questions verified by content hash** — rolling hash per module computed from raw question texts joined by `|||`
- **Consensus failures excluded** — `total_score == 0` returns error
- No admin functionality
- Web URL: `https://lurna.pages.dev`
- **Comparative `run_nondet_unsafe` pattern** — each validator re-runs `leader_fn()` independently, ±12 tolerance
- **`str` param type for `answers`/`questions`** with dual fallback parsing: `json.loads` → `split("|||")`
- **`response_format="json"` primary** on StudioNet, falls back to `exec_prompt(prompt)` biasa
- **`json.dumps` with Address objects** — must `str(student)` before including in JSON; raw Address is not JSON-serializable

## Progress
### Done
- MCQ/quiz content removed — 154 modules, all essay-only, 3 per module
- All frontend pages updated to essay-only flow
- Hash-based question verification with `_checksum` rolling hash (Java `String.hashCode()` algorithm)
- `submit_quiz` accepts `str` for `questions` and `answers`, tries `json.loads` first, falls back to `split("|||")`, verifies hash on `"|||".join(questions)` before grading
- Consensus failure guard: `total_score == 0` returns error, no state recorded
- **localStorage merge removed** — dashboard/certs/assessments read only from chain
- **Error taxonomy**: all error returns include `"type":"EXTERNAL"` / `"LLM_ERROR"` / `"CONSENSUS_FAILURE"` / `"TRANSIENT"`
- **Frontend retry logic**: `submitQuiz` auto-retries 3x on transient errors with exponential backoff
- **Address serialization fix**: `str(student)` in `json.dumps`
- `response_format="json"` implemented as primary with fallback to plain `exec_prompt(prompt)`
- `MODULE_HASHES` regenerated and corrected
- Import `re` at file level
- **`_parse_response` fixed**: handles `list` and `dict` from `response_format="json"` directly, with existing string fallback chain
- **Tolerance reduced to 12** (was 30)
- **Full contract audit** (648 lines): no blockers found
- **Address encoding fixed**: patched `encodeImpl` in genlayer-js to auto-detect `0x`+40hex strings and encode as `SPECIAL_ADDR` (address type). Works for all address-param view functions.
- **`get_leaderboard` fixed**: changed `"student": student` to `"student": str(student)` at line 280 — raw `Address` object is not JSON-serializable, causing `json.dumps` to throw TypeError when `limit>0`. `limit=0` masked the bug since `entries[:0]` is empty `[]`.
- **All view functions WORK**: no-arg, address-param, and int-param calls all succeed
- **genlayer-js excluded from Vite pre-bundling** (`optimizeDeps.exclude`) — edits to `node_modules/genlayer-js/dist/index.js` are served directly without caching issues
- **Vite config**: uses `@lovable.dev/vite-tanstack-config` wrapper; additional Vite config passed via `vite: { ... }` key
- **Debug logs cleaned up** — removed `=== GENLAYER REQ/RES ===` and `testRead()` from production code
- **Dead code removed** — `getSchema()`, `testRead()`, constructor side-effects
- **Fail-closed grading**: removed all fallback passing scores (`[{"score": 75, "reasoning": "Auto-assigned"}]`) from `leader_fn` and `_evaluate_all`. Both now raise `RuntimeError` on failure, propagating to `submit_quiz` which returns `TRANSIENT` error before any state writes.
- **Module-specific grading prompt**: `module_id` passed to `_evaluate_all`, included in prompt so AI knows which module it's grading. Rubric criteria (depth, clarity, critical thinking, originality, detail) embedded in prompt.
- **Module_id in certificate metadata**: certificate records now include `module_id` field alongside existing student, category, course, score, grade, tier, attempt_id.
- **Failure path tests**: `contracts/test_failures.py` covers EXTERNAL (unknown module, hash mismatch, count mismatch, empty), LLM_ERROR, TRANSIENT, and CONSENSUS_FAILURE paths with assertions.

### In Progress
- Deploy updated contract to StudioNet (waiting for GenLayer project resubmission to open)

### Known Issues
- `dist/index.js` has the address encoding fix (auto-detect hex addresses); this file is served directly by Vite (not pre-bundled)
- `leaderboard_students` has 1 entry from previous test submissions; `get_leaderboard(0)` returns `[]`, `get_leaderboard(1)` returns the student data

## Key Decisions
- **Direct `dist/index.js` modification** — patched the original genlayer-js ESM source at `encodeImpl` `case "string"` to auto-detect addresses and encode as SPECIAL_ADDR
- **`CalldataAddress` internally available** — imported from chunk file, used inside `encodeImpl` for Special_ADDR encoding
- **Vite caching fix**: excluded genlayer-js from `optimizeDeps` so source modifications are served directly
- **Contract bug**: `"student": student` (raw Address) vs `"student": str(student)` — raw Address causes `json.dumps` failure
- **Fail-closed over fallback scores**: Instead of substituting `score: 75` when AI/consensus fails, `leader_fn` raises `RuntimeError`, causing full revert/TRANSIENT error with zero state writes.

## Next Steps
1. Wait for GenLayer project contribution type to reopen
2. Deploy updated contract (`contracts/Lurna.py` with fail-closed + module_id binding)
3. Resubmit with links to source (`contracts/Lurna.py`), test file (`contracts/test_failures.py`), and deployed contract address
4. Verify all failure paths end-to-end on StudioNet

## Critical Context
- **RPC endpoint**: `https://studio.genlayer.com/api`
- **Contract**: `0xD101ef58775FF960fFF3aE38E52fD16a5575c923` — deployed on StudioNet after `str(student)` fix
- **All view calls WORK**: no-arg, address-param, int-param
- **Address encoding fix**: Inserted at `case "string"` in `encodeImpl` (`dist/index.js`). Regex `/^0x[0-9a-fA-F]{40}$/` detects hex addresses, converts to 20-byte Uint8Array, encodes as `SPECIAL_ADDR` (0x18 + 20 raw bytes)
- **genlayer-js excluded from pre-bundling** via `vite.config.ts` → `vite: { optimizeDeps: { exclude: ['genlayer-js'] } }`
- **Tolerance = 12**
- **`_parse_response` handles 3 cases**: `list` (parsed JSON array), `dict` (wrapped results), `str` (existing fallback chain)
- **Storage types**: `leaderboard_students: DynArray[Address]`, `total_best_scores: TreeMap[Address, u256]`, `display_names: TreeMap[Address, str]`, `best_scores: TreeMap[Address, str]`

## Relevant Files
- `contracts/Lurna.py` — 648 lines, all platform logic. Line 280 fixed: `"student": str(student)`
- `src/lib/contracts/Lurna.ts` — LurnaContract class with `read()` wrapping genlayer-js `readContract`; all public API methods
- `src/lib/genlayer/config.ts` — `DEFAULT_CONTRACT = "0xD101ef58775FF960fFF3aE38E52fD16a5575c923"`
- `src/hooks/useLurnaContracts.ts` — TanStack Query hooks
- `.env` / `.env.production` / `.env.example` — `VITE_CONTRACT_LURNA=0xD101ef58775FF960fFF3aE38E52fD16a5575c923`
- `node_modules/genlayer-js/dist/index.js` — modified `encodeImpl` at `case "string"` for address encoding
- `vite.config.ts` — `vite: { optimizeDeps: { exclude: ['genlayer-js'] } }`

## GenLayer JS Read Contract
```
serializedData = serialize([encode(makeCalldataObject(functionName, callArgs, kwargs)), leaderOnly])
```
- `makeCalldataObject` creates `{method: fnName, args: callArgs}` (no `args` key when no params)
- `encode` walks the object tree, calling `encodeImpl` for each value
- `serialize` wraps in RLP
- No-arg calls omit the `args` key; with-arg calls include `args` as TYPE_ARR
