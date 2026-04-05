# MedAI Nexus

## Current State
Full MedAI Nexus app with dark/light CSS variable theme system (index.css). Navbar has no theme toggle. App.tsx force-sets data-theme='dark' on mount.

## Requested Changes (Diff)

### Add
- Dark/light theme toggle pill in Navbar top-right
- Ultra-futuristic dark theme: #060d1f background, #00e5ff electric cyan, #7c3aed violet, #06ffa5 neon green accents, neon glows, scanlines
- localStorage theme persistence

### Modify
- index.css dark vars: ultra-futuristic neon palette
- index.css light vars: crisp clean version
- Navbar.tsx: add moon/sun pill toggle
- App.tsx: load/save theme from localStorage, pass toggle to Navbar

### Remove
- Nothing

## Implementation Plan
1. Update index.css dark/light vars
2. Add scanline + hex overlay CSS for dark mode
3. Update App.tsx theme logic
4. Update Navbar.tsx with toggle pill
