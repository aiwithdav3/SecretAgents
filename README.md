# SecretAgents

## Hardcade RPG Mode v1.0

Your Next.js site now includes a fully playable cyberpunk RPG hub that turns site navigation into an immersive third-person experience.

### Features

- **Dual Camera Modes**: Third-person and isometric views (press T to toggle)
- **Intuitive Controls**: WASD movement, mouse drag to rotate camera, E to interact
- **Interactive Navigation**: Walk to glowing markers and press E to travel to different pages
- **Cyberpunk Aesthetic**: Neon-lit player character, procedural starfield, atmospheric lighting
- **Five Destinations**: Main, About, Gallery, Dashboard, and Contact pages

### Controls

- **W/A/S/D**: Move forward/left/back/right
- **Mouse Drag**: Rotate camera yaw (in third-person mode)
- **E**: Interact with nearby markers to navigate to pages
- **T**: Toggle between third-person and isometric camera modes

### Quick Start

```bash
# Dependencies are already installed
npm run dev

# Navigate to the game
http://localhost:5000/game
```

### File Structure

```
components/game/
  ├── store.ts         # Zustand state management for camera mode, player position, hints
  ├── useInput.ts      # Keyboard and mouse input handling hook
  ├── Player.tsx       # Player character with movement physics and neon capsule model
  ├── CameraRig.tsx    # Smart camera with smooth following and mode switching
  ├── NavMarker.tsx    # Interactive navigation spheres with proximity detection
  ├── HUD.tsx          # On-screen display for controls and hints
  └── GameCanvas.tsx   # Main 3D scene with lighting, world, and markers

app/game/
  └── page.tsx         # Game route with dynamic loading

public/audio/
  └── .gitkeep         # Placeholder for ambient audio loops
```

### Tech Stack

- **Three.js**: 3D rendering engine
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers (Stars, Html, OrbitControls)
- **Zustand**: Lightweight state management
- **Howler**: Audio library (ready for ambient loops)
- **Next.js 16**: App router with dynamic imports
- **Tailwind CSS**: HUD styling

### Navigation Markers

The scene includes five neon navigation spheres positioned around the player:

- **Main** (cyan): Front center at [0, 0, -2]
- **About** (magenta): Right at [4, 0, -1]
- **Gallery** (lime): Left at [-4, 0, -1]
- **Dashboard** (purple): Back right at [2, 0, 4]
- **Contact** (orange): Back left at [-2, 0, 4]

Walk within 1.6 meters of any marker and press E to navigate to that page.

### Upgrade Path

1. **Physics**: Add Rapier for proper collision detection and terrain navigation
2. **Character Models**: Replace capsule with glTF animated characters
3. **Advanced Interactions**: Quest system, dialogue trees, inventory
4. **World Building**: Import glTF city kits, add LOD management
5. **Audio**: Ambient loops with Howler, spatial 3D sound
6. **Mini-map**: Top-down radar with marker positions
7. **Transitions**: Screen effects when routing (iris wipe, pixel sort shaders)
8. **Save System**: LocalStorage or database persistence for player position

### Performance Notes

- Stars can be disabled on low-end devices
- Shadow rendering can be toggled for better framerates
- OrbitControls are currently disabled but available for debugging
- Canvas size is responsive with `h-[calc(100vh-160px)]`

### Cyberpunk Vibes

The scene features:
- **Neon player model**: Cyan capsule body with magenta visor
- **Procedural city**: 12 rotating building blocks with emissive purple glow
- **Starfield**: Slow-rotating particle system
- **Dramatic lighting**: Directional cyan light with purple ground bounce
- **Dark atmosphere**: Deep space background (#0a0a0b)

Built with Zelda-like exploration and Tron-like aesthetics. Your pages are now portals in a cyber dungeon.

---

*"Walk to the light. Press E. Pretend I'm not excited."*
