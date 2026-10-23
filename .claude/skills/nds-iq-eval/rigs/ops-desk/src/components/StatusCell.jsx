import { startTransition, useOptimistic } from 'react';
import toast from 'react-hot-toast';
import Select from './Select.jsx';
import { useUpdateTicket } from '../queries.js';
import { STATUS_OPTIONS, STATUS_LABELS } from '../lib.js';

export default function StatusCell({ ticket }) {
    const [status, setOptimisticStatus] = useOptimistic(ticket.status);
    const update = useUpdateTicket();

    const undo = async (previous) => {
        try {
            await update.mutateAsync({ id: ticket.id, patch: { status: previous } });
            toast.success(`${ticket.id} back to ${STATUS_LABELS[previous]}`);
        } catch (e) {
            toast.error(`${ticket.id}: ${e.message}`);
        }
    };

    const change = (option) => {
        const previous = ticket.status;
        if (option.value === status) return;
        startTransition(async () => {
            setOptimisticStatus(option.value);
            try {
                await update.mutateAsync({ id: ticket.id, patch: { status: option.value } });
                toast.success(
                    (t) => (
                        <span>
                            {ticket.id} set to {option.label}{' '}
                            <button
                                type="button"
                                className="link-btn"
                                onClick={() => {
                                    toast.dismiss(t.id);
                                    undo(previous);
                                }}
                            >
                                Undo
                            </button>
                        </span>
                    ),
                    { duration: 6000 },
                );
            } catch (e) {
                toast.error(`${ticket.id}: ${e.message}`);
            }
        });
    };

    return (
        <Select
            className="status-select"
            aria-label={`Status of ${ticket.id}`}
            isSearchable={false}
            options={STATUS_OPTIONS}
            value={STATUS_OPTIONS.find((o) => o.value === status)}
            onChange={change}
        />
    );
}
