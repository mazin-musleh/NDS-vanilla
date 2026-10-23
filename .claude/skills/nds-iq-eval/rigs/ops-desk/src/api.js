// In-memory stand-in for the dispatch API. A real deployment talks to the
// work-order service; the shapes are the same.
import { TICKETS, CREWS, SLA_HOURS } from './data/seed.js';
import { STATUS_LABELS, SUPERVISOR, fmtDateTime, isOpen } from './lib.js';

export const db = {
    tickets: TICKETS.map((t) => ({ ...t })),
    crews: CREWS.map((c) => ({ ...c })),
    seq: 100,
};

const wait = () => new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 600));

function describe(patch) {
    const notes = [];
    if (patch.status) notes.push(`Status set to ${STATUS_LABELS[patch.status]}`);
    if (patch.crewId) notes.push(`Assigned to ${db.crews.find((c) => c.id === patch.crewId)?.name}`);
    if (patch.dueAt) notes.push(`Rescheduled to ${fmtDateTime(patch.dueAt)}`);
    return notes.map((text) => ({ at: new Date().toISOString(), text: `${text} by ${SUPERVISOR}` }));
}

function apply(id, patch) {
    const i = db.tickets.findIndex((t) => t.id === id);
    if (i < 0) throw new Error(`Ticket ${id} not found`);
    const current = db.tickets[i];
    const changes = { ...patch };
    if (patch.crewId && current.status === 'new' && !patch.status) changes.status = 'assigned';
    const next = { ...current, ...changes, activity: [...current.activity, ...describe(changes)] };
    db.tickets[i] = next;
    return next;
}

export async function listTickets() {
    await wait();
    return [...db.tickets];
}

export async function getTicket(id) {
    await wait();
    const ticket = db.tickets.find((t) => t.id === id);
    if (!ticket) throw new Error(`Ticket ${id} not found`);
    return ticket;
}

export async function listCrews() {
    await wait();
    return [...db.crews];
}

let saves = 0;

export async function updateTicket(id, patch) {
    await wait();
    saves += 1;
    if (saves % 5 === 0) throw new Error('Save failed, try again');
    return apply(id, patch);
}

export async function bulkUpdate(ids, patch) {
    await wait();
    return ids.map((id) => apply(id, patch));
}

export async function createTicket(data) {
    await wait();
    const title = (data.title || '').trim();
    const errors = {};
    if (title.length < 8) errors.title = 'Title must be at least 8 characters';
    if (!data.category) errors.category = 'Choose a category';
    if (!data.subtype) errors.subtype = 'Choose a subtype';
    if (!data.district) errors.district = 'Choose a district';
    if (!data.priority) errors.priority = 'Choose a priority';
    if (!errors.title && data.district) {
        const dup = db.tickets.some(
            (t) => isOpen(t) && t.district === data.district && t.title.toLowerCase() === title.toLowerCase(),
        );
        if (dup) errors.title = 'A ticket with this title is already open in this district';
    }
    if (Object.keys(errors).length) throw { status: 422, errors };

    const now = Date.now();
    db.seq += 1;
    const ticket = {
        id: `T-24${String(db.seq).padStart(4, '0')}`,
        title,
        description: data.description || '',
        category: data.category,
        subtype: data.subtype,
        district: data.district,
        priority: data.priority,
        status: 'new',
        crewId: null,
        createdAt: new Date(now).toISOString(),
        dueAt: data.dueAt || new Date(now + SLA_HOURS[data.priority] * 3600e3).toISOString(),
        labels: data.labels || [],
        activity: [{ at: new Date(now).toISOString(), text: `Ticket created by ${SUPERVISOR}` }],
    };
    db.tickets.unshift(ticket);
    return ticket;
}
