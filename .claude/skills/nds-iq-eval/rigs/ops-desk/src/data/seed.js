// Starter data for the demo build. The deployed desk reads the same shapes
// from the work-order system.

export const DISTRICTS = ['Al Olaya', 'Al Malaz', 'Al Naseem', 'Al Yasmin', 'Al Shifa', 'Diriyah'];

export const CATEGORIES = {
    Roads: ['Pothole', 'Damaged sign', 'Faded markings'],
    Lighting: ['Outage', 'Flickering'],
    Water: ['Leak', 'Blocked drain', 'Low pressure'],
    Waste: ['Missed pickup', 'Overflowing bin'],
    Parks: ['Broken equipment', 'Irrigation'],
};

export const PRIORITIES = ['low', 'medium', 'high', 'urgent'];
export const STATUSES = ['new', 'assigned', 'in_progress', 'on_hold', 'resolved', 'closed'];
export const LABELS = ['safety', 'repeat', 'contractor', 'night-work', 'vip', 'hazard'];

export const STREETS = [
    'King Fahd Rd', 'Olaya St', 'Tahlia St', 'Prince Sultan Rd', 'Imam Saud Rd',
    'Wadi Hanifa Rd', 'Diriyah Gate', 'Airport Rd', 'Al Malaz Ave', 'Khurais Rd',
    'Thumama Rd', 'Al Yasmin Loop',
];

const TEMPLATES = {
    'Pothole': 'Pothole on {street}',
    'Damaged sign': 'Damaged road sign at {street}',
    'Faded markings': 'Faded lane markings on {street}',
    'Outage': 'Street light out on {street}',
    'Flickering': 'Flickering light near {street}',
    'Leak': 'Water leak at {street}',
    'Blocked drain': 'Blocked drain on {street}',
    'Low pressure': 'Low water pressure near {street}',
    'Missed pickup': 'Missed pickup on {street}',
    'Overflowing bin': 'Overflowing bin at {street}',
    'Broken equipment': 'Broken playground equipment, {street} park',
    'Irrigation': 'Irrigation fault in {street} park',
};

export const makeTitle = (subtype, street) => TEMPLATES[subtype].replace('{street}', street);

export const SLA_HOURS = { low: 120, medium: 72, high: 24, urgent: 4 };

const HOUR = 3600e3;
const DAY = 24 * HOUR;

// Small seeded generator so every load starts from the same queue.
function mulberry32(seed) {
    return () => {
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const rand = mulberry32(240117);
const pick = (list) => list[Math.floor(rand() * list.length)];
const weighted = (pairs) => {
    let r = rand();
    for (const [value, w] of pairs) {
        if ((r -= w) < 0) return value;
    }
    return pairs[pairs.length - 1][0];
};

const CREW_NAMES = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel'];
const LEADS = [
    'Omar Al-Dosari', 'Faisal Al-Mutairi', 'Sara Al-Otaibi', 'Khalid Al-Shehri',
    'Nora Al-Ghamdi', 'Yousef Al-Zahrani', 'Reem Al-Harbi', 'Majed Al-Qahtani',
];
const CREW_STATUS = ['available', 'en_route', 'on_site', 'available', 'on_site', 'off_shift', 'en_route', 'available'];

const now = Date.now();

export const CREWS = CREW_NAMES.map((name, i) => ({
    id: `C-${i + 1}`,
    name: `Crew ${name}`,
    lead: LEADS[i],
    members: 3 + (i % 4),
    status: CREW_STATUS[i],
    district: DISTRICTS[i % DISTRICTS.length],
    shiftEndsAt: new Date(now + (1 + (i * 37) % 7) * HOUR + i * 4 * 60e3).toISOString(),
}));

function buildTicket(i) {
    const category = pick(Object.keys(CATEGORIES));
    const subtype = pick(CATEGORIES[category]);
    const district = pick(DISTRICTS);
    const age = Math.pow(rand(), 1.8) * 10 * DAY;
    const created = now - age;
    const priority = weighted([['low', 0.25], ['medium', 0.4], ['high', 0.25], ['urgent', 0.1]]);
    const status = age > 6 * DAY
        ? weighted([['resolved', 0.4], ['closed', 0.35], ['in_progress', 0.1], ['on_hold', 0.15]])
        : weighted([['new', 0.18], ['assigned', 0.2], ['in_progress', 0.22], ['on_hold', 0.08], ['resolved', 0.18], ['closed', 0.14]]);
    const local = CREWS.filter((c) => c.district === district);
    const crew = status === 'new' ? null : pick(local.length ? local : CREWS);
    const title = makeTitle(subtype, pick(STREETS));
    const labels = rand() < 0.45 ? [pick(LABELS)] : [];

    const activity = [{ at: new Date(created).toISOString(), text: 'Ticket created by Ahmed Al-Rashid' }];
    if (crew) {
        const at = created + (10 + Math.floor(rand() * 80)) * 60e3;
        activity.push({ at: new Date(at).toISOString(), text: `Assigned to ${crew.name}` });
        if (status !== 'assigned') {
            activity.push({ at: new Date(at + 40 * 60e3).toISOString(), text: 'Status set to In progress' });
        }
        if (status === 'resolved' || status === 'closed') {
            activity.push({ at: new Date(at + 5 * HOUR).toISOString(), text: 'Status set to Resolved' });
        }
        if (status === 'closed') {
            activity.push({ at: new Date(at + 8 * HOUR).toISOString(), text: 'Status set to Closed' });
        }
    }

    return {
        id: `T-24${String(i + 1).padStart(4, '0')}`,
        title,
        description: `Reported by a resident through the call centre. ${subtype} in ${district}, needs a site visit.`,
        category,
        subtype,
        district,
        priority,
        status,
        crewId: crew ? crew.id : null,
        createdAt: new Date(created).toISOString(),
        dueAt: new Date(created + SLA_HOURS[priority] * HOUR).toISOString(),
        labels,
        activity,
    };
}

export const TICKETS = Array.from({ length: 60 }, (_, i) => buildTicket(i));
