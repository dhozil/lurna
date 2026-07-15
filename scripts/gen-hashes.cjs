const fs = require("fs");
const path = require("path");

function checksum(text) {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = (h * 31 + text.charCodeAt(i)) >>> 0;
  }
  return String(h);
}

function parseModules(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const modules = [];

  // Split by essayQuestions marker
  const parts = content.split("essayQuestions: [");
  parts.shift(); // remove everything before first essayQuestions

  for (const part of parts) {
    // Extract question texts from this block
    const qs = [];
    const qRegex = /question:\s*"((?:[^"\\]|\\.)*)"/g;
    let m;
    while ((m = qRegex.exec(part)) !== null) {
      qs.push(m[1]);
    }
    if (qs.length === 0) continue;

    // Extract module id by looking backward for `id: "xxx"`
    const beforeIdx = content.indexOf("essayQuestions: [");
    // Walk backwards through the content before this essayQuestions
    const blockBefore = part.substring(0, part.indexOf("essayQuestions: [") >= 0 ? 0 : 500);
    
    // Better: get the substring before this essayQuestions marker in the original content
    // Use the full content and find the last `id: "xxx"` before this essayQuestions
    const fullBefore = content.substring(0, content.indexOf(part));
    const idMatch = fullBefore.match(/id:\s*"([^"]+)"/g);
    const moduleId = idMatch ? idMatch[idMatch.length - 1].replace(/id:\s*"/, "").replace(/"$/, "") : "";

    if (moduleId) {
      modules.push({ id: moduleId, questions: qs });
    }
  }
  return modules;
}

const srcDir = path.join(__dirname, "..", "src", "data");
const files = ["content.tsx", "content-extra.tsx", "content-extra2.tsx"];
const allModules = [];

for (const f of files) {
  const fp = path.join(srcDir, f);
  if (fs.existsSync(fp)) {
    const mods = parseModules(fp);
    allModules.push(...mods);
  }
}

console.error(`Total modules: ${allModules.length}`);
const entries = allModules.map((mod) => {
  const combined = mod.questions.join("|||");
  const h = checksum(combined);
  return `    "${mod.id}": "${h}"`;
});

console.log("MODULE_HASHES = {");
console.log(entries.join(",\n"));
console.log("}");
