# Silent Emergency

> **Your Silent Guardian When You Need It Most**

AI-powered personal safety application built with Next.js 14, featuring real-time emergency alerts, trusted contact management, stealth mode, and live location sharing.

---

## 🚀 Deploy to Vercel (One Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/silent-emergency)

---

## 🛠 Local Development

### Prerequisites
- Node.js 18+
- npm 9+

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
silent-emergency/
├── app/
│   ├── layout.jsx          # Root layout with metadata & fonts
│   ├── page.jsx            # Entry point
│   └── globals.css         # Global styles & design tokens
├── components/
│   ├── App.jsx             # Main app shell & routing
│   ├── constants.js        # Colors, dummy data
│   ├── Icon.jsx            # Custom SVG icon system
│   ├── LandingPage.jsx     # Marketing landing page
│   ├── AuthPage.jsx        # Login / signup
│   ├── Dashboard.jsx       # Safety dashboard
│   ├── EmergencyCenter.jsx # Panic button & stealth mode
│   ├── ContactsPage.jsx    # Trusted contacts management
│   ├── MapPage.jsx         # Live location map
│   ├── SettingsPage.jsx    # App settings & profile
│   ├── PremiumPage.jsx     # Subscription page
│   ├── AiPage.jsx          # AI risk monitoring
│   └── BottomNav.jsx       # Mobile navigation bar
├── public/
│   ├── manifest.json       # PWA manifest
│   └── robots.txt
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── package.json
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 🚨 **Panic Button** | 3-second countdown with multi-pulse animation, auto-alerts all contacts |
| 🕵️ **Stealth Mode** | Decoy calculator screen; tap `=` to exit |
| 📍 **Live Map** | SVG map with user & contact markers, safe-zone overlay |
| ✅ **Check-In Timers** | 30m / 1h / 2h timers; auto-alert on miss |
| 🤖 **AI Risk Monitor** | Animated gauge, behavioral signals, insight feed |
| 👥 **Contacts** | Up to 10 trusted contacts with priority ordering |
| 👑 **Premium** | Monthly/annual toggle, feature comparison |
| 🔐 **Auth** | Email, Apple, Google login flows |

---

## 🎨 Design System

- **Fonts:** `Syne` (display/headings) + `DM Sans` (body)
- **Base:** `#080A0E` dark background
- **Accent:** `#E8333A` red emergency color
- **Cards:** `#0F1117` with `#1E2330` borders, 20px radius
- **Animations:** `pulse-ring`, `pulse-dot`, `blink`, `fade-in`, `slide-up`

All design tokens are CSS custom properties in `app/globals.css`.

---

## 📦 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + CSS custom properties
- **Fonts:** Google Fonts (DM Sans + Syne)
- **Deployment:** Vercel (zero config)

---

## 🔧 Environment Variables

No environment variables required for the frontend demo.

To connect a real backend, add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

---

## 📄 License

MIT © 2025 Silent Emergency Inc.
