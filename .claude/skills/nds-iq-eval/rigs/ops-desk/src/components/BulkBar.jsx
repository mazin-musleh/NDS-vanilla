import { useState } from 'react';
import toast from 'react-hot-toast';
import Select from './Select.jsx';
import { ConfirmModal } from './Modal.jsx';
import { useStore } from '../store.js';
import { useCrews, useBulkUpdate } from '../queries.js';
import { CREW_STATUS_LABELS } from '../lib.js';

export default function BulkBar() {
    const ids = useStore((s) => s.selectedIds);
    const clearSelected = useStore((s) => s.clearSelected);
    const { data: crews = [] } = useCrews();
    const bulk = useBulkUpdate();
    const [confirming, setConfirming] = useState(false);

    if (!ids.length) return null;

    const options = crews.map((c) => ({ value: c.id, label: `${c.name} (${CREW_STATUS_LABELS[c.status]})` }));
    const count = `${ids.length} ticket${ids.length === 1 ? '' : 's'}`;

    const assign = (option) =>
        bulk.mutate(
            { ids, patch: { crewId: option.value } },
            {
                onSuccess: () => toast.success(`${count} assigned to ${option.label.split(' (')[0]}`),
                onError: (e) => toast.error(e.message),
            },
        );

    const close = () =>
        bulk.mutate(
            { ids, patch: { status: 'closed' } },
            {
                onSuccess: () => {
                    toast.success(`${count} closed`);
                    setConfirming(false);
                    clearSelected();
                },
                onError: (e) => toast.error(e.message),
            },
        );

    return (
        <div className="bulkbar" role="region" aria-label="Bulk actions">
            <strong>{ids.length} selected</strong>
            <div className="bulk-assign">
                <Select
                    aria-label="Assign crew to selected tickets"
                    placeholder="Assign crew"
                    options={options}
                    value={null}
                    onChange={assign}
                    isDisabled={bulk.isPending}
                />
            </div>
            <button type="button" className="btn btn-danger" onClick={() => setConfirming(true)}>
                Close tickets
            </button>
            <button type="button" className="link-btn" onClick={clearSelected}>
                Clear selection
            </button>
            {confirming && (
                <ConfirmModal
                    title="Close tickets"
                    message={`Close ${count}? This cannot be undone from the queue.`}
                    confirmLabel="Close tickets"
                    busy={bulk.isPending}
                    onConfirm={close}
                    onCancel={() => setConfirming(false)}
                />
            )}
        </div>
    );
}
