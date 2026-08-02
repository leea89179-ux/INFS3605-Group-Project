import fs from 'fs';

const content = fs.readFileSync("src/components/PhoneSimulator.tsx", "utf8");
const lines = content.split("\n");

console.log("--- Scanning PhoneSimulator.tsx Expressions & Hardcoded Strings ---");

lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  // Look for hardcoded string literals inside JSX curly braces like {'Text'} or "Text" in ternary
  const ternaryMatches = line.matchAll(/\?\s*['"]([^'"]+)['"]\s*:\s*['"]([^'"]+)['"]/g);
  for (const tm of ternaryMatches) {
    if (!tm[0].includes("t(") && /[a-zA-Z]{3,}/.test(tm[1])) {
      console.log(`Line ${lineNum} Ternary: "${tm[1]}" / "${tm[2]}"`);
    }
  }

  // Look for strings inside JSX expression braces like >{ 'Some String' }< or { "Some String" }
  const braceMatches = line.matchAll(/\{\s*['"]([^'"]+)['"]\s*\}/g);
  for (const bm of braceMatches) {
    if (!bm[1].includes("t(") && /[a-zA-Z]{3,}/.test(bm[1])) {
      console.log(`Line ${lineNum} Brace String: "${bm[1]}"`);
    }
  }
});
