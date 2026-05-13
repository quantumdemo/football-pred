# Agent Instructions for FootballIntel

## 🛠 Tech Stack Details
- **Next.js 15**: Use App Router patterns. API routes are under `app/api`.
- **Tailwind CSS v4**: All theme configuration is in `app/globals.css` using the `@theme` block. Do not look for `tailwind.config.js`.
- **Statelessness**: This application does not use a database. All state is derived from real-time API calls or mock-data fallbacks.

## 🧠 Business Logic
- **Prediction Logic**: Located in `lib/prediction-engine.ts`. If you add new markets, update the probability calculation and the `marketPredictions` array.
- **Mock Data**: Always maintain `lib/mock-data.ts` with high-quality samples. This is critical for the "works out of the box" experience.

## 🎨 Design System
- Background: `#0a0a0a`
- Cards: `#141414` (use `.glass-card` class)
- Accents: Neon Green (`#00ff00`)
- Typography: Black/Heavy weights for headings to match sportsbook aesthetics.

## 🔍 Verification
- Run `npm run lint` before submitting.
- Use Playwright to verify visual changes, especially for the dark mode gradients and neon glow effects.
