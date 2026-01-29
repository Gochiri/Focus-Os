# Technology Stack

**Analysis Date:** 2026-01-29

## Languages

**Primary:**
- TypeScript 5.9.3 - All source code in `src/`
- TSX - React components (`.tsx` files)

**Secondary:**
- CSS - Styling via Tailwind CSS
- JavaScript - Build configuration files (`.js`, `.config.js`)

## Runtime

**Environment:**
- Node.js (specified in package.json as `"type": "module"` for ES modules)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- React 19.2.0 - UI framework for component-based application
- React Router DOM 7.12.0 - Client-side routing for multi-page navigation (App.tsx uses BrowserRouter)
- Vite 7.2.4 - Build tool and dev server

**Styling:**
- Tailwind CSS 4.1.18 - Utility-first CSS framework
- Autoprefixer 10.4.23 - PostCSS plugin for vendor prefixes
- @tailwindcss/vite 4.1.18 - Vite plugin integration for Tailwind

**Icons:**
- lucide-react 0.562.0 - React icon library for UI icons

**Testing:**
- Not detected in package.json

**Build/Dev:**
- @vitejs/plugin-react 5.1.1 - React JSX transformation for Vite
- PostCSS 8.5.6 - CSS processor with Tailwind integration
- TypeScript 5.9.3 - Type checking and transpilation

## Key Dependencies

**Critical:**
- react 19.2.0 - Core rendering engine
- react-dom 19.2.0 - React DOM bindings
- react-router-dom 7.12.0 - Navigation routing system

**UI & Design:**
- tailwindcss 4.1.18 - Complete styling system
- lucide-react 0.562.0 - 500+ consistent icon components
- autoprefixer 10.4.23 - Cross-browser CSS compatibility

**Development Quality:**
- typescript 5.9.3 - Static type safety and compilation
- eslint 9.39.1 - Code quality linting
- @eslint/js 9.39.1 - ESLint JavaScript rules
- typescript-eslint 8.46.4 - TypeScript linting rules
- eslint-plugin-react-hooks 7.0.1 - React Hooks best practices
- eslint-plugin-react-refresh 0.4.24 - Fast Refresh support validation

## Configuration

**Environment:**
- No `.env` files detected - application uses hardcoded demo data (see `src/App.tsx` user object)
- Config files: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- ESLint config: `eslint.config.js` using flat config format
- Vite config: `vite.config.ts`

**Build:**
- TypeScript compilation: `tsc -b`
- Vite bundling: `vite build`
- Development server: `vite` (dev script)
- Preview: `vite preview`

**TypeScript Configuration:**
- Target: ES2022
- Module: ESNext
- JSX: react-jsx (automatic JSX transform)
- Strict mode: enabled
- Module resolution: bundler (for Vite)
- Unused locals/parameters detection: enabled
- No unsafe side effects in imports: enabled

## Platform Requirements

**Development:**
- Node.js with npm
- Terminal/CLI for running build scripts
- TypeScript compiler support

**Production:**
- Static hosting platform capable of serving SPA (Single Page Application)
- Modern browser with ES2022 JavaScript support
- No backend server required (frontend-only application)

## Build Output

- Destination: `dist/` directory
- Type: SPA (Single Page Application)
- Entry point: `index.html` with main application mount at `id="root"`
- Asset handling: Vite asset optimization and fingerprinting

---

*Stack analysis: 2026-01-29*
