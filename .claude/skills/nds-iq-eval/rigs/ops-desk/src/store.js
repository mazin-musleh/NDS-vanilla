import { create } from 'zustand';
import { emptyFilters, readUrl } from './url.js';

const VIEWS_KEY = 'opsdesk.views';

function loadViews() {
    try {
        return JSON.parse(localStorage.getItem(VIEWS_KEY)) || [];
    } catch {
        return [];
    }
}

const saveViews = (views) => localStorage.setItem(VIEWS_KEY, JSON.stringify(views));

const initial = readUrl();

export const useStore = create((set) => ({
    filters: initial.filters,
    selectedIds: [],
    selectedTicketId: initial.ticketId,
    live: true,
    events: [],
    unread: 0,
    views: loadViews(),

    setFilter: (key, value) => set((s) => ({ filters: { ...s.filters, [key]: value } })),
    setFilters: (filters) => set({ filters: { ...emptyFilters(), ...filters } }),
    resetFilters: () => set({ filters: emptyFilters() }),

    setSelected: (ids) => set({ selectedIds: ids }),
    clearSelected: () => set({ selectedIds: [] }),

    openTicket: (id) => set({ selectedTicketId: id }),
    closeTicket: () => set({ selectedTicketId: null }),

    setLive: (live) => set({ live }),
    pushEvent: (event) => set((s) => ({ events: [event, ...s.events].slice(0, 10), unread: s.unread + 1 })),
    markAllRead: () => set({ unread: 0 }),

    saveView: (name) =>
        set((s) => {
            const views = [...s.views.filter((v) => v.name !== name), { name, filters: s.filters }];
            saveViews(views);
            return { views };
        }),
    deleteView: (name) =>
        set((s) => {
            const views = s.views.filter((v) => v.name !== name);
            saveViews(views);
            return { views };
        }),
}));
