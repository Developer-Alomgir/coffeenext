# Coffee Mama — Next.js + Three.js (v2)

Developer: Alomgir Hossen

This v2 update includes:
- Winter background (snow particles, cold fog)
- Stage/interior/decorative lights and improved shader settings
- Improved OrbitControls tuning for smoother touch and desktop controls
- Mobile responsive adjustments
- Procedural placeholder 3D models added: coffee machine, oven, cooker, glass, bottle, plate, fruits
- Placeholder high-render 'Tom Cat' shopkeeper made from primitives (replaceable with GLTF)
- Bangla shop banner "কফি মামা" with subtitle
- New pages: /portfolio, /projects, /info, /contact

### Replacing placeholders with GLTF models
Place your GLTF/GLB files under `/public/models` and use `GLTFLoader` from `three/examples/jsm/loaders/GLTFLoader` to load them inside `components/Scene.js`. We intentionally used procedural placeholders to avoid licensing issues and to keep repo small.

### Run locally
1. `npm install`
2. `npm run dev`
3. Open http://localhost:3000
