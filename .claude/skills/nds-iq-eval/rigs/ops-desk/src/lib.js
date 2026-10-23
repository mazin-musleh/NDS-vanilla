import { PRIORITIES, STATUSES, DISTRICTS } from './data/seed.js';

export const SUPERVISOR = 'Ahmed Al-Rashid';

export const STATUS_LABELS = {
    new: 'New',
    assigned: 'Assigned',
    in_progress: 'In progress',
    on_hold: 'On hold',
    resolved: 'Resolved',
    closed: 'Closed',
};
export const PRIORITY_LABELS = { low: 'Low', medium: 'Medium', high: 'High', urgent: 'Urgent' };
export const CREW_STATUS_LABELS = {
    available: 'Available',
    en_route: 'En route',
    on_site: 'On site',
    off_shift: 'Off shift',
};

export const STATUS_OPTIONS = STATUSES.map((value) => ({ value, label: STATUS_LABELS[value] }));
export const PRIORITY_OPTIONS = PRIORITIES.map((value) => ({ value, label: PRIORITY_LABELS[value] }));
export const DISTRICT_OPTIONS = DISTRICTS.map((value) => ({ value, label: value }));

export const PRIORITY_RANK = { low: 0, medium: 1, high: 2, urgent: 3 };
export const STATUS_RANK = Object.fromEntries(STATUSES.map((s, i) => [s, i]));

export const isOpen = (t) => t.status !== 'resolved' && t.status !== 'closed';
export const isBreaching = (t, now = Date.now()) => isOpen(t) && new Date(t.dueAt).getTime() < now;

function span(mins) {
    if (mins >= 1440) return `${Math.floor(mins / 1440)}d ${Math.floor((mins % 1440) / 60)}h`;
    if (mins >= 60) return `${Math.floor(mins / 60)}h ${mins % 60}m`;
    return `${mins}m`;
}

export function relativeDue(iso, now = Date.now()) {
    const mins = Math.round((new Date(iso).getTime() - now) / 60000);
    return mins < 0 ? `${span(-mins)} overdue` : `in ${span(mins)}`;
}

export function countdown(iso, now = Date.now()) {
    const secs = Math.max(0, Math.floor((new Date(iso).getTime() - now) / 1000));
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    return h ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m ${String(secs % 60).padStart(2, '0')}s`;
}

export const fmtDateTime = (iso) =>
    new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });

// Day strings (YYYY-MM-DD, local) are what the URL and saved views carry.
export const toDay = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const fromDay = (s) => {
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d);
};

export function applyFilters(tickets, f) {
    const q = f.q.trim().toLowerCase();
    const from = f.from ? fromDay(f.from).getTime() : null;
    const to = f.to ? fromDay(f.to).getTime() + 24 * 3600e3 : null;
    return tickets.filter((t) => {
        if (f.status.length && !f.status.includes(t.status)) return false;
        if (f.priority && t.priority !== f.priority) return false;
        if (f.district.length && !f.district.includes(t.district)) return false;
        const created = new Date(t.createdAt).getTime();
        if (from !== null && created < from) return false;
        if (to !== null && created >= to) return false;
        if (q) {
            const hay = [t.id, t.title, t.category, t.subtype, t.district, ...t.labels].join(' ').toLowerCase();
            if (!hay.includes(q)) return false;
        }
        return true;
    });
}

// Average minutes between a ticket being raised and its first crew assignment.
export function avgResponse(tickets) {
    const times = [];
    for (const t of tickets) {
        const first = t.activity.find((a) => a.text.startsWith('Assigned to'));
        if (first) times.push((new Date(first.at) - new Date(t.createdAt)) / 60000);
    }
    return times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;
}

const FILES = [
    ['site-photo.jpg', '1.8 MB'],
    ['work-order.pdf', '214 KB'],
    ['inspection-report.pdf', '640 KB'],
];

export function filesFor(ticket) {
    const n = parseInt(ticket.id.slice(-3), 10) % 4;
    return FILES.slice(0, n);
}
