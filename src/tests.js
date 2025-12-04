/**
 * Test Suite for AI Text Cleaner
 * Run this in the browser console to test all cleaning functions
 */

import {
    removeZeroWidth,
    normalizeUnicode,
    normalizeQuotes,
    normalizeDashes,
    normalizeEllipsis,
    collapseWhitespace,
    trimWhitespace,
    removeDuplicateLines,
    removeEmojis,
    stripNonASCII,
    stripFormatting,
    stripHTML,
    stripMarkdownHeadings,
    stripMarkdownFormatting,
    stripMarkdownLinks,
    smartClean,
    getStats
} from './cleaningFunctions.js';

// Test cases
const tests = [
    {
        name: 'Remove Zero-Width Characters',
        input: 'Hello\u200BWorld\u200C\u200D\uFEFF',
        expected: 'HelloWorld',
        fn: removeZeroWidth
    },
    {
        name: 'Normalize Unicode',
        input: 'café', // Using decomposed form
        expected: 'café', // NFC form
        fn: normalizeUnicode
    },
    {
        name: 'Normalize Quotes',
        input: '"Hello" and \'World\'',
        expected: '"Hello" and \'World\'',
        fn: normalizeQuotes
    },
    {
        name: 'Normalize Dashes',
        input: 'Hello–World—Test',
        expected: 'Hello-World-Test',
        fn: normalizeDashes
    },
    {
        name: 'Normalize Ellipsis',
        input: 'Hello… World',
        expected: 'Hello... World',
        fn: normalizeEllipsis
    },
    {
        name: 'Collapse Whitespace',
        input: 'Hello    World   Test',
        expected: 'Hello World Test',
        fn: collapseWhitespace
    },
    {
        name: 'Trim Whitespace',
        input: '  Hello World  ',
        expected: 'Hello World',
        fn: trimWhitespace
    },
    {
        name: 'Remove Duplicate Lines',
        input: 'Line 1\n\n\n\nLine 2',
        expected: 'Line 1\n\nLine 2',
        fn: removeDuplicateLines
    },
    {
        name: 'Remove Emojis',
        input: 'Hello 😀 World 🎉',
        expected: 'Hello  World ',
        fn: removeEmojis
    },
    {
        name: 'Strip Non-ASCII',
        input: 'Hello café 世界',
        expected: 'Hello caf ',
        fn: stripNonASCII
    },
    {
        name: 'Strip HTML',
        input: '<p>Hello <strong>World</strong></p>',
        expected: 'Hello World',
        fn: stripHTML
    },
    {
        name: 'Strip Markdown Headings',
        input: '# Heading 1\n## Heading 2\nNormal text',
        expected: 'Heading 1\nHeading 2\nNormal text',
        fn: stripMarkdownHeadings
    },
    {
        name: 'Strip Markdown Formatting',
        input: '**bold** and *italic* and ***both***',
        expected: 'bold and italic and both',
        fn: stripMarkdownFormatting
    },
    {
        name: 'Strip Markdown Links',
        input: 'Check [this link](https://example.com) out',
        expected: 'Check this link out',
        fn: stripMarkdownLinks
    },
    {
        name: 'Smart Clean',
        input: '"Hello"  World… with—extra   spaces and <b>HTML</b>',
        expected: '"Hello" World... with-extra spaces and HTML',
        fn: smartClean
    }
];

// Run tests
console.log('🧪 Running AI Text Cleaner Tests...\n');

let passed = 0;
let failed = 0;

tests.forEach(test => {
    const result = test.fn(test.input);
    const success = result === test.expected;

    if (success) {
        console.log(`✅ ${test.name}`);
        passed++;
    } else {
        console.log(`❌ ${test.name}`);
        console.log(`   Input:    "${test.input}"`);
        console.log(`   Expected: "${test.expected}"`);
        console.log(`   Got:      "${result}"`);
        failed++;
    }
});

// Test stats
const statsTest = getStats('Hello World! This is a test.');
console.log('\n📊 Stats Test:');
console.log(`   Characters: ${statsTest.characters} (expected: 28)`);
console.log(`   Words: ${statsTest.words} (expected: 6)`);

console.log(`\n✨ Tests Complete: ${passed} passed, ${failed} failed`);

export { tests };
