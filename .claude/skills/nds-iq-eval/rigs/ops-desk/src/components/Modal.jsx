import { useEffect, useRef } from 'react';

export default function Modal({ title, onClose, children, wide }) {
    const box = useRef(null);
    const close = useRef(onClose);
    close.current = onClose;

    useEffect(() => {
        const first = box.current.querySelector('[data-autofocus]') || box.current.querySelector('input, textarea, button');
        first?.focus();
        const onKey = (e) => {
            if (e.key === 'Escape' && !e.defaultPrevented) close.current();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    return (
        <div className="overlay modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
            <div className={`modal ${wide ? 'modal-wide' : ''}`} role="dialog" aria-modal="true" aria-label={title} ref={box}>
                <div className="modal-head">
                    <h2>{title}</h2>
                    <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
}

export function ConfirmModal({ title, message, confirmLabel, busy, onConfirm, onCancel }) {
    return (
        <Modal title={title} onClose={onCancel}>
            <p>{message}</p>
            <div className="modal-actions">
                <button type="button" className="btn" onClick={onCancel}>
                    Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={busy}>
                    {busy ? 'Working...' : confirmLabel}
                </button>
            </div>
        </Modal>
    );
}
