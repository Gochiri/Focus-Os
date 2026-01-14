# Typography Configuration

## Google Fonts Import

Add to your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```

Or in CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap');
```

## Font Families

### Space Grotesk (Headings)

A bold, geometric sans-serif for headings and emphasis.

```css
font-family: 'Space Grotesk', sans-serif;
```

**Weights used:**
- 500 (Medium) — Subheadings
- 600 (Semibold) — Main headings
- 700 (Bold) — Large display headings

**Usage:**
- Page titles
- Section headings
- Card titles
- Button text (optional)

### Inter (Body)

A highly readable sans-serif optimized for screens.

```css
font-family: 'Inter', sans-serif;
```

**Weights used:**
- 400 (Regular) — Body text, paragraphs
- 500 (Medium) — Labels, emphasized text
- 600 (Semibold) — Small headings, table headers
- 700 (Bold) — Strong emphasis

**Usage:**
- Paragraphs
- Labels
- Navigation items
- Form inputs
- Buttons

### JetBrains Mono (Code)

A monospace font for technical content.

```css
font-family: 'JetBrains Mono', monospace;
```

**Weights used:**
- 400 (Regular) — Code blocks, technical data
- 500 (Medium) — Emphasized code

**Usage:**
- Time displays (e.g., "25:00")
- Scores and numbers (e.g., "78")
- Keyboard shortcuts
- Technical identifiers

## Tailwind Configuration

If using Tailwind CSS v4, add to your CSS:

```css
@theme {
  --font-family-heading: 'Space Grotesk', sans-serif;
  --font-family-body: 'Inter', sans-serif;
  --font-family-mono: 'JetBrains Mono', monospace;
}
```

Or use utility classes:

```jsx
// Heading
<h1 className="font-['Space_Grotesk'] font-semibold text-2xl">
  FocusAI
</h1>

// Body (default)
<p className="font-['Inter'] text-base">
  Body text
</p>

// Monospace
<span className="font-['JetBrains_Mono'] text-4xl">
  25:00
</span>
```

## Font Size Scale

| Class | Size | Usage |
|-------|------|-------|
| `text-xs` | 12px | Captions, timestamps |
| `text-sm` | 14px | Secondary text, labels |
| `text-base` | 16px | Body text |
| `text-lg` | 18px | Large body, card titles |
| `text-xl` | 20px | Section headings |
| `text-2xl` | 24px | Page headings |
| `text-3xl` | 30px | Large titles |
| `text-4xl` | 36px | Hero numbers (scores) |
