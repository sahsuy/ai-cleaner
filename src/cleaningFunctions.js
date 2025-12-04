/**
 * AI Text Cleaner - Cleaning Functions
 * All functions are pure and process text entirely client-side
 */

// ============================================
// BASIC CLEANING FUNCTIONS
// ============================================

/**
 * Remove zero-width characters
 */
export const removeZeroWidth = (text) => {
    return text.replace(/[\u200B\u200C\u200D\uFEFF]/g, '');
};

/**
 * Normalize Unicode to NFC form
 */
export const normalizeUnicode = (text) => {
    return text.normalize('NFC');
};

/**
 * Replace curly quotes with straight quotes
 */
export const normalizeQuotes = (text) => {
    return text
        .replace(/[\u2018\u2019]/g, "'") // Single curly quotes
        .replace(/[\u201C\u201D]/g, '"'); // Double curly quotes
};

/**
 * Replace fancy dashes with hyphens
 */
export const normalizeDashes = (text) => {
    return text
        .replace(/[\u2013\u2014]/g, '-') // En dash, Em dash
        .replace(/[\u2015]/g, '--');     // Horizontal bar
};

/**
 * Replace ellipses with three dots
 */
export const normalizeEllipsis = (text) => {
    return text.replace(/\u2026/g, '...');
};

/**
 * Collapse repeated whitespace
 */
export const collapseWhitespace = (text) => {
    return text.replace(/[ \t]+/g, ' ');
};

/**
 * Trim whitespace at start and end
 */
export const trimWhitespace = (text) => {
    return text.trim();
};

/**
 * Remove duplicate blank lines (keep max 1 blank line)
 */
export const removeDuplicateLines = (text) => {
    return text.replace(/\n\s*\n\s*\n/g, '\n\n');
};

/**
 * Convert non-breaking spaces to regular spaces
 */
export const convertNonBreakingSpaces = (text) => {
    return text.replace(/\u00A0/g, ' ');
};

/**
 * Remove trailing whitespace from each line
 */
export const removeTrailingWhitespace = (text) => {
    return text.split('\n').map(line => line.trimEnd()).join('\n');
};

/**
 * Remove asterisks (useful for removing markdown bold/italic)
 */
export const removeAsterisks = (text) => {
    return text.replace(/\*/g, '');
};

// ============================================
// HARD CLEANUP FUNCTIONS
// ============================================

/**
 * Remove emojis
 */
export const removeEmojis = (text) => {
    return text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F018}-\u{1F270}]|[\u{238C}-\u{2454}]|[\u{20D0}-\u{20FF}]/gu, '');
};

/**
 * Remove non-ASCII characters
 */
export const stripNonASCII = (text) => {
    return text.replace(/[^\x00-\x7F]/g, '');
};

/**
 * Strip formatting characters
 */
export const stripFormatting = (text) => {
    // Remove control characters except newline, tab, and carriage return
    return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
};

/**
 * Strip HTML tags
 */
export const stripHTML = (text) => {
    return text.replace(/<[^>]*>/g, '');
};

// ============================================
// MARKDOWN CLEANUP FUNCTIONS
// ============================================

/**
 * Strip markdown headings
 */
export const stripMarkdownHeadings = (text) => {
    return text.replace(/^#{1,6}\s+/gm, '');
};

/**
 * Remove bold and italic markdown syntax
 */
export const stripMarkdownFormatting = (text) => {
    return text
        .replace(/\*\*\*(.+?)\*\*\*/g, '$1')  // Bold + Italic
        .replace(/\*\*(.+?)\*\*/g, '$1')      // Bold
        .replace(/\*(.+?)\*/g, '$1')          // Italic
        .replace(/___(.+?)___/g, '$1')        // Bold + Italic (underscores)
        .replace(/__(.+?)__/g, '$1')          // Bold (underscores)
        .replace(/_(.+?)_/g, '$1');           // Italic (underscores)
};

/**
 * Remove markdown links, keeping only the label
 */
export const stripMarkdownLinks = (text) => {
    return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
};

// ============================================
// UTILITIES
// ============================================

/**
 * Smart Clean - Apply ALL cleaning operations for maximum cleaning
 */
export const smartClean = (text) => {
    let cleaned = text;

    // Basic cleaning
    cleaned = removeZeroWidth(cleaned);
    cleaned = normalizeUnicode(cleaned);
    cleaned = normalizeQuotes(cleaned);
    cleaned = normalizeDashes(cleaned);
    cleaned = normalizeEllipsis(cleaned);
    cleaned = convertNonBreakingSpaces(cleaned);
    cleaned = collapseWhitespace(cleaned);
    cleaned = removeDuplicateLines(cleaned);
    cleaned = removeTrailingWhitespace(cleaned);
    cleaned = trimWhitespace(cleaned);

    // Hard cleanup
    cleaned = removeEmojis(cleaned);
    cleaned = stripNonASCII(cleaned);
    cleaned = stripFormatting(cleaned);
    cleaned = stripHTML(cleaned);
    cleaned = removeAsterisks(cleaned);

    // Markdown cleanup
    cleaned = stripMarkdownHeadings(cleaned);
    cleaned = stripMarkdownFormatting(cleaned);
    cleaned = stripMarkdownLinks(cleaned);

    return cleaned;
};

/**
 * Get text statistics
 */
export const getStats = (text) => {
    const characters = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

    return { characters, words };
};

/**
 * Apply selected cleaning operations
 */
export const applyCleaningOperations = (text, options) => {
    let cleaned = text;

    // Basic cleaning
    if (options.removeZeroWidth) cleaned = removeZeroWidth(cleaned);
    if (options.normalizeUnicode) cleaned = normalizeUnicode(cleaned);
    if (options.normalizeQuotes) cleaned = normalizeQuotes(cleaned);
    if (options.normalizeDashes) cleaned = normalizeDashes(cleaned);
    if (options.normalizeEllipsis) cleaned = normalizeEllipsis(cleaned);
    if (options.convertNonBreakingSpaces) cleaned = convertNonBreakingSpaces(cleaned);
    if (options.collapseWhitespace) cleaned = collapseWhitespace(cleaned);
    if (options.trimWhitespace) cleaned = trimWhitespace(cleaned);
    if (options.removeDuplicateLines) cleaned = removeDuplicateLines(cleaned);
    if (options.removeTrailingWhitespace) cleaned = removeTrailingWhitespace(cleaned);

    // Hard cleanup
    if (options.removeEmojis) cleaned = removeEmojis(cleaned);
    if (options.stripNonASCII) cleaned = stripNonASCII(cleaned);
    if (options.stripFormatting) cleaned = stripFormatting(cleaned);
    if (options.stripHTML) cleaned = stripHTML(cleaned);
    if (options.removeAsterisks) cleaned = removeAsterisks(cleaned);

    // Markdown cleanup
    if (options.stripMarkdownHeadings) cleaned = stripMarkdownHeadings(cleaned);
    if (options.stripMarkdownFormatting) cleaned = stripMarkdownFormatting(cleaned);
    if (options.stripMarkdownLinks) cleaned = stripMarkdownLinks(cleaned);

    return cleaned;
};
