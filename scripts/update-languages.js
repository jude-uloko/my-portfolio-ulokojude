#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Run tokei and get JSON output
const tokeiOutput = execSync('tokei . --files --output json', { encoding: 'utf-8' });
const stats = JSON.parse(tokeiOutput);

// Calculate totals
const languages = {};
let totalLines = 0;

for (const [lang, data] of Object.entries(stats)) {
  if (lang === 'total') continue;
  if (data.total) {
    languages[lang] = data.total;
    totalLines += data.total;
  }
}

// Sort by lines of code (descending)
const sorted = Object.entries(languages)
  .sort((a, b) => b[1] - a[1])
  .map(([lang, lines]) => ({
    lang,
    lines,
    percent: ((lines / totalLines) * 100).toFixed(1)
  }));

// Format as markdown table
let table = '| Language | Lines | Percentage |\n';
table += '|----------|-------|------------|\n';

sorted.forEach(({ lang, lines, percent }) => {
  table += `| ${lang} | ${lines.toLocaleString()} | ${percent}% |\n`;
});

// Read current README
const readmePath = path.join(__dirname, '..', 'README.md');
let content = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, 'utf-8') : '';

// Replace or insert language stats section
const marker = '<!-- LANGUAGE_STATS -->';
const endMarker = '<!-- END_LANGUAGE_STATS -->';
const newSection = `${marker}\n\n## 📊 Language Distribution\n\n${table}\n\n${endMarker}`;

if (content.includes(marker)) {
  // Replace existing section
  content = content.replace(
    new RegExp(`${marker}[\\s\\S]*?${endMarker}`),
    newSection
  );
} else {
  // Add new section at the end
  content = content.trim() + '\n\n' + newSection;
}

// Write back to README
fs.writeFileSync(readmePath, content, 'utf-8');

console.log('✅ Language stats updated in README.md');
console.log('\n' + table);
