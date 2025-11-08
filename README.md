# SecretAgents

## Hardcade RPG Mode — Production Ready

Your Next.js site now includes a fully playable cyberpunk RPG hub that turns site navigation into an immersive third-person experience. Built with the dictum philosophy: inspiring expressions meet interactive navigation.

---

## 3D Games in Next.js: The Real Story

### Core Stack

1. **Three.js**: Raw WebGL power with a sane API
2. **React Three Fiber**: React renderer for Three.js — scene graph as JSX, state handled like normal React
3. **Drei**: Helpers, controls, loaders, effects — the "stop reinventing wheels" kit
4. **Zustand**: Lightweight state management for game state
5. **Dictum-inspired quotes**: Collection of cyberpunk, tech, and wisdom expressions

### Typical Workflow

1. Create or reuse a Next.js app. Keep the App Router.
2. Install `three`, `@react-three/fiber`, `@react-three/drei`, plus a tiny state store like Zustand.
3. Build your scene as React components: camera, lights, world, player, UI.
4. Load assets as glTF, keep textures compressed, limit draw calls.
5. Mount game components with a dynamic import to avoid SSR trying to render WebGL on the server.

### Next.js Considerations

1. **Rendering happens in the browser**: Use `dynamic(..., { ssr: false })` for any R3F component
2. **Keep 3D isolated from the server**: API routes remain server side. Canvas and scene live client side
3. **SEO on game pages**: Render a static shell with a hydrated client component inside
4. **Deployment**: Works with Netlify. Use your existing plugin setup and keep Node version pinned

---

## Current Implementation

### Features

- **Dual Camera Modes**: Third-person and isometric views (press T to toggle)
- **Intuitive Controls**: WASD movement, mouse drag to rotate camera, E to interact
- **Interactive Navigation**: Walk to glowing beacons and press E to travel to different pages
- **Cyberpunk Aesthetic**: Neon-lit player character, procedural starfield, atmospheric lighting
- **Dictum Quotes**: Rotating collection of inspiring tech and cyber wisdom
- **Five Destinations**: Main, About, Gallery, Dashboard, and Contact pages

### Controls

- **W/A/S/D**: Move forward/left/back/right
- **Mouse Drag**: Rotate camera yaw
- **E**: Interact with nearby beacons to navigate to pages
- **T**: Toggle between third-person and isometric camera modes

### Quick Start

```bash
# Dependencies installed
npm run dev

# Navigate to the game
http://localhost:5000/game
```

### File Structure

```
components/rpg/
  ├── Scene.tsx        # Consolidated game scene (Player, Rig, Beacons, World, HUD)
  ├── store.ts         # Zustand state for camera mode and hints
  └── quotes.ts        # Dictum-inspired quote collection and utilities

app/game/
  └── page.tsx         # Game route with dynamic loading (SSR disabled)
```

### Beacon Positions

The scene includes five neon navigation spheres positioned around the player:

- **Main** (cyan): Front center `[0, 0, -2]`
- **About** (magenta): Right `[4, 0, -1]`
- **Gallery** (lime): Left `[-4, 0, -1]`
- **Dashboard** (purple): Back right `[2, 0, 4]`
- **Contact** (orange): Back left `[-2, 0, 4]`

Walk within 1.6 meters of any beacon and press E to navigate to that page.

---

## Production Tips That Keep You Out of Trouble

### Assets

1. **Use glTF with Draco or Meshopt compression**
2. **Atlas small props** to reduce materials and draw calls
3. **Keep textures in power of two sizes**. Use WebP or AVIF for UI textures
4. **Preload models** with `useGLTF.preload()` before route changes

### Performance

1. **Lock the canvas to a fixed area**. Avoid full screen on mobile unless tested
2. **Start with no shadows**, then enable on key lights only
3. **Do not spawn heavy loaders on route changes**
4. **Limit draw calls**: Merge geometries, use instanced meshes for repeated objects
5. **Disable Stars on low-end devices** if framerate drops

### Controls and Feel

