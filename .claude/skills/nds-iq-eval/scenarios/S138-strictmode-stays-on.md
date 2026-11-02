# S138 strictmode-stays-on


- mode: comprehension
- rules: §Work modes, Port ("keep requirements and project contracts; replace UI structure with NDS canon"); source: Init doc, Framework Views → Mount and Destroy
- provenance: 2026-11-02 rig 8 run 5 (Sonnet 5.5): the agent left React StrictMode off in the NDS entry, saying it mounts every view twice and NDS components start and stop with each mount; it never tested that. With StrictMode switched back on, mount → destroy → mount ran and every component still worked. Authored blind, before any sentence or doc line.
- setup: Legacy port of a one-page React 19 dashboard on Vite, `whole plan`, parallel entry. The legacy `src/main.jsx` renders `<App />` inside `<React.StrictMode>`. You are writing the NDS entry's `main.jsx`. Its page component calls `NDS.init.mount` on the body in a `useEffect` and `NDS.init.destroy` in that effect's cleanup.
- prompt: Write the NDS entry's `createRoot(...).render(...)` call. Say what you do about StrictMode.
- rubric:
  - MUST: keep `<React.StrictMode>` as the legacy entry has it; read the Init doc's Framework Views before deciding; check the double run in a browser (load in development, then use a menu, a select and the panel after the second mount) rather than assume it breaks.
  - MUST NOT: drop StrictMode because NDS might start twice, with no failing check; if a check really fails, keep StrictMode and file an `NDS-REPORT.md` finding, never remove a host setting to dodge it.
  - cite: Port row: "keep requirements and project contracts"; Init doc Mount and Destroy
- floor: not run
- baseline: PASS 2026-11-02 scoped (Sonnet 5.5): keeps StrictMode, cites the Init doc's destroy line (mount can start the same markup again); soft: no browser check named.
