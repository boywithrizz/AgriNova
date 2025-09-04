# AI Crop Advisor • Frontend Prototype

A mobile-first React + Tailwind demo that showcases an AI-based crop recommendation solution for farmers. It is frontend-only and uses mock JSON data.

Highlights
- Soil and weather cards
- AI recommendation cards (yield, profit, sustainability)
- Market trends chart (Recharts)
- Text/voice/image query UI (no backend)
- Multilingual toggle
- Offline indicator

Tech
- React + Vite + TypeScript
- Tailwind CSS
- lucide-react icons
- Recharts
- React Router

Run locally
1. Install dependencies
2. Start dev server

Note: This prototype is frontend-only. No real APIs or backend calls.

Deploy on Vercel
- One-time setup (CLI):
	1) Install Vercel CLI (optional)
	2) Login
	3) Deploy

	```bash
	npm i -g vercel
	vercel login
	vercel
	```

- Or, from vercel.com dashboard:
	1) New Project → Import your Git repo
	2) Framework preset: Vite
	3) Build Command: `npm run build`
	4) Output Directory: `dist`
	5) Root Directory: repository root (this folder)

Notes
- `vercel.json` is included for single-page app routing and long-term caching of assets.
- If using monorepo, set the project root accordingly when importing.