1. **Add pointer lock** for a tighter third-person camera if you want shooter behavior
2. **For Zelda and Landstalker feel**, add an isometric snap that locks yaw to 45 degrees
3. **Add a lightweight physics layer later**: Rapier plus a character controller will give slopes and ramps
4. **Spring smoothing**: Current camera uses lerp with exponential decay for natural follow

### Next.js Hygiene

1. **Keep all R3F components as client components** (`"use client"` at the top)
2. **Use API routes** for leaderboard, save data, and file listings
3. **Dynamic imports with `ssr: false`** for any component that uses Canvas
4. **Keep SSR out of the blast radius**: Server renders shell, client hydrates game

### Deployment

- **Netlify deploy works** with your existing config
- **Keep Node version** at or above your Next 16 requirement
- **Environment variables**: Add any API keys for quote services or analytics
- **Build optimization**: Canvas components won't slow down build time

---

## Dictum Integration

The game includes a rotating quote system inspired by [dictum by fisenkodv](https://github.com/fisenkodv/dictum), a collection of the most inspiring expressions of mankind.

### Quote Categories

- **cyber**: Cyberpunk and digital philosophy (William Gibson, Stewart Brand)
- **tech**: Technology and innovation (Alan Kay, Douglas Adams, Bill Gates)
- **future**: Forward-thinking visions (Marc Andreessen, Tim O'Reilly)
- **wisdom**: Life and work philosophy (Steve Jobs, Brené Brown)
- **code**: Programming wisdom (Kent Beck, Harold Abelson, Cory House)

### Quote Utilities

```typescript
import { getRandomQuote, getQuoteByCategory } from "@/components/rpg/quotes";

// Get any random quote
const quote = getRandomQuote();

// Get quote by category
const cyberQuote = getQuoteByCategory("cyber");
```

Quotes rotate every 15 seconds in the game HUD with a smooth fade transition.

---

## Upgrade Roadmap

1. **Physics**: Add Rapier for proper collision detection and terrain navigation
2. **Character Models**: Replace capsule with glTF animated characters with idle/walk blends
3. **Advanced Interactions**: Quest system, dialogue trees, inventory
4. **World Building**: Import glTF city kits, add LOD management for distant objects
5. **Audio**: Ambient loops with Howler, spatial 3D sound for beacons
6. **Mini-map**: Top-down radar with beacon positions and player orientation
7. **Transitions**: Screen effects when routing (iris wipe, pixel sort shaders)
8. **Save System**: LocalStorage or database persistence for player position
9. **Multiplayer**: Add WebRTC or socket.io for shared exploration
10. **Extended Quote API**: Fetch from quoterism.com API for thousands more expressions

---

## Architecture Notes

### Why This Structure Works

- **Single Scene component**: Easier to reason about, no prop drilling, shared state via Zustand
- **Direct DOM access for input**: Simpler than complex state machines, lower overhead
- **Client-only rendering**: WebGL can't run on server, dynamic import keeps build clean
- **Minimal dependencies**: Only what you need, nothing more
- **Production-tested patterns**: This works in deployed apps, not just tutorials

### What to Avoid

- ❌ **SSR on Canvas components**: Will break, always use `ssr: false`
- ❌ **Heavy physics on mobile**: Test on real devices, not just desktop
- ❌ **Synchronous asset loading**: Always preload, never block render
- ❌ **Global CSS affecting Canvas**: Keep game styles scoped
- ❌ **setState in useFrame**: Use refs for frame-by-frame values

---

## Cyberpunk Vibes

The scene features:

- **Neon player model**: Cyan capsule body with magenta visor
- **Procedural city**: 12 rotating building blocks with emissive purple glow
- **Starfield**: Slow-rotating particle system
- **Dramatic lighting**: Directional cyan light with purple ground bounce
- **Dark atmosphere**: Deep space background `#0a0a0b`
- **Quote wisdom**: Rotating expressions that capture the spirit of technology and innovation

Built with Zelda-like exploration and Tron-like aesthetics. Your pages are now portals in a cyber dungeon.

---

It boots, it routes, it feels like a tiny slice of Night City without the bugs. When you want real models, we'll wire glTF, animation clips, and a dialogue wheel, then pretend it was easy.

*"Walk to the light. Press E. Pretend I'm not excited."*
