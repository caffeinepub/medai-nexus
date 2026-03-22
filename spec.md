# MedAI Nexus – Dark Neon Theme

## Current State
The app uses a deep navy-to-purple gradient background with glassmorphism cards, soft blue/purple accent colors, and white text. CSS variables define all color tokens in index.css.

## Requested Changes (Diff)

### Add
- Neon glow variables: cyan (#00f5ff), magenta (#ff00ff), neon green (#00ff88), electric blue (#0080ff)
- Neon text-shadow and box-shadow effects on buttons, cards, headings
- Scanline/grid overlay for cyberpunk feel
- Neon-colored confidence bars and severity badges
- Neon animated borders on cards and inputs

### Modify
- Background: deep black (#030712) instead of navy-to-purple gradient
- CSS variables: replace blue/purple accents with neon cyan, magenta, green, electric blue
- ActivationScreen: black bg with neon cyan/magenta particle network and glowing title
- Navbar: black translucent bar with neon cyan logo glow and neon CTA button
- Hero: black bg, neon-ringed gyroscope, neon chip labels, neon glow headings
- SymptomPanel: dark cards, neon selected states, neon category tabs
- ResultDashboard: dark cards, neon confidence bars, neon step icons, neon download button
- Footer: dark bg with neon accent text
- index.css: full neon dark token overhaul

### Remove
- Blue-to-purple gradient backgrounds on body/sections
- Soft pastel blue/purple tones throughout

## Implementation Plan
1. Update index.css with neon dark tokens and new keyframe glow animations
2. Update ActivationScreen.tsx for black + neon cyan/magenta theme
3. Update Navbar.tsx for neon accents
4. Update Hero.tsx ring and chip colors to neon
5. Update SymptomPanel.tsx neon selected states
6. Update ResultDashboard.tsx neon confidence bars, step plan, download button
7. Update Footer.tsx neon accents
