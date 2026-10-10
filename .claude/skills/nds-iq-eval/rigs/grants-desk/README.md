# Grants Desk

Internal staff console for reviewing grant applications. Committee reviewers open it to
see the applications assigned to them, record a decision, and print a submission receipt.

Single-page app: React with client-side routing, no backend. The application list lives in
memory (`src/data.js`), so any change is lost on reload. That is deliberate for the demo
build; the deployed console reads the same shapes from the grants database.

## Run it

```
npm install
npm run dev
```

Opens on http://localhost:5177.

## Layout

| Path | Screen |
|---|---|
| `/requests` | Application list: counters, keyword search, sortable table |
| `/requests/new` | Three-step application form with per-step validation |
| `/requests/:id` | One application: fields, decision buttons, status history |
| `/requests/:id/receipt` | Printable submission receipt |

The shell (`src/App.jsx`) is a fixed side navigation plus a content area. English is the
default; the top bar toggles Arabic, which flips `dir` on `<html>` and swaps the strings in
`src/i18n.js`. Styling is one hand-written stylesheet, `src/styles.css`.
