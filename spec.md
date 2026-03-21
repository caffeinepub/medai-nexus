# MedAI Nexus

## Current State
New project. No existing application files.

## Requested Changes (Diff)

### Add
- Full-screen API key activation panel (shown first, blocks main app until key entered)
- Futuristic cyberpunk navbar with logo, nav links, status indicator
- Hero section with particle background and holographic elements
- Symptom input panel: search with autocomplete, multi-select, clickable tags, 220+ symptoms categorized (General, Critical, Rare)
- AI analysis engine: local matching algorithm (count matches, calculate %, rank results) + fetch() call to user-provided API endpoint using stored API key
- AI Result Dashboard: typing animation for AI response, confidence %, possible diseases ranked
- Disease Info Section: 60-80 diseases each with name, symptoms, severity, diet, precautions
- Dark/light theme toggle
- Glowing cursor effect
- Scan/loading animation
- Footer with system status

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: minimal Motoko actor (store nothing sensitive, API key stays in browser only)
2. Frontend: single-page React app with all sections
   - APIActivationScreen component (fullscreen, blocks app)
   - ParticleBackground component (canvas-based)
   - Navbar, Hero, SymptomPanel, ResultDashboard, DiseaseInfo, Footer
   - Large data files: symptoms.ts (220+), diseases.ts (60-80)
   - matchingAlgorithm.ts utility
   - API call utility using stored key
   - Animations: typing effect, scan sweep, pulse glows via CSS/framer
   - Responsive layout
