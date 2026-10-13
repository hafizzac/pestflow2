# PestFlow Marketing Website

Premium, multi-page marketing website for **PestFlow**, a pest-control operations platform built for Malaysian businesses. The site presents PestFlow's product, workflows, compliance capabilities, pricing, solution pages, bilingual content, brand system, and conversion paths using a responsive, product-led visual language.

> Repository: `https://github.com/hafizzac/pestflow2.git`

## Key Features

- 14 independently addressable marketing pages
- Responsive layouts for desktop, tablet, and mobile
- Persistent light and dark themes
- English and Bahasa Melayu language switching
- Animated product-led hero sections and scroll narratives
- Accessible desktop Solutions mega menu and mobile accordion navigation
- Pest-control-specific solution pages and operational content
- Live-style monthly/yearly pricing rendered from a local first-party API snapshot
- Product module explorer with category filters
- Operational capacity estimator
- WhatsApp-assisted contact flow
- Reduced-motion support
- WCAG-oriented semantics, focus states, contrast, and keyboard interactions
- Dedicated interactive Brand Guidelines page
- Multi-page Vite production build

---

## Table of Contents

- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Commands](#available-commands)
- [Route Map](#route-map)
- [Architecture](#architecture)
- [Directory Structure](#directory-structure)
- [Design System](#design-system)
- [Theme System](#theme-system)
- [Localization](#localization)
- [Navigation](#navigation)
- [Pricing Data](#pricing-data)
- [Contact Flow](#contact-flow)
- [Accessibility](#accessibility)
- [Assets and External Dependencies](#assets-and-external-dependencies)
- [Quality Assurance](#quality-assurance)
- [Production Build](#production-build)
- [Deployment](#deployment)
- [Adding a New Page](#adding-a-new-page)
- [Content Maintenance](#content-maintenance)
- [Troubleshooting](#troubleshooting)
- [Security and Privacy Notes](#security-and-privacy-notes)
- [License](#license)

---

## Technology Stack

| Area              | Technology                                       |
| ----------------- | ------------------------------------------------ |
| Markup            | Semantic HTML5                                   |
| Styling           | Custom CSS, CSS Grid, Flexbox, custom properties |
| Client logic      | Vanilla JavaScript ES modules                    |
| Build tool        | Vite 7                                           |
| Type safety       | TypeScript `checkJs` over JavaScript files       |
| Formatting        | Prettier                                         |
| Accessibility QA  | Axe Core with Playwright                         |
| Package manager   | npm                                              |
| Deployment output | Static files in `dist/`                          |

The website does **not** use React, Vue, a database, or a server-side application. It is a static multi-page site enhanced with JavaScript.

---

## Prerequisites

Install the following before starting:

- **Node.js 20.19+ or 22.12+**
- **npm 10+**
- Git

Check your installed versions:

```bash
node --version
npm --version
git --version
```

---

## Getting Started

### 1. Clone the private repository

Authenticate with GitHub first if required:

```bash
gh auth login
```

Clone the repository:

```bash
git clone https://github.com/hafizzac/pestflow2.git
cd pestflow2
```

If the project already exists locally:

```bash
cd "/Users/hafizzack/Desktop/Sofware Development/Uiux"
```

### 2. Install dependencies

For a reproducible installation using `package-lock.json`:

```bash
npm ci
```

For normal local development:

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:4173/
```

Vite serves all page directories directly, for example:

```text
http://127.0.0.1:4173/product/
http://127.0.0.1:4173/pricing/
http://127.0.0.1:4173/brand/
```

### 4. Create a production build

```bash
npm run build
```

The generated static site is written to:

```text
dist/
```

### 5. Preview the production build

```bash
npm run preview
```

Open:

```text
http://127.0.0.1:4173/
```

---

## Available Commands

| Command             | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `npm run dev`       | Starts the Vite development server on port 4173              |
| `npm run build`     | Builds every registered HTML route into `dist/`              |
| `npm run preview`   | Serves the production build locally                          |
| `npm run lint`      | Checks Prettier formatting for package/config/shared scripts |
| `npm run typecheck` | Runs TypeScript `checkJs` over `scripts/*.js`                |
| `npm audit`         | Checks npm dependencies for known vulnerabilities            |

Recommended validation before pushing:

```bash
npm run lint
npm run typecheck
npm run build
npm audit
```

---

## Route Map

The site currently contains 14 pages.

| Route                                    | Source file                                       | Purpose                                              |
| ---------------------------------------- | ------------------------------------------------- | ---------------------------------------------------- |
| `/`                                      | `index.html`                                      | Main PestFlow overview and conversion page           |
| `/product/`                              | `product/index.html`                              | Product platform, modules, and role-based tools      |
| `/workflow/`                             | `workflow/index.html`                             | End-to-end operational handoffs and field workflow   |
| `/compliance/`                           | `compliance/index.html`                           | MyInvois, SST, field verification, and audit records |
| `/pricing/`                              | `pricing/index.html`                              | Monthly/yearly plans and feature comparison          |
| `/blog/`                                 | `blog/index.html`                                 | Malay editorial and buyer education hub              |
| `/about/`                                | `about/index.html`                                | Product purpose, local fit, and company principles   |
| `/contact/`                              | `contact/index.html`                              | Sales details and WhatsApp-assisted enquiry          |
| `/brand/`                                | `brand/index.html`                                | Complete PestFlow Brand Guidelines                   |
| `/pest-control-scheduling-software/`     | `pest-control-scheduling-software/index.html`     | Scheduling and dispatch solution                     |
| `/pest-control-technician-app/`          | `pest-control-technician-app/index.html`          | Mobile field workflow solution                       |
| `/pest-control-software-small-business/` | `pest-control-software-small-business/index.html` | Small-team operations solution                       |
| `/commercial-pest-control-software/`     | `commercial-pest-control-software/index.html`     | Commercial contracts and multi-site solution         |
| `/pest-control-software-malaysia/`       | `pest-control-software-malaysia/index.html`       | Malaysia-specific product overview                   |

Every production route must also be registered in `vite.config.js`.

---

## Architecture

### Runtime model

The site follows a static multi-page architecture:

```text
HTML page
  ├── styles.css
  ├── scripts/local.js
  │   ├── preferences.js
  │   └── controls.js
  ├── pricing.js      # pricing page only
  └── product.js      # product page only
```

### Shared page lifecycle

1. The browser loads a route-specific HTML file.
2. `styles.css` provides global tokens, responsive layouts, themes, and motion.
3. `scripts/local.js` imports global preferences and navigation controls.
4. Saved theme and locale preferences are restored from `localStorage`.
5. Shared navigation controls are injected.
6. Page-specific interactions initialize only when matching DOM hooks exist.
7. Vite serves or builds each HTML route independently.

### Shared JavaScript modules

#### `scripts/local.js`

Controls:

- Direction-aware compact header animation
- Mobile navigation open/close behavior
- Reveal-on-intersection effects
- Keyboard-accessible homepage workflow tabs
- Scroll-linked homepage story state
- Workflow persistent-phone scrollytelling
- Operational capacity calculator
- WhatsApp contact-form handoff

#### `scripts/preferences.js`

Controls:

- Light/dark theme selection
- English/Bahasa Melayu selection
- Persistence through `localStorage`
- DOM text translation
- Dynamic locale event: `pestflow:locale`
- Theme event: `pestflow-theme`

Storage keys:

```text
pestflow-theme
pestflow-locale
```

#### `scripts/controls.js`

Controls:

- Desktop Solutions mega menu
- Mobile Solutions accordion
- Theme pull-switch control
- BM/EN language control
- Hover, click, focus, ArrowDown, Escape, and outside-click behavior
- Active solution route state

#### `scripts/product.js`

Controls:

- 19-module product explorer
- Category filters:
  - All
  - Sales & CRM
  - Field operations
  - Finance
  - Customer & BI
- English/Bahasa Melayu dynamic module content

#### `scripts/pricing.js`

Controls:

- Monthly/yearly billing selector
- Pricing-card values
- Plan limits
- Feature comparison table
- Pricing status and captured-date label
- Localized pricing labels
- Honest unavailable state if pricing data fails to load

---

## Directory Structure

```text
.
├── index.html                              # Homepage
├── styles.css                             # Global design system and layouts
├── vite.config.js                         # Multi-page Vite configuration
├── package.json
├── package-lock.json
├── README.md
│
├── about/index.html
├── blog/index.html
├── brand/index.html
├── commercial-pest-control-software/index.html
├── compliance/index.html
├── contact/index.html
├── pest-control-scheduling-software/index.html
├── pest-control-software-malaysia/index.html
├── pest-control-software-small-business/index.html
├── pest-control-technician-app/index.html
├── pricing/index.html
├── product/index.html
├── workflow/index.html
│
├── scripts/
│   ├── controls.js                        # Shared navigation and controls
│   ├── local.js                           # Shared page behavior
│   ├── preferences.js                     # Themes and localization
│   ├── pricing.js                         # Pricing-page behavior
│   └── product.js                         # Product explorer
│
├── public/
│   ├── assets/
│   │   ├── pestflow-forest-blend.svg
│   │   ├── pestflow-forest-columns.jpg
│   │   └── pestflow-night-route.jpg
│   └── data/
│       └── pricing.json                   # Runtime pricing snapshot
│
├── data/
│   └── pricing.json                       # Working mirror of pricing data
│
└── dist/                                  # Generated production build
```

Do not edit files inside `dist/`. They are generated by `npm run build`.

---

## Design System

The full interactive design reference is available at:

```text
/brand/
```

Local URL:

```text
http://127.0.0.1:4173/brand/
```

### Visual direction

PestFlow uses an **operational editorial** design language:

- Product UI is the primary evidence
- Large whitespace separates operating stages
- Dark narrative sections explain workflows
- Forest colors connect the brand to field operations
- Yellow is reserved for active signal and emphasis
- Motion explains state, handoff, and progress
- Pest-control details replace generic field-service imagery

### Core colors

| Token         | Hex       | Role                                |
| ------------- | --------- | ----------------------------------- |
| Black Moss    | `#26483D` | Deep field identity and hero base   |
| Tea Leaf      | `#557D57` | Secondary field tone                |
| Fern Green    | `#A4B963` | Progress and gradient support       |
| Honey Mist    | `#D6D998` | Warm quiet highlight                |
| Moon Yellow   | `#F2EDCC` | Hero CTA and light signal           |
| Signal Yellow | `#F7BE00` | Active state and operational signal |
| Night Ink     | `#05010D` | Dark narrative surfaces             |
| Record White  | `#FFFFFF` | Light primary surface               |

### Typography

The site uses the native system UI stack:

```css
system-ui,
-apple-system,
BlinkMacSystemFont,
"Segoe UI",
Roboto,
Oxygen,
Ubuntu,
Cantarell,
"Helvetica Neue",
sans-serif
```

This avoids font-loading delay and preserves familiar platform rendering.

### Core layout values

- Core content width: `1000px`
- Wide content width: `1200px`
- Desktop/tablet gutter: `24px`
- Mobile gutter: `16px`
- Standard card gap: `32px`
- Desktop section spacing: approximately `120px`
- Mobile section spacing: approximately `80px`
- Large panel radius: `20–24px`
- Small card/control radius: `12–16px`

---

## Theme System

PestFlow supports light and dark themes on every route.

The preference control is injected into the desktop header and mobile menu. Theme state persists between pages using:

```text
localStorage["pestflow-theme"]
```

Accepted values:

```text
light
dark
```

If no preference has been saved, the site follows:

```css
prefers-color-scheme
```

### Theme implementation

The theme is applied to the root element:

```html
<html data-theme="light"></html>
```

or:

```html
<html data-theme="dark"></html>
```

Shared theme colors are defined using CSS custom properties in `styles.css`.

### Testing themes manually

In the browser console:

```javascript
localStorage.setItem("pestflow-theme", "dark");
location.reload();
```

Reset:

```javascript
localStorage.removeItem("pestflow-theme");
location.reload();
```

---

## Localization

The site supports:

- English: `en-MY`
- Bahasa Melayu: `ms-MY`

Locale state persists using:

```text
localStorage["pestflow-locale"]
```

Accepted values:

```text
en
ms
```

### Translation model

Static content is translated through the source-to-translation map in:

```text
scripts/preferences.js
```

Dynamic Product and Pricing content has page-specific translation maps in:

```text
scripts/product.js
scripts/pricing.js
```

### Locale event

Dynamic components listen for:

```javascript
window.addEventListener("pestflow:locale", handler);
```

### Adding a translation

Add the exact English source text to the Malay dictionary:

```javascript
const translations = {
  ms: {
    "English source text": "Terjemahan Bahasa Melayu",
  },
};
```

The source key must match the rendered text exactly.

### Localization guidelines

- Use natural Malaysian business language
- Do not translate product names, API names, or regulated identifiers unnecessarily
- Keep `MyInvois`, `SST`, `LHDN`, `GPS`, `QR`, and `PestFlow` consistent
- Avoid literal machine-style translation
- Verify longer Malay text at desktop and mobile widths

---

## Navigation

### Desktop

The desktop header includes:

- Brand
- Product
- Solutions mega menu
- Workflow
- Compliance
- Pricing
- Blog or Brand, depending on page markup
- Theme control
- Language control
- Log in
- Start free trial

The header:

- Expands at the top
- Collapses while scrolling down
- Returns to the full layout while scrolling up
- Prevents item wrapping in both English and Malay

### Solutions mega menu

The Solutions menu includes:

- Malaysia overview
- Small business
- Commercial service
- Scheduling
- Technician app

It supports:

- Hover
- Click
- Keyboard focus
- `ArrowDown` to focus the first solution
- `Escape` to close and restore focus
- Outside click
- EN/BM labels
- Light/dark themes
- Active-page state

The panel is portalled to `<body>` and centered on the viewport to prevent overflow.

### Mobile

Mobile navigation includes a scrollable Solutions accordion and preference controls. The menu height is clamped to the viewport and can scroll internally.

---

## Pricing Data

Pricing is rendered from:

```text
public/data/pricing.json
```

The current snapshot records:

- Source endpoint
- Capture date
- Currency
- Monthly/yearly prices
- Plan limits
- API-backed feature availability

Current source:

```text
https://api.pestflow.my/api/v1/subscription/tiers?currency=MYR
```

### Important

The website intentionally uses a local snapshot because the upstream API does not allow direct browser requests from every origin. This avoids CORS failures and stale hard-coded markup scattered across pages.

### Updating pricing

1. Fetch the current first-party API data.
2. Review prices, limits, promotions, and feature flags.
3. Update `public/data/pricing.json`.
4. Update the mirror in `data/pricing.json` if it is retained.
5. Run:

```bash
npm run typecheck
npm run build
```

6. Verify monthly and yearly states at `/pricing/`.

Do not invent unavailable feature entitlements. If a capability is not represented by current first-party data, label it for confirmation rather than displaying an unsupported checkmark.

---

## Contact Flow

The contact form does not send data to a local backend. It validates required fields and opens WhatsApp with the enquiry details prefilled.

Included fields:

- Name
- Company
- Work email
- Phone
- Technician count
- Message

The generated message includes every non-empty field.

WhatsApp destination:

```text
https://wa.me/601114406030
```

### Privacy behavior

- The website does not claim that a form was submitted before the user sends the message in WhatsApp.
- Users are told not to include confidential customer data.
- No form data is stored by this static site.

---

## Accessibility

The project targets WCAG 2.2 AA patterns.

Implemented behaviors include:

- Skip links
- Semantic landmarks
- One H1 per route
- Sequential heading hierarchy
- Visible focus indicators
- Native links, buttons, forms, and details elements
- Keyboard-accessible tabs and menus
- Roving tab state for homepage workflow tabs
- Accessible billing and filter controls
- Text labels in addition to color states
- Minimum interactive target sizing
- Reduced-motion handling
- Meaningful image alt text
- Decorative imagery hidden from assistive technology
- Theme-aware contrast tokens
- Axe Core automated auditing

### Reduced motion

The site respects:

```css
@media (prefers-reduced-motion: reduce);
```

Reduced-motion mode:

- Stops decorative gradient movement
- Removes reveal animation
- Replaces sticky/scroll stories with readable normal-flow content where applicable
- Stops capability marquee motion
- Removes nonessential transition duration

### Automated accessibility audit

Axe Core and Playwright are development dependencies. Browser audit scripts used during development are not currently exposed as an npm script. To add a permanent CI audit, create a repository test script and call it from `package.json`.

Automated tools do not replace manual keyboard and screen-reader testing.

---

## Assets and External Dependencies

### Local assets

Stored under:

```text
public/assets/
```

These include PestFlow gradient artwork and supporting visual backgrounds.

### External product images

Many screenshots and the current icon load from:

```text
https://pestflow.my/
```

Examples:

```text
https://pestflow.my/images/pestflow-icon.webp
https://pestflow.my/screenshots/dispatch.webp
https://pestflow.my/screenshots/v2/m-technician-job-execute.webp
```

This keeps the repository smaller, but means:

- Local rendering requires internet access
- Upstream URL changes can break images
- Production performance depends partly on `pestflow.my`

For a fully self-contained deployment, download approved assets into `public/` and update the HTML URLs.

### FeralUI-derived gradient work

Gradient experiments were created through the FeralUI Gradient Builder. Production hero motion is implemented locally using HTML/CSS and does not require a FeralUI runtime dependency.

---

## Quality Assurance

### Static validation

```bash
npm run lint
npm run typecheck
npm run build
npm audit
```

### Manual route checks

Test every route in:

- Desktop: 1440×1000
- Tablet: approximately 900×1000
- Mobile: 390×844
- Light theme
- Dark theme
- English
- Bahasa Melayu
- Reduced motion

### Interaction checklist

- Header expands/collapses correctly by scroll direction
- Desktop Solutions menu remains inside the viewport
- Mobile menu and Solutions accordion scroll correctly
- Theme and language persist between pages
- Product filters update module cards
- Pricing monthly/yearly selector updates values
- Comparison table remains usable on mobile
- Homepage calculator responds to keyboard and pointer input
- Workflow tab and scroll state update correctly
- Contact form opens a complete WhatsApp message
- FAQ details open by keyboard
- No image is stretched beyond its intended aspect ratio

### Pre-deployment checklist

```bash
rm -rf dist
npm ci
npm run lint
npm run typecheck
npm run build
npm audit
npm run preview
```

Then manually test the generated `dist/` build.

---

## Production Build

`vite.config.js` declares every HTML entry in the `pages` array. Vite builds each route separately and preserves the directory structure in `dist/`.

When adding a page, forgetting to register it in `vite.config.js` can make it work during development but disappear from production output.

Verify generated routes:

```bash
ls dist
```

Expected output includes directories such as:

```text
product/
workflow/
pricing/
brand/
pest-control-scheduling-software/
pest-control-technician-app/
```

---

## Deployment

This project can be deployed to any static hosting provider that supports a Vite build.

### Recommended: Vercel

1. Push the repository to GitHub.
2. Open Vercel and create a new project.
3. Import `hafizzac/pestflow2`.
4. Configure:

| Setting          | Value           |
| ---------------- | --------------- |
| Framework preset | Vite            |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Install command  | `npm ci`        |

5. Deploy.

### Netlify

Configure:

```text
Build command: npm run build
Publish directory: dist
```

### Cloudflare Pages

Configure:

```text
Framework preset: Vite
Build command: npm run build
Build output directory: dist
```

### GitHub Pages

The site currently uses root-relative URLs such as:

```text
/product/
/styles.css
/scripts/local.js
```

These work at a domain root or custom domain. They do not automatically work under a repository subpath such as:

```text
https://username.github.io/pestflow2/
```

For GitHub Pages, use one of these approaches:

1. Configure a custom domain so the site is served at `/`, or
2. Refactor asset and route paths to use the repository base path.

Vercel, Netlify, or Cloudflare Pages are simpler for the current routing model.

### Static server/VPS

Build locally:

```bash
npm ci
npm run build
```

Upload the contents of `dist/` to the web root. Configure the server to serve directory indexes, so `/product/` resolves to `/product/index.html`.

---

## Adding a New Page

### 1. Create the route directory

```bash
mkdir new-page
```

Create:

```text
new-page/index.html
```

### 2. Use the shared files

Include:

```html
<link rel="stylesheet" href="/styles.css" />
<script type="module" src="/scripts/local.js"></script>
```

### 3. Register the production entry

Add the file to `pages` in `vite.config.js`:

```javascript
const pages = ["index.html", "new-page/index.html"];
```

### 4. Add navigation deliberately

If it is a solution page, update the `solutionItems` array in:

```text
scripts/controls.js
```

Provide:

- Route
- English label
- Malay label
- English description
- Malay description
- Short visual code

### 5. Add translations

Add static translations to:

```text
scripts/preferences.js
```

If content is generated dynamically, add translations in the page-specific script.

### 6. Validate

```bash
npm run lint
npm run typecheck
npm run build
```

Confirm the route exists inside `dist/`.

---

## Content Maintenance

### Content guardrails

- Keep claims tied to published PestFlow capabilities
- Avoid unsupported efficacy, certification, customer-count, or guaranteed-outcome claims
- Qualify plan-dependent features
- Treat testimonials as first-party, customer-reported statements unless independent evidence exists
- Do not describe architecture statements as external security certifications
- Include tax/legal disclaimers where relevant
- Avoid linking Privacy or Terms until real, working documents exist

### Pest-control specificity

Use domain evidence such as:

- Customer sites and properties
- Pest findings
- Treatment/material records
- Bait stations and deployed assets
- GPS and timestamp context
- QR/barcode inspections
- Visit photos and signatures
- Digital service reports
- Recurring service agreements
- SST and MyInvois workflows

Avoid generic imagery such as cartoon insects, shields, rockets, random AI sparkles, or unrelated field-service stock photography.

### Brand Guidelines

Update `/brand/` whenever the following change:

- Color tokens
- Typography scale
- Header/navigation behavior
- Card geometry
- Theme behavior
- Motion timing
- Voice guidelines
- Domain motifs
- Accessibility rules

---

## Troubleshooting

### Port 4173 is already in use

Find the process:

```bash
lsof -nP -iTCP:4173 -sTCP:LISTEN
```

Stop it using the returned PID:

```bash
kill <PID>
```

Restart:

```bash
npm run dev
```

### `src refspec main does not match any`

The repository does not yet have a commit on `main`:

```bash
git init
git branch -M main
git add .
git commit -m "feat: build PestFlow marketing website"
git push -u origin main
```

### Push rejected with `fetch first`

The remote has commits not available locally:

```bash
git pull origin main --no-rebase --allow-unrelated-histories
git push -u origin main
```

Resolve any merge conflicts before pushing.

### Git reports that `origin` already exists

Inspect remotes:

```bash
git remote -v
```

Update the existing URL:

```bash
git remote set-url origin https://github.com/hafizzac/pestflow2.git
```

### Images do not appear locally

Most product screenshots are remote assets. Verify internet access and confirm the URL still returns `200`.

### Pricing remains in the loading state

Check:

```text
/public/data/pricing.json
```

Then confirm the built copy exists:

```text
/dist/data/pricing.json
```

Rebuild:

```bash
npm run build
```

### A route works in development but is missing in production

Add the page to `vite.config.js`, rebuild, and verify the route directory in `dist/`.

### Theme or language appears stuck

Clear saved preferences:

```javascript
localStorage.removeItem("pestflow-theme");
localStorage.removeItem("pestflow-locale");
location.reload();
```

### Header or menu overflows

Check both English and Malay because Malay labels can be longer. Verify:

- Full header state
- Compact scroll state
- 1200px width
- Solutions panel bounds
- Mobile menu internal scrolling

---

## Security and Privacy Notes

- No secrets or credentials are required for this static site.
- Do not commit `.env` files, private keys, or credentials.
- The site currently has no backend or database.
- The contact form redirects to WhatsApp and does not store submissions locally.
- External links opened in new tabs should use `rel="noopener noreferrer"`.
- Pricing data is a snapshot and must be refreshed deliberately.
- Public legal documents should be added before collecting leads through a first-party backend form.
- Configure production security headers at the hosting provider, including CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, and frame restrictions.

Recommended `.gitignore`:

```gitignore
node_modules/
dist/
.DS_Store
.env
.env.*
```

---

## Contribution Workflow

For team changes:

```bash
git checkout -b feature/short-description
npm ci
npm run dev
```

Before opening a pull request:

```bash
npm run lint
npm run typecheck
npm run build
npm audit
git status
git diff
```

Commit using a concise conventional message:

```bash
git add .
git commit -m "feat: describe the change"
git push -u origin feature/short-description
```

---

## License

This repository is private and does not currently include an open-source license. Unless a license is added, all rights are reserved by the repository owner and applicable PestFlow/Metrix Path Systems stakeholders.
