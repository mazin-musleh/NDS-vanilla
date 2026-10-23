import { PRIORITIES, STATUSES, DISTRICTS } from './data/seed.js';

export const emptyFilters = () => ({ status: [], priority: '', district: [], from: '', to: '', q: '' });

const DAY = /^\d{4}-\d{2}-\d{2}$/;
const list = (value, allowed) => (value ? value.split(',').filter((v) => allowed.includes(v)) : []);

export function readUrl(search = window.location.search) {
    const p = new URLSearchParams(search);
    const priority = p.get('priority') || '';
    const from = p.get('from') || '';
    const to = p.get('to') || '';
    return {
        filters: {
            status: list(p.get('status'), STATUSES),
            priority: PRIORITIES.includes(priority) ? priority : '',
            district: list(p.get('district'), DISTRICTS),
            from: DAY.test(from) ? from : '',
            to: DAY.test(to) ? to : '',
            q: p.get('q') || '',
        },
        ticketId: p.get('ticket') || null,
    };
}

export function toQuery(filters, ticketId) {
    const parts = [];
    if (filters.status.length) parts.push(`status=${filters.status.map(encodeURIComponent).join(',')}`);
    if (filters.priority) parts.push(`priority=${filters.priority}`);
    if (filters.district.length) parts.push(`district=${filters.district.map(encodeURIComponent).join(',')}`);
    if (filters.from) parts.push(`from=${filters.from}`);
    if (filters.to) parts.push(`to=${filters.to}`);
    if (filters.q) parts.push(`q=${encodeURIComponent(filters.q)}`);
    if (ticketId) parts.push(`ticket=${encodeURIComponent(ticketId)}`);
    return parts.join('&');
}

// Mirrors filters and the open drawer into the address bar without adding history entries.
export function startUrlSync(store) {
    return store.subscribe((s, prev) => {
        if (s.filters === prev.filters && s.selectedTicketId === prev.selectedTicketId) return;
        const qs = toQuery(s.filters, s.selectedTicketId);
        window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
    });
}
