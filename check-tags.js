const fs = require('fs');

const content = fs.readFileSync('./lib/components-data.ts', 'utf8');
const lines = content.split('\n');

let inComponent = false;
let currentComponent = '';
let componentHasTags = false;
let componentsWithoutTags = [];

lines.forEach((line) => {
  if (line.includes('title:')) {
    if (inComponent && !componentHasTags) {
      componentsWithoutTags.push(currentComponent);
    }
    inComponent = true;
    const match = line.match(/title:\s*"([^"]+)"/);
    currentComponent = match ? match[1] : 'Unknown';
    componentHasTags = false;
  }
  if (line.includes('tags:')) {
    componentHasTags = true;
  }
});

if (inComponent && !componentHasTags) {
  componentsWithoutTags.push(currentComponent);
}

console.log(`\nComponents without tags: ${componentsWithoutTags.length}\n`);
componentsWithoutTags.slice(0, 15).forEach(c => console.log(`- ${c}`));
