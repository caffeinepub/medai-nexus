# MedAI Vision

## Current State
Full MedAI Nexus app with ActivationScreen (4-slide walkthrough, black/yellow), Navbar, Hero, SymptomPanel, ResultDashboard, Footer. Current theme is black + yellow (#f5c518). Slide transitions exist but are not 3D.

## Requested Changes (Diff)

### Add
- 3D perspective rotateY + translateX slide transitions (outgoing rotates away, incoming spins in)
- Blackish-gold color token

### Modify
- Whole app theme: dark blue (#0a0f2e) background, blackish-gold (#b8860b) gradient overlays, red (#cc0000) + yellow-gold (#f5c518) accents, white text, dark blue cards with gold borders
- ActivationScreen: 3D flip+translate transitions with cubic-bezier easing, per-slide animations
- Navbar, Hero, SymptomPanel, ResultDashboard, Footer: updated to new palette
- Gyroscope rings + radar: red + gold

### Remove
- Black-only background (replaced with deep dark blue)

## Implementation Plan
1. Update all components to 5-color palette
2. Rewrite ActivationScreen transitions to 3D perspective flip + translate
3. Add per-slide animations in ActivationScreen
4. Update Hero gyroscope/radar colors
5. Update all remaining sections to match
6. Validate build
