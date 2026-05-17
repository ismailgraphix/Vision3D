# TOONHUB — Character Figurine Carousel

A full-viewport hero carousel built with **React 18 + TypeScript + Vite + Tailwind CSS + lucide-react**.

---

## Installation

### 1. Copy the project folder

Place the `toonhub/` folder wherever you keep your projects.

### 2. Install dependencies

```bash
cd toonhub
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview the production build locally:

```bash
npm run preview
```

---

## Project structure

```
toonhub/
├── index.html                      # Google Fonts preloaded here
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.tsx                    # React root mount
    ├── App.tsx                     # Renders ToonHubHero
    ├── index.css                   # Tailwind directives + resets
    └── components/
        └── ToonHubHero.tsx         # ← All the carousel logic lives here
```

---

## Customisation

### Swap characters
Edit the `IMAGES` array in `ToonHubHero.tsx`:

```ts
const IMAGES = [
  { src: 'your-image-url.png', bg: '#F4845F', panel: '#F79B7F' },
  // ...
]
```

Each entry needs:
- `src` — image URL (transparent PNG recommended)
- `bg` — full background color (the whole hero)
- `panel` — lighter accent (available for future use, e.g. cards, panels)

### Adjust animation speed
Change `650` (ms) in `navigate()` and in the `transition` style strings inside `ToonHubHero.tsx`.

### Mobile breakpoint
`isMobile` fires at `window.innerWidth < 640` (matches Tailwind's `sm:` breakpoint). Adjust as needed.
