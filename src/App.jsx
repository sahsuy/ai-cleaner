import { useState, useEffect } from 'react';
import Toggle from './components/Toggle';
import StatsBar from './components/StatsBar';
import { applyCleaningOperations, smartClean, getStats } from './cleaningFunctions';
import './index.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Cleaning options state
  const [options, setOptions] = useState({
    // Basic cleaning
    removeZeroWidth: true,
    normalizeUnicode: true,
    normalizeQuotes: true,
    normalizeDashes: true,
    normalizeEllipsis: true,
    convertNonBreakingSpaces: true,
    collapseWhitespace: true,
    trimWhitespace: true,
    removeDuplicateLines: true,
    removeTrailingWhitespace: true,
    // Hard cleanup
    removeEmojis: false,
    stripNonASCII: false,
    stripFormatting: true,
    stripHTML: false,
    removeAsterisks: true,
    // Markdown cleanup
    stripMarkdownHeadings: false,
    stripMarkdownFormatting: false,
    stripMarkdownLinks: false,
  });

  // Calculate stats
  const inputStats = getStats(inputText);
  const outputStats = getStats(outputText);

  // Toggle option
  const toggleOption = (key) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Clean text
  const handleClean = () => {
    const cleaned = applyCleaningOperations(inputText, options);
    setOutputText(cleaned);
  };

  // Smart clean
  const handleSmartClean = () => {
    const cleaned = smartClean(inputText);
    setOutputText(cleaned);
  };

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Clear all
  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + K = Clean
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        handleClean();
      }
      // Ctrl/Cmd + Shift + K = Smart Clean
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        handleSmartClean();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputText, options]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            AI Text Cleaner
          </h1>
          <p className="text-gray-600 text-lg">
            Clean and normalize your text instantly • 100% Free • Safe • Private • No Data Storage
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="card mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 animate-slide-up">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div>
              <h3 className="font-semibold text-emerald-900 mb-1">🔒 Your Privacy is Protected</h3>
              <p className="text-sm text-emerald-800">
                All text processing happens entirely in your browser. No data is transmitted, stored, or tracked.
                Everything disappears when you close this tab.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Input & Output */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input */}
            <div className="card animate-slide-up">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Input Text
              </label>
              <textarea
                className="textarea-custom"
                placeholder="Paste your text here to clean it..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 animate-slide-up">
              <button onClick={handleClean} className="btn-primary flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Clean
                <kbd className="ml-2 px-2 py-0.5 text-xs bg-white/20 rounded">⌘K</kbd>
              </button>

              <button onClick={handleSmartClean} className="btn-success flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Smart Clean
                <kbd className="ml-2 px-2 py-0.5 text-xs bg-white/20 rounded">⇧⌘K</kbd>
              </button>

              <button
                onClick={handleCopy}
                className="btn-secondary flex items-center gap-2"
                disabled={!outputText}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {copySuccess ? 'Copied!' : 'Copy Output'}
              </button>

              <button onClick={handleClear} className="btn-secondary flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All
              </button>
            </div>

            {/* Output */}
            <div className="card animate-slide-up">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Output Text
              </label>
              <textarea
                className="textarea-custom"
                placeholder="Cleaned text will appear here..."
                value={outputText}
                readOnly
              />
            </div>

            {/* Stats */}
            <div className="animate-slide-up">
              <StatsBar inputStats={inputStats} outputStats={outputStats} />
            </div>
          </div>

          {/* Right Column - Options */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8 animate-slide-up">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Cleaning Options
              </h2>

              <div className="space-y-1 max-h-[calc(100vh-16rem)] overflow-y-auto">
                {/* Basic Cleaning */}
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
                    Basic Cleaning
                  </h3>
                  <Toggle
                    label="Remove Zero-Width Characters"
                    description="Remove invisible characters"
                    checked={options.removeZeroWidth}
                    onChange={() => toggleOption('removeZeroWidth')}
                  />
                  <Toggle
                    label="Normalize Unicode"
                    description="Convert to NFC form"
                    checked={options.normalizeUnicode}
                    onChange={() => toggleOption('normalizeUnicode')}
                  />
                  <Toggle
                    label="Normalize Quotes"
                    description="Curly → straight quotes"
                    checked={options.normalizeQuotes}
                    onChange={() => toggleOption('normalizeQuotes')}
                  />
                  <Toggle
                    label="Normalize Dashes"
                    description="Em/en dash → hyphen"
                    checked={options.normalizeDashes}
                    onChange={() => toggleOption('normalizeDashes')}
                  />
                  <Toggle
                    label="Normalize Ellipsis"
                    description="… → ..."
                    checked={options.normalizeEllipsis}
                    onChange={() => toggleOption('normalizeEllipsis')}
                  />
                  <Toggle
                    label="Convert Non-Breaking Spaces"
                    description="\u00A0 → regular space"
                    checked={options.convertNonBreakingSpaces}
                    onChange={() => toggleOption('convertNonBreakingSpaces')}
                  />
                  <Toggle
                    label="Collapse Whitespace"
                    description="Multiple spaces → single"
                    checked={options.collapseWhitespace}
                    onChange={() => toggleOption('collapseWhitespace')}
                  />
                  <Toggle
                    label="Trim Whitespace"
                    description="Remove start/end spaces"
                    checked={options.trimWhitespace}
                    onChange={() => toggleOption('trimWhitespace')}
                  />
                  <Toggle
                    label="Remove Duplicate Lines"
                    description="Max 1 blank line"
                    checked={options.removeDuplicateLines}
                    onChange={() => toggleOption('removeDuplicateLines')}
                  />
                  <Toggle
                    label="Remove Trailing Whitespace"
                    description="Remove spaces at line ends"
                    checked={options.removeTrailingWhitespace}
                    onChange={() => toggleOption('removeTrailingWhitespace')}
                  />
                </div>

                {/* Hard Cleanup */}
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
                    Hard Cleanup
                  </h3>
                  <Toggle
                    label="Remove Emojis"
                    description="Strip all emoji characters"
                    checked={options.removeEmojis}
                    onChange={() => toggleOption('removeEmojis')}
                  />
                  <Toggle
                    label="Strip Non-ASCII"
                    description="Remove non-ASCII chars"
                    checked={options.stripNonASCII}
                    onChange={() => toggleOption('stripNonASCII')}
                  />
                  <Toggle
                    label="Strip Formatting"
                    description="Remove control characters"
                    checked={options.stripFormatting}
                    onChange={() => toggleOption('stripFormatting')}
                  />
                  <Toggle
                    label="Strip HTML Tags"
                    description="Remove <tags>"
                    checked={options.stripHTML}
                    onChange={() => toggleOption('stripHTML')}
                  />
                  <Toggle
                    label="Remove Asterisks"
                    description="Remove all * characters"
                    checked={options.removeAsterisks}
                    onChange={() => toggleOption('removeAsterisks')}
                  />
                </div>

                {/* Markdown Cleanup */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
                    Markdown Cleanup
                  </h3>
                  <Toggle
                    label="Strip Headings"
                    description="Remove # markdown headings"
                    checked={options.stripMarkdownHeadings}
                    onChange={() => toggleOption('stripMarkdownHeadings')}
                  />
                  <Toggle
                    label="Strip Bold/Italic"
                    description="Remove **bold** and *italic*"
                    checked={options.stripMarkdownFormatting}
                    onChange={() => toggleOption('stripMarkdownFormatting')}
                  />
                  <Toggle
                    label="Strip Links"
                    description="[label](url) → label"
                    checked={options.stripMarkdownLinks}
                    onChange={() => toggleOption('stripMarkdownLinks')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Made with ❤️ for privacy-conscious users</p>
        </div>
      </div>
    </div>
  );
}

export default App;
