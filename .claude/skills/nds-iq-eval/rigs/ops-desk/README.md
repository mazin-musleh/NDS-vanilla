# Ops Desk

Live maintenance dispatch dashboard for a city municipality. Supervisors in the operations
room use it to watch the ticket queue, send crews to jobs, keep an eye on SLA breaches and
open new tickets as calls come in.

Single-page app: React, one route (`/`), no backend. The tickets and crews live in an
in-memory fake API (`src/api.js`) and a simulated live feed (`src/feed.js`) adds tickets and
status changes every few seconds, so the dashboard moves on its own. The Live / Paused toggle
in the top bar stops and restarts the feed. Changes are lost on reload; the deployed desk
reads the same shapes from the work-order service.

## Run it

```
npm install
npm run dev
```

Opens on http://localhost:3008.

## Layout

| Area | What it does |
|---|---|
| Top bar | Live / Paused toggle, notifications bell (last 10 events), signed-in supervisor |
| KPI row | Open tickets, breaching SLA, crews available, average response |
| Ticket queue | Sortable, paged table with filters, saved views, bulk assign / close, inline status change |
| Ticket drawer | Details, activity and files for one ticket; assign, reschedule, close. Deep link: `?ticket=T-240012` |
| Crew board | One card per crew with a shift countdown; grid or list view |
| Charts | Tickets created per hour (last 24 h) and open tickets by category |
| New ticket | Modal form with server-side validation messages |

Queue filters are mirrored into the address bar (`?status=new,assigned&priority=high&district=Al%20Olaya&from=2026-10-01&to=2026-10-10&q=pothole`),
so a filtered view can be bookmarked or shared. Saved views are kept in `localStorage`.

Built with React 19, Vite, Zustand, TanStack Query and Table, react-select, react-datepicker,
Recharts and react-hot-toast. Styling is one hand-written stylesheet, `src/styles.css`.
