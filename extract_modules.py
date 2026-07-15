#!/usr/bin/env python3
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
    
    # Strategy: find every module block that has an id and essayQuestions
    # We'll use a regex to find: id: "MODULE_ID", ... essayQuestions: [ { id: "...", question: "..." }, ... ]
    
    # First, find all essayQuestions array positions
    eq_positions = [m.end() for m in re.finditer(r'essayQuestions:\s*\[', text)]
    
    for pos in eq_positions:
        # Find the matching closing bracket
        depth = 1
        i = pos
        while depth > 0 and i < len(text):
            if text[i] == '[':
                depth += 1
            elif text[i] == ']':
                depth -= 1
            i += 1
        eq_end = i - 1  # position of the ']'
        eq_content = text[pos:eq_end]
        
        # Now find the module id that is BEFORE this essayQuestions block
        # Go backwards from 'essayQuestions' to find the nearest 'id: "..."' that is in a module context
        before_text = text[:pos]
        # Find all id matches before this position
        id_matches = list(re.finditer(r'id:\s*"([^"]+)"', before_text))
        if not id_matches:
            continue
        last_id = id_matches[-1].group(1)
        
        # Skip if it's a track or category id (checked later by seeing if the id appears inside a modules array)
        # We'll accept all ids and filter later
        
        # Now extract all essay question objects from eq_content
        # Each question looks like: { id: "...", question: "...", ... }
        questions = []
        
        # Find all question objects
        q_blocks = re.finditer(r'\{\s*id:\s*"([^"]+)"\s*[^}]*?question:\s*"((?:[^"\\]|\\.)*)"', eq_content)
        for qb in q_blocks:
            q_id = qb.group(1)
            q_text = qb.group(2)
            questions.append({"id": q_id, "question": q_text})
        
        if questions:
            if last_id not in all_modules:
                all_modules[last_id] = []
            all_modules[last_id].extend(questions)

# Output as Python dict string
lines = ['MODULE_QUESTIONS = {']
for mid in sorted(all_modules.keys()):
    qjson = json.dumps(all_modules[mid], ensure_ascii=False, indent=2)
    lines.append(f'    "{mid}": json.dumps({json.dumps(all_modules[mid], ensure_ascii=False)}),')
lines.append('}')

print('\n'.join(lines))
print(f'\n\n# Total modules: {len(all_modules)}', file=__import__('sys').stderr)
