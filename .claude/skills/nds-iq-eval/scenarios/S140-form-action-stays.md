# S140 form-action-stays


- mode: comprehension
- rules: §Work modes, Port ("keep requirements and project contracts"); source: Init doc, Framework Views → Field Values (React 19 form actions); Form doc
- provenance: 2026-11-02 rig 8 run 5 (Sonnet 5.5): the legacy New ticket form submits through a React 19 form action with `useActionState` (one submit, server 422 errors in state); the port replaced it with `data-ajax` and an `nds:form:valid` listener. Authored blind, before any sentence or doc line.
- setup: Legacy port of a one-page React 19 dashboard, `whole plan`. Legacy `NewTicketModal.jsx`: `const [state, formAction, pending] = useActionState(createTicketAction, initial)`, `<form action={formAction} noValidate>`. The action validates, calls the API, and returns `{ errors: { title: '…' } }` on a 422. You are building the NDS modal's form.
- prompt: Write the NDS form's opening tag and its submit wiring, and how a 422 error on the title reaches the field. Sketch the code.
- rubric:
  - MUST: keep the form action and `useActionState` as the one submit path; show `state.errors` on each field through the field's NDS status (the Form doc's status API), from an effect on `state`; read the Init doc's Field Values and the Form doc first.
  - MUST NOT: replace the action with `data-ajax` and an `nds:form:valid` listener; run a second submit path beside the action.
  - cite: Port row: "keep requirements and project contracts"; Init doc Field Values (React 19 form action)
- grading note: tested 2026-11-02 (React 19.3.1, StrictMode, no `data-ajax`): NDS blocks an invalid submit before the action, the action runs once per valid submit, `setStatus` shows its errors. The Init doc's Field Values now says so.
- floor: not run
- baseline: PASS 2026-11-02 scoped (Sonnet 5.5): keeps `<form action>`, no `data-ajax`, `setStatus` from an effect on `state`, cites the new Init doc line. WATCH field ×2 (rig 8 runs 5 and 6).
