# S139 lazy-view-stays-lazy


- mode: comprehension
- rules: §Work modes, Port ("keep requirements and project contracts"); source: Init doc, Framework Views → Mount and Destroy ("after a view mounts")
- provenance: 2026-11-02 rig 8 run 5 (Sonnet 5.5): the legacy dashboard loads its crew board with `React.lazy` and `Suspense`; the NDS port imported it eagerly and let the page-level mount start its components at load. Authored blind, before any sentence or doc line.
- setup: Legacy port of a one-page React 19 dashboard, `whole plan`, parallel entry. Legacy `App.jsx` has `const CrewBoard = lazy(() => import('./components/CrewBoard.jsx'))`, rendered in `<Suspense fallback={<p>Loading crew board...</p>}>`. The NDS page component calls `NDS.init.mount` on the body once, in a `useEffect`.
- prompt: Write how the NDS page loads the crew board, its fallback, and where its NDS components start. Sketch the code.
- rubric:
  - MUST: keep `lazy` + `Suspense`; the crew board's own component calls `NDS.init.mount` on its root in an effect when it mounts, and `destroy` in the cleanup; the fallback is NDS markup (the loading state the docs give).
  - MUST NOT: import the crew board eagerly; rely on the page-level mount at load to start a view that mounts later.
  - cite: Port row: "keep requirements and project contracts"; Init doc: "Call `window.NDS?.init.mount(view)` after a view mounts"
- floor: not run
- baseline: PASS 2026-11-02 scoped (Sonnet 5.5): keeps lazy + Suspense, mounts in the board's own effect, Loading canon as the fallback. WATCH field ×3 (rig 8 runs 5, 6 and 7); the Init doc names a late view since run 6, and run 7 still loaded it eagerly.
