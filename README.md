# AI Text Cleaner
https://sahsuy.github.io/ai-cleaner/

A powerful, privacy-focused web application for cleaning and normalizing text. Perfect for developers, writers, and anyone working with AI-generated content.

![AI Text Cleaner](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-19.2.0-61dafb)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff)

## Features

### Privacy First
- **100% Client-Side Processing** - All text processing happens entirely in your browser
- **No Data Storage** - Nothing is saved, transmitted, or tracked
- **No Backend** - Zero server communication
- **Instant Results** - Lightning-fast processing

### Comprehensive Cleaning Options

#### Basic Cleaning
- Remove zero-width characters (invisible characters that break code)
- Normalize Unicode to NFC form
- Convert curly quotes to straight quotes
- Normalize dashes (em-dash, en-dash → hyphen)
- Convert ellipsis character to three dots
- Convert non-breaking spaces to regular spaces
- Collapse multiple spaces into single spaces
- Trim whitespace from start and end
- Remove duplicate blank lines
- Remove trailing whitespace from lines

#### Hard Cleanup
- Remove emojis
- Strip non-ASCII characters
- Remove control/formatting characters
- Strip HTML tags
- Remove asterisks (useful for markdown)

#### Markdown Cleanup
- Strip markdown headings (# to ######)
- Remove bold and italic formatting (**bold**, *italic*)
- Strip markdown links (keep only label text)

### Two Cleaning Modes

1. **Clean** (⌘K / Ctrl+K)
   - Use your custom selection of cleaning options
   - Fine-grained control over what gets cleaned

2. **Smart Clean** (⇧⌘K / Ctrl+Shift+K)
   - Applies ALL cleaning operations
   - One-click maximum cleaning power
   - Perfect for AI-generated text

### Real-Time Statistics
- Character count (before & after)
- Word count (before & after)
- Live updates as you type

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-cleaner.git
cd ai-cleaner
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

## Tech Stack

- **React 19.2** - UI framework
- **Vite 7.2** - Build tool and dev server
- **Tailwind CSS 3.4** - Styling
- **Pure JavaScript** - No external text processing libraries

## Usage

### Basic Usage
1. Paste your text into the input area
2. Select the cleaning options you want (or use Smart Clean for everything)
3. Click **Clean** or **Smart Clean**
4. Copy the cleaned output

### Keyboard Shortcuts
- `⌘K` / `Ctrl+K` - Clean with selected options
- `⇧⌘K` / `Ctrl+Shift+K` - Smart Clean (all options)

## Use Cases

### For Developers
- Clean code snippets from AI assistants (ChatGPT, Claude, etc.)
- Remove hidden characters that break compilation
- Normalize quotes for code compatibility
- Strip markdown formatting from documentation

### For Writers & Editors
- Clean text before pasting into CMSs
- Remove invisible formatting from AI-generated content
- Normalize typography (quotes, dashes, ellipsis)
- Ensure consistent whitespace

### For Content Creators
- Prepare text for different platforms
- Remove formatting when moving between tools
- Clean AI-generated content to avoid detection
- Standardize text formatting

## Configuration

All cleaning functions are in `src/cleaningFunctions.js`. Each function is:
- **Pure** - No side effects
- **Tested** - Comprehensive test suite
- **Documented** - Clear JSDoc comments
- **Modular** - Easy to add/remove/modify

## Testing

Run the test suite:
```bash
node src/tests.js
```

All 15+ cleaning functions are thoroughly tested with edge cases.

## Project Structure

```
ai-cleaner/
├── src/
│   ├── components/
│   │   ├── StatsBar.jsx      # Statistics display
│   │   └── Toggle.jsx         # Toggle switch component
│   ├── cleaningFunctions.js   # All text cleaning logic
│   ├── tests.js               # Test suite
│   ├── App.jsx                # Main application
│   ├── index.css              # Global styles
│   └── main.jsx               # Entry point
├── public/                    # Static assets
├── index.html                 # HTML template
├── package.json               # Dependencies
├── vite.config.js             # Vite configuration
└── tailwind.config.js         # Tailwind configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built for privacy-conscious users
- Inspired by the need for clean, reliable text from AI tools
- No external text processing libraries - pure JavaScript implementation

## Bug Reports

Found a bug? Please open an issue on GitHub with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information

## Feature Requests

Have an idea for a new cleaning function? Open an issue with:
- Description of the feature
- Use case / why it's needed
- Example input and expected output

## Contact

Project Link: [https://github.com/sahsuy/ai-cleaner](https://github.com/sahsuy/ai-cleaner)

---

**Made for developers, writers, and AI enthusiasts**
