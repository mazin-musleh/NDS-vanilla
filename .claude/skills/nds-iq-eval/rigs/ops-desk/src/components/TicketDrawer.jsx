import { useState } from 'react';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import Drawer from './Drawer.jsx';
import Tabs from './Tabs.jsx';
import Select from './Select.jsx';
import { ConfirmModal } from './Modal.jsx';
import { PriorityBadge, StatusBadge } from './Badge.jsx';
import { useStore } from '../store.js';
import { useTicket, useCrews, useUpdateTicket } from '../queries.js';
import { fmtDateTime, filesFor, relativeDue, CREW_STATUS_LABELS } from '../lib.js';

const TABS = [
    { id: 'details', label: 'Details' },
    { id: 'activity', label: 'Activity' },
    { id: 'files', label: 'Files' },
];

function Reschedule({ ticket, onSave, busy }) {
    const [due, setDue] = useState(new Date(ticket.dueAt));
    return (
        <div className="field">
            <label htmlFor="reschedule">Reschedule</label>
            <div className="inline">
                <DatePicker
                    id="reschedule"
                    selected={due}
                    onChange={setDue}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="dd/MM/yyyy HH:mm"
                    portalId="popups"
                />
                <button
                    type="button"
                    className="btn"
                    disabled={busy || due.toISOString() === ticket.dueAt}
                    onClick={() => onSave({ dueAt: due.toISOString() }, 'Ticket rescheduled')}
                >
                    Reschedule
                </button>
            </div>
        </div>
    );
}

function Details({ ticket }) {
    const { data: crews = [] } = useCrews();
    const update = useUpdateTicket();
    const [confirming, setConfirming] = useState(false);

    const crewOptions = crews.map((c) => ({ value: c.id, label: `${c.name} (${CREW_STATUS_LABELS[c.status]})`, name: c.name }));
    const crew = crewOptions.find((o) => o.value === ticket.crewId) || null;

    const save = (patch, done, after) =>
        update.mutate(
            { id: ticket.id, patch },
            {
                onSuccess: () => {
                    toast.success(done);
                    after?.();
                },
                onError: (e) => toast.error(e.message),
            },
        );

    return (
        <>
            <dl className="facts">
                <dt>Category</dt>
                <dd>{ticket.category} / {ticket.subtype}</dd>
                <dt>District</dt>
                <dd>{ticket.district}</dd>
                <dt>Crew</dt>
                <dd>{crew ? crew.name : 'Unassigned'}</dd>
                <dt>Created</dt>
                <dd>{fmtDateTime(ticket.createdAt)}</dd>
                <dt>Due</dt>
                <dd>{fmtDateTime(ticket.dueAt)} ({relativeDue(ticket.dueAt)})</dd>
                <dt>Labels</dt>
                <dd>{ticket.labels.length ? ticket.labels.join(', ') : 'None'}</dd>
                <dt>Description</dt>
                <dd>{ticket.description || 'No description'}</dd>
            </dl>
            <div className="field">
                <label htmlFor="assign-crew">Assign crew</label>
                <Select
                    inputId="assign-crew"
                    options={crewOptions}
                    value={crew}
                    placeholder="Choose a crew"
                    isDisabled={update.isPending}
                    onChange={(o) => save({ crewId: o.value }, `Assigned to ${o.name}`)}
                />
            </div>
            <Reschedule key={ticket.dueAt} ticket={ticket} onSave={save} busy={update.isPending} />
            <div className="drawer-actions">
                <button
                    type="button"
                    className="btn btn-danger"
                    disabled={ticket.status === 'closed'}
                    onClick={() => setConfirming(true)}
                >
                    Close ticket
                </button>
            </div>
            {confirming && (
                <ConfirmModal
                    title="Close ticket"
                    message={`Close ${ticket.id}: ${ticket.title}?`}
                    confirmLabel="Close ticket"
                    busy={update.isPending}
                    onConfirm={() => save({ status: 'closed' }, `${ticket.id} closed`, () => setConfirming(false))}
                    onCancel={() => setConfirming(false)}
                />
            )}
        </>
    );
}

function Activity({ ticket }) {
    return (
        <ol className="timeline">
            {[...ticket.activity].reverse().map((a, i) => (
                <li key={`${a.at}-${i}`}>
                    <span>{a.text}</span>
                    <small>{fmtDateTime(a.at)}</small>
                </li>
            ))}
        </ol>
    );
}

function Files({ ticket }) {
    const files = filesFor(ticket);
    if (!files.length) return <p className="muted">No files</p>;
    return (
        <ul className="files">
            {files.map(([name, size]) => (
                <li key={name}>
                    <span>{name}</span>
                    <small>{size}</small>
                </li>
            ))}
        </ul>
    );
}

export default function TicketDrawer({ id }) {
    const closeTicket = useStore((s) => s.closeTicket);
    const { data: ticket, isLoading, isError, error } = useTicket(id);
    const [tab, setTab] = useState('details');

    return (
        <Drawer label={`Ticket ${id}`} onClose={closeTicket}>
            {isLoading && <p className="muted pad">Loading ticket...</p>}
            {isError && <p className="error pad" role="alert">{error.message}</p>}
            {ticket && (
                <>
                    <header className="drawer-head">
                        <span className="muted">{ticket.id}</span>
                        <h2>{ticket.title}</h2>
                        <div className="inline">
                            <PriorityBadge priority={ticket.priority} />
                            <StatusBadge status={ticket.status} />
                        </div>
                    </header>
                    <Tabs tabs={TABS} value={tab} onChange={setTab}>
                        {tab === 'details' && <Details ticket={ticket} />}
                        {tab === 'activity' && <Activity ticket={ticket} />}
                        {tab === 'files' && <Files ticket={ticket} />}
                    </Tabs>
                </>
            )}
        </Drawer>
    );
}
