import re, json

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

# Generate the output file
lines = ['MODULE_QUESTIONS = {']
for mid in sorted(all_modules.keys()):
    qjson = json.dumps(all_modules[mid], ensure_ascii=False)
    lines.append(f'    "{mid}": json.dumps({qjson}),')
lines.append('}')
lines.append('')

with open(r'D:\Genlayer-project\lurna\module_questions_output.py', 'w', encoding='utf-8') as out:
    out.write('\n'.join(lines))

print(f'Written {len(all_modules)} modules to module_questions_output.py')
