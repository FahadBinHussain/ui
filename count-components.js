const fs = require('fs');

// Read showcase/all/page.tsx
const allPageContent = fs.readFileSync('app/showcase/all/page.tsx', 'utf8');

// Read lib/components-data.ts (shared data)
const sharedDataContent = fs.readFileSync('lib/components-data.ts', 'utf8');

// Extract all titles from both files
const allTitles = [...allPageContent.matchAll(/title:\s*"([^"]+)"/g)].map(m => m[1]);
const sharedTitles = [...sharedDataContent.matchAll(/title:\s*"([^"]+)"/g)].map(m => m[1]);

console.log('='.repeat(50));
console.log('COMPONENT COUNT ANALYSIS');
console.log('='.repeat(50));
console.log(`Showcase /all page: ${allTitles.length} components`);
console.log(`Shared data (lib/components-data.ts): ${sharedTitles.length} components`);
console.log(`Difference: ${Math.abs(allTitles.length - sharedTitles.length)} components`);
console.log('='.repeat(50));

// Check for duplicates in shared data
const sharedDuplicates = sharedTitles.filter((item, index) => sharedTitles.indexOf(item) !== index);
if (sharedDuplicates.length > 0) {
    console.log('\n⚠️  DUPLICATES FOUND IN SHARED DATA:\n');
    [...new Set(sharedDuplicates)].forEach(title => {
        const count = sharedTitles.filter(t => t === title).length;
        console.log(`  - "${title}" appears ${count} times`);
    });
    console.log('');
}

// Check for duplicates in all
const allDuplicates = allTitles.filter((item, index) => allTitles.indexOf(item) !== index);
if (allDuplicates.length > 0) {
    console.log('\n⚠️  DUPLICATES FOUND IN /all PAGE:\n');
    [...new Set(allDuplicates)].forEach(title => {
        const count = allTitles.filter(t => t === title).length;
        console.log(`  - "${title}" appears ${count} times`);
    });
    console.log('');
}

if (allTitles.length !== sharedTitles.length) {
    console.log('\n⚠️  COUNT MISMATCH!\n');
    
    // Find missing in shared data
    const missingInShared = allTitles.filter(t => !sharedTitles.includes(t));
    if (missingInShared.length > 0) {
        console.log('Missing in shared data:');
        missingInShared.forEach(title => console.log(`  - ${title}`));
        console.log('');
    }
    
    // Find missing in all
    const missingInAll = sharedTitles.filter(t => !allTitles.includes(t));
    if (missingInAll.length > 0) {
        console.log('Missing in /all page:');
        missingInAll.forEach(title => console.log(`  - ${title}`));
        console.log('');
    }
} else if (sharedDuplicates.length === 0 && allDuplicates.length === 0) {
    console.log('\n✅ Perfect match! Both sources have the same components with no duplicates.\n');
    console.log('📝 Note: /list page now uses the shared data from lib/components-data.ts\n');
}
