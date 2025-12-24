const fs = require('fs');

// Read showcase/all/page.tsx
const allPageContent = fs.readFileSync('app/showcase/all/page.tsx', 'utf8');

// Read showcase/list/page.tsx
const listPageContent = fs.readFileSync('app/showcase/list/page.tsx', 'utf8');

// Count components in showcase/all by counting "title:" occurrences
const allMatches = allPageContent.match(/title:\s*"/g);
const allCount = allMatches ? allMatches.length : 0;

// Count components in showcase/list by counting "title:" occurrences
const listMatches = listPageContent.match(/title:\s*"/g);
const listCount = listMatches ? listMatches.length : 0;

console.log('='.repeat(50));
console.log('COMPONENT COUNT ANALYSIS');
console.log('='.repeat(50));
console.log(`Showcase /all page: ${allCount} components`);
console.log(`Showcase /list page: ${listCount} components`);
console.log(`Difference: ${Math.abs(allCount - listCount)} components`);
console.log('='.repeat(50));

if (allCount !== listCount) {
    console.log('\n⚠️  MISMATCH DETECTED!\n');
    
    // Extract all titles from both files
    const allTitles = [...allPageContent.matchAll(/title:\s*"([^"]+)"/g)].map(m => m[1]);
    const listTitles = [...listPageContent.matchAll(/title:\s*"([^"]+)"/g)].map(m => m[1]);
    
    // Find missing in list
    const missingInList = allTitles.filter(t => !listTitles.includes(t));
    if (missingInList.length > 0) {
        console.log('Missing in /list page:');
        missingInList.forEach(title => console.log(`  - ${title}`));
        console.log('');
    }
    
    // Find missing in all
    const missingInAll = listTitles.filter(t => !allTitles.includes(t));
    if (missingInAll.length > 0) {
        console.log('Missing in /all page:');
        missingInAll.forEach(title => console.log(`  - ${title}`));
        console.log('');
    }
} else {
    console.log('\n✅ Counts match! Both pages have the same number of components.\n');
}
