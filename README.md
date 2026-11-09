# ChocoTreat — Handcrafted Artisan Chocolates

> *"A Little Luxury in Every Bite"*

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-22c55e?style=for-the-badge&logo=github&logoColor=white)](https://mauryakandula.github.io/Choco-Treats/)
[![Deploy Status](https://github.com/MauryaKandula/Choco-Treats/actions/workflows/deploy.yml/badge.svg)](https://github.com/MauryaKandula/Choco-Treats/actions/workflows/deploy.yml)

A bespoke, mobile-first web boutique for **ChocoTreat**, a small-batch, home-based artisan chocolate boutique.

🌐 **Live URL**: [https://mauryakandula.github.io/Choco-Treats/](https://mauryakandula.github.io/Choco-Treats/)

---

## Features & Architecture

- **Brand Identity System**: Original vector SVG Primary Wordmark and Circular Scalloped Vintage Seal, with an instant toggle between `ChocoTreat` and `Choco Treats` in Owner Settings.
- **Page & Section Motion**: Smooth `motion/react` fade and slide-up transitions across tabs, viewport scroll-reveal sections, shrinking sticky navigation header, and `prefers-reduced-motion` accessibility compliance.
- **Interactive Flavor & Shop Catalog**: Filter by category (`Classic Milk`, `Coffee & Crunch`, `Roasted Nuts`, `Gift Boxes`, `Chocolate Lab`), search in real time, and sort (`Featured`, `Name A–Z`, `Name Z–A`, `Category`) with image skeleton shimmer states.
- **Custom Gift Box Builder**: Interactive 6 / 12 / 24-piece box configurator with flavor steppers, wrapper foil selector (`Antique Bronze`, `Emerald Green`, `Regal Purple`, `Silver Foil with Sky Blue Ribbon`), personalized message preview, and event date picker.
- **WhatsApp-First Ordering Flow**: Persistent `localStorage` inquiry bag, client-side validation, formatted WhatsApp checkout generator, and instant Demo Mode clipboard copy fallback.
- **Local Delivery Pincode Checker**: Real verification against configurable serviceable pincodes.
- **Bulk & Café Supply Portal**: Dedicated B2B wholesale inquiry generator for coffee shops, retail stocking, corporate gifting, and return favors.
- **Owner Boutique Settings**: Discreet footer control to update brand spelling, WhatsApp number, pricing visibility (`Price on Request` vs tentative `₹15` / `₹25 MRP`), and serviceable pincodes.

---

## Local Development

### Prerequisites
- Node.js 18+ and npm

### Run Locally
```bash
# 1. Install dependencies
npm install

# 2. Start development server on port 3000
npm run dev
```

### Production Build & Type Check
```bash
# Type check with TypeScript
npm run lint

# Build production bundle into dist/
npm run build

# Preview production build
npm run preview
```

---

## Deployments

### 1. GitHub Pages (Automated via Actions)
This repository is configured with GitHub Actions (`.github/workflows/deploy.yml`). Pushing to `main` automatically triggers a build and publishes to:
👉 **[https://mauryakandula.github.io/Choco-Treats/](https://mauryakandula.github.io/Choco-Treats/)**

### 2. Google AI Studio / Cloud Run
1. Verify compilation passes cleanly (`npm run build`).
2. Click the **Share** or **Deploy** button in Google AI Studio to deploy directly to Google Cloud Run.
