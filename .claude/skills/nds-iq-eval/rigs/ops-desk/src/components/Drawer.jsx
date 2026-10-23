import { useEffect, useRef } from 'react';

export default function Drawer({ label, onClose, children }) {
    const panel = useRef(null);
    const close = useRef(onClose);
    close.current = onClose;

    useEffect(() => {
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        panel.current.focus();
        const onKey = (e) => {
            // A confirm modal or an open select menu takes Escape first.
            if (e.key !== 'Escape' || e.defaultPrevented || document.querySelector('.modal')) return;
            close.current();
        };
        document.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = previous;
            document.removeEventListener('keydown', onKey);
        };
    }, []);

    return (
        <div className="drawer-root">
            <div className="overlay" onClick={onClose} />
            <aside className="drawer" role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} ref={panel}>
                <button type="button" className="icon-btn drawer-close" aria-label="Close" onClick={onClose}>
                    &times;
                </button>
                {children}
            </aside>
        </div>
    );
}
