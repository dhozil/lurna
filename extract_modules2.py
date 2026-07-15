import re, json, sys

files = [
    r'D:\Genlayer-project\lurna\src\data\content.tsx',
    r'D:\Genlayer-project\lurna\src\data\content-extra.tsx',
    r'D:\Genlayer-project\lurna\src\data\content-extra2.tsx',
]

all_modules = {}
for f in files:
    with open(f, 'r', encoding='utf-8') as fh:
        text = fh.read()
    
    eq_positions = [m.end() for m in re.finditer(r'essayQuestions:\s*\[', text)]
    
    for pos in eq_positions:
        depth = 1
        i = pos
        while depth > 0 and i < len(text):
            if text[i] == '[':
                depth += 1
            elif text[i] == ']':
                depth -= 1
            i += 1
        eq_end = i - 1
        eq_content = text[pos:eq_end]
        
        before_text = text[:pos]
        # Find all id matches - use raw string carefully
        id_matches = list(re.finditer(r'id:\s*"([^"]+)"', before_text))
        if not id_matches:
            continue
        last_id = id_matches[-1].group(1)
        
        questions = []
        q_blocks = re.finditer(r'\{\s*id:\s*"([^"]+)"\s*[^}]*?question:\s*"((?:[^"\\]|\\.)*)"', eq_content, re.DOTALL)
        for qb in q_blocks:
            q_id = qb.group(1)
            q_text = qb.group(2)
            questions.append({'id': q_id, 'question': q_text})
        
        if questions:
            all_modules[last_id] = questions

print(f'Total unique modules: {len(all_modules)}', file=sys.stderr)
for mid in sorted(all_modules.keys()):
    qs = all_modules[mid]
    print(f'{mid}: {len(qs)} questions', file=sys.stderr)
