function checksum(text: string): string {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = (h * 31 + text.charCodeAt(i)) >>> 0;
  }
  return String(h);
}

// Extract module data directly from compiled data
// We'll use the categoriesData exports
import { categoriesData } from "../src/data/all-data";

const modules: { id: string; questionTexts: string[] }[] = [];

for (const cat of categoriesData) {
  for (const track of cat.tracks) {
    for (const mod of track.modules) {
      modules.push({
        id: mod.id,
        questionTexts: mod.essayQuestions.map((q: { question: string }) => q.question),
      });
    }
  }
}

console.error(`Total modules: ${modules.length}`);

const entries: string[] = modules.map((mod) => {
  const combined = JSON.stringify(mod.questionTexts);
  const h = checksum(combined);
  return `    "${mod.id}": "${h}"`;
});

console.log("MODULE_HASHES = {");
console.log(entries.join(",\n"));
console.log("}");
