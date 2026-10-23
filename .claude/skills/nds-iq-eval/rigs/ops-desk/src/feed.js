// Simulated live feed. Stands in for the dispatch socket: one event every
// three seconds, written to the same in-memory data the API serves.
import toast from 'react-hot-toast';
import { db } from './api.js';
import { queryClient } from './queryClient.js';
import { useStore } from './store.js';
import { CATEGORIES, DISTRICTS, STREETS, SLA_HOURS, makeTitle } from './data/seed.js';
import { STATUS_LABELS, CREW_STATUS_LABELS } from './lib.js';

const pick = (list) => list[Math.floor(Math.random() * list.length)];

let timer = null;
let seq = 9000;

// Pushes the current data into whatever the UI already has cached.
function sync(touchedId) {
    queryClient.setQueryData(['tickets'], (old) => old && [...db.tickets]);
    queryClient.setQueryData(['crews'], (old) => old && [...db.crews]);
    if (touchedId && queryClient.getQueryData(['ticket', touchedId])) {
        queryClient.setQueryData(['ticket', touchedId], db.tickets.find((t) => t.id === touchedId));
    }
}

function notify(text, ticketId = null) {
    useStore.getState().pushEvent({ id: `${Date.now()}-${Math.random()}`, at: new Date().toISOString(), text, ticketId });
}

function newTicket() {
    const category = pick(Object.keys(CATEGORIES));
    const subtype = pick(CATEGORIES[category]);
    const district = pick(DISTRICTS);
    const priority = Math.random() < 0.25 ? 'urgent' : pick(['low', 'medium', 'high']);
    const now = Date.now();
    seq += 1;
    const ticket = {
        id: `T-24${seq}`,
        title: makeTitle(subtype, pick(STREETS)),
        description: `Reported by a field patrol. ${subtype} in ${district}.`,
        category,
        subtype,
        district,
        priority,
        status: 'new',
        crewId: null,
        createdAt: new Date(now).toISOString(),
        dueAt: new Date(now + SLA_HOURS[priority] * 3600e3).toISOString(),
        labels: [],
        activity: [{ at: new Date(now).toISOString(), text: 'Ticket created from field report' }],
    };
    db.tickets.unshift(ticket);
    sync();
    notify(`New ticket ${ticket.id}: ${ticket.title}`, ticket.id);
    if (priority === 'urgent') toast.error(`Urgent: ${ticket.title} in ${ticket.district}`, { duration: 6000 });
}

const NEXT_STATUS = { assigned: 'in_progress', in_progress: 'resolved', on_hold: 'in_progress' };

function ticketProgress() {
    const candidates = db.tickets.filter((t) => t.crewId && NEXT_STATUS[t.status]);
    if (!candidates.length) return newTicket();
    const current = pick(candidates);
    const crew = db.crews.find((c) => c.id === current.crewId);
    const status = NEXT_STATUS[current.status];
    const text = `${crew.name} set status to ${STATUS_LABELS[status]}`;
    const i = db.tickets.indexOf(current);
    db.tickets[i] = { ...current, status, activity: [...current.activity, { at: new Date().toISOString(), text }] };
    sync(current.id);
    notify(`${current.id}: ${text}`, current.id);
}

function crewChange() {
    const crew = pick(db.crews);
    const status = pick(['available', 'en_route', 'on_site', 'off_shift'].filter((s) => s !== crew.status));
    db.crews[db.crews.indexOf(crew)] = { ...crew, status };
    sync();
    notify(`${crew.name} is now ${CREW_STATUS_LABELS[status].toLowerCase()}`);
}

function tick() {
    const r = Math.random();
    if (r < 0.35) newTicket();
    else if (r < 0.8) ticketProgress();
    else crewChange();
}

export function start() {
    if (!timer) timer = setInterval(tick, 3000);
}

export function stop() {
    clearInterval(timer);
    timer = null;
}
