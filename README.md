# Forma — a little less chaos

A complete, original SaaS landing page and interactive workspace concept for a web development agency portfolio. Forma is fictional. Team members, workspace data, pricing, and product capabilities are illustrative; there are no customer endorsements or fabricated testimonials.

## Run locally

Requires Node.js 22.12+ (Node 24 recommended) and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, normally `http://127.0.0.1:5173`.
On Windows PowerShell, use `npm.cmd` and `npx.cmd` if execution policy blocks the `.ps1` wrappers. No environment variables, API keys, or external services are needed.

## Checks

```sh
npm run lint
npm run format:check
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

Browser tests cover desktop and mobile navigation, horizontal overflow across seven widths (320–1440px), billing changes, signup confirmation, modal Escape/focus restoration, task creation/search/completion/reset, FAQs, and contact forms. Axe checks the page and signup dialog against WCAG A/AA rules. Playwright builds and starts a local production preview on port 4173. A browser download is needed once on a new machine. `npm run preview` serves the production build locally. `npm run format` formats source files with Prettier.

## Stack and structure

React 19, strict TypeScript, Vite, Tailwind CSS 4 through its Vite plugin, Lucide icons, ESLint, Prettier, Playwright, and Axe. Tailwind supplies the theme and reset; component-specific CSS controls the editorial layout and responsive product mockup.

```text
public/                  Original SVG brand and social assets
src/
  components/
    Brand.tsx            Reusable Forma wordmark
    Dialog.tsx           Native accessible modal with focus restoration
    ProductPreview.tsx   Stateful interactive project workspace
    ThemeToggle.tsx      System-aware, persistent light/dark switch
  data/content.ts        Feature, plan, and FAQ content
  App.tsx                Landing sections and demo form flows
  main.tsx               React entry point
  styles.css             Theme, components, motion, and breakpoints
tests/                   Desktop and mobile browser journeys
index.html               Page metadata
vercel.json              Build settings and response headers
```

## Interactive behavior

- Responsive menu, anchors, skip link, and back-to-top navigation.
- Desktop workspace project switching, personal tasks, and activity feed.
- Board/list views, task search and category filter (on wider screens), add-task dialog, task details, complete/reopen actions, and live status feedback.
- Monthly/yearly plans with accurate illustrative annual totals. Paid plans are per person. The maximum yearly discount is 25%.
- Plan-specific demo signup, contact form, and FAQ accordion.
- Privacy and demo terms dialogs. Modal dialogs use native focus containment, Escape dismissal, and focus restoration.
- All form submissions are explicitly simulated: no network requests, email, persistence, payments, or account creation. Inputs use browser validation. Workspace changes live in React state and reset on reload. Use sample form details.

The compact mobile preview prioritizes the board/list workspace; its decorative sidebar and type filter collapse at smaller breakpoints. Forms and primary controls remain accessible.

## Design, accessibility, and performance

Cobalt blue and violet with cool neutral surfaces; system sans-serif with a Georgia italic accent. The header switch toggles light and dark mode. The initial theme follows the device setting; an explicit choice is remembered in local storage under `forma-theme`. If storage is blocked, the switch still works for the current session. Semantic CSS tokens in `src/styles.css` define both palettes. No remote font requests, stock imagery, trackers, or external data dependencies. Product illustrations are original HTML/CSS. Icons are imported individually. Vite emits compressed-ready, hashed assets; Vercel configuration caches those assets for one year.

Semantic landmarks, labeled inputs, a skip link, visible focus states, accessible modal titles, button states, FAQ region associations, and live submission feedback support keyboard and assistive technology use. Reduced-motion preferences disable animation and smooth scrolling. Automated checks complement, rather than replace, a full manual accessibility audit.

The document includes a title, description, language, viewport, theme color, Open Graph metadata, favicon, and original social-card SVG. Search indexing is deliberately disabled with `noindex, nofollow` because this is a fictional portfolio demo. Before adapting it into a real service, replace fictional copy, set production canonical/absolute social URLs, create a raster social image for clients that do not support SVG, and review the indexing policy. Keep the disclosure for a portfolio deployment.

## Deploy to Vercel — when authorized

This project has not been deployed or pushed automatically.
The deployment workflow follows the [official Vite on Vercel guide](https://vercel.com/docs/frameworks/frontend/vite).

1. Run the checks above and `npm run build`.
2. When you choose to publish, either import an authorized Git repository in the Vercel dashboard or run the Vercel CLI from this folder.
3. Select the **Vite** framework preset, build command **`npm run build`**, output directory **`dist`**, and the project root as the root directory. Select Node 24 in project settings. Leave environment variables empty.
4. Review the preview deployment before promoting it to production. No SPA rewrite is needed: this is a single page using hash navigation.

Optional CLI commands (these perform external deployment and must only be run with permission):

```sh
npx vercel
# After reviewing the preview and authorizing production:
npx vercel --prod
```

To turn the concept into a real SaaS, separately implement authentication, database storage, authorization, actual form processing, subscription billing, and service-specific privacy/terms. None of those services are implied by this demo.
