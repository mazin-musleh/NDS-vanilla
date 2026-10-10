// In-memory store. A real deployment reads these from the grants database;
// the console keeps a copy so the demo runs with no backend.
const SEED = [
    { id: 'GR-2026-0141', applicant: 'Tuwaiq Heritage Society', scheme: 'Culture', amount: 180000, submitted: '2026-01-12', status: 'approved' },
    { id: 'GR-2026-0142', applicant: 'Najd Youth Council', scheme: 'Community', amount: 95000, submitted: '2026-01-19', status: 'pending' },
    { id: 'GR-2026-0143', applicant: 'Red Sea Marine Trust', scheme: 'Environment', amount: 420000, submitted: '2026-02-02', status: 'review' },
    { id: 'GR-2026-0144', applicant: 'Asir Craft Cooperative', scheme: 'Culture', amount: 65000, submitted: '2026-02-11', status: 'approved' },
    { id: 'GR-2026-0145', applicant: 'Eastern Coders Guild', scheme: 'Innovation', amount: 250000, submitted: '2026-02-23', status: 'pending' },
    { id: 'GR-2026-0146', applicant: 'Madinah Literacy Circle', scheme: 'Education', amount: 130000, submitted: '2026-03-04', status: 'rejected' },
    { id: 'GR-2026-0147', applicant: 'Hail Sports Academy', scheme: 'Community', amount: 88000, submitted: '2026-03-15', status: 'pending' },
    { id: 'GR-2026-0148', applicant: 'Jazan Farmers Union', scheme: 'Environment', amount: 310000, submitted: '2026-03-27', status: 'review' },
    { id: 'GR-2026-0149', applicant: 'Qassim Robotics Lab', scheme: 'Innovation', amount: 275000, submitted: '2026-04-08', status: 'approved' },
    { id: 'GR-2026-0150', applicant: 'Tabuk Desert Rangers', scheme: 'Environment', amount: 145000, submitted: '2026-04-21', status: 'pending' },
    { id: 'GR-2026-0151', applicant: 'Riyadh Braille Press', scheme: 'Education', amount: 72000, submitted: '2026-05-02', status: 'approved' },
    { id: 'GR-2026-0152', applicant: 'Abha Film Collective', scheme: 'Culture', amount: 210000, submitted: '2026-05-14', status: 'review' },
];

const HISTORY = {
    approved: ['Submitted', 'Completeness check passed', 'Committee review', 'Approved'],
    rejected: ['Submitted', 'Completeness check passed', 'Committee review', 'Rejected'],
    review: ['Submitted', 'Completeness check passed', 'Committee review'],
    pending: ['Submitted'],
};

let requests = [...SEED];
const listeners = new Set();
const emit = () => listeners.forEach((fn) => fn(requests));

export const SCHEMES = ['Culture', 'Community', 'Environment', 'Education', 'Innovation'];

export const getAll = () => requests;
export const getOne = (id) => requests.find((r) => r.id === id) || null;
export const historyFor = (status) => HISTORY[status] || HISTORY.pending;

export function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
}

export function add(entry) {
    const seq = 152 + requests.filter((r) => r.id.startsWith('GR-2026')).length - SEED.length + 1;
    const record = {
        id: `GR-2026-0${seq}`,
        submitted: new Date().toISOString().slice(0, 10),
        status: 'pending',
        ...entry,
    };
    requests = [record, ...requests];
    emit();
    return record;
}

export function setStatus(id, status) {
    requests = requests.map((r) => (r.id === id ? { ...r, status } : r));
    emit();
}
