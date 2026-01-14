# Tailwind Color Configuration

## Color Choices

FocusAI uses Tailwind's built-in color palette:

- **Primary:** `violet` — Used for buttons, links, active states, branding
- **Secondary:** `amber` — Used for streaks, highlights, warnings, secondary accents
- **Neutral:** `slate` — Used for backgrounds, text, borders, cards

## Usage Examples

### Buttons

```jsx
// Primary button
<button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg">
  Action
</button>

// Secondary button
<button className="bg-violet-100 hover:bg-violet-200 text-violet-700 px-4 py-2 rounded-lg">
  Secondary
</button>

// Ghost button
<button className="hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg">
  Ghost
</button>
```

### Cards

```jsx
// Card container
<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
  Content
</div>
```

### Text

```jsx
// Heading
<h1 className="text-slate-900 dark:text-slate-100 font-semibold">
  Heading
</h1>

// Body text
<p className="text-slate-600 dark:text-slate-400">
  Body text
</p>

// Muted text
<span className="text-slate-500 dark:text-slate-500 text-sm">
  Caption
</span>
```

### Badges/Tags

```jsx
// Primary badge
<span className="bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-300 px-2 py-0.5 rounded text-sm">
  Tag
</span>

// Status badge (amber)
<span className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 px-2 py-0.5 rounded text-sm">
  In Progress
</span>
```

### Priority Indicators

```jsx
// High priority
<div className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
  Alto impacto
</div>

// Medium priority
<div className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
  Medio impacto
</div>

// Low priority
<div className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
  Bajo impacto
</div>
```

### Navigation

```jsx
// Active nav item
<button className="bg-violet-600 text-white px-3 py-2 rounded-lg">
  Active
</button>

// Inactive nav item
<button className="text-slate-700 dark:text-slate-300 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300 px-3 py-2 rounded-lg">
  Inactive
</button>
```

### Focus States

```jsx
// Focus ring
<button className="focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
  Focusable
</button>
```

## Dark Mode

All components use Tailwind's `dark:` variant for dark mode support. The app respects system preferences via `prefers-color-scheme`.

```jsx
// Example with dark mode
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
  Adapts to light/dark
</div>
```
