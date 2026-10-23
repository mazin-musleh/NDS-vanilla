import { useEffect, useRef, useState } from 'react';
import { useStore } from '../store.js';
import { SUPERVISOR, fmtDateTime } from '../lib.js';

function Bell() {
    const events = useStore((s) => s.events);
    const unread = useStore((s) => s.unread);
    const markAllRead = useStore((s) => s.markAllRead);
    const openTicket = useStore((s) => s.openTicket);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return;
        const away = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', away);
        return () => document.removeEventListener('mousedown', away);
    }, [open]);

    return (
        <div className="bell" ref={ref}>
            <button
                type="button"
                className="icon-btn"
                aria-label={`Notifications, ${unread} unread`}
                aria-expanded={open}
                onClick={() => setOpen(!open)}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M6 9a6 6 0 1 1 12 0c0 6 2 7 2 8H4c0-1 2-2 2-8z" />
                    <path d="M10 21h4" />
                </svg>
                {unread > 0 && <span className="bell-count">{unread}</span>}
            </button>
            {open && (
                <div className="bell-menu" role="region" aria-label="Recent events">
                    <div className="bell-head">
                        <strong>Recent events</strong>
                        <button type="button" className="link-btn" onClick={markAllRead} disabled={!unread}>
                            Mark all read
                        </button>
                    </div>
                    {events.length === 0 && <p className="muted pad">Nothing yet. Events appear as the feed reports in.</p>}
                    <ul className="bell-list">
                        {events.map((e) => (
                            <li key={e.id}>
                                <button
                                    type="button"
                                    disabled={!e.ticketId}
                                    onClick={() => {
                                        openTicket(e.ticketId);
                                        setOpen(false);
                                    }}
                                >
                                    <span>{e.text}</span>
                                    <small>{fmtDateTime(e.at)}</small>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default function TopBar() {
    const live = useStore((s) => s.live);
    const setLive = useStore((s) => s.setLive);

    return (
        <header className="topbar">
            <div className="brand">
                <span className="brand-mark">OD</span>
                <h1>Ops Desk</h1>
            </div>
            <div className="topbar-right">
                <button
                    type="button"
                    className={`live-toggle ${live ? 'is-live' : ''}`}
                    aria-pressed={live}
                    onClick={() => setLive(!live)}
                >
                    <span className="live-dot" />
                    {live ? 'Live' : 'Paused'}
                    <span className="live-action">{live ? 'Pause' : 'Resume'}</span>
                </button>
                <Bell />
                <span className="user">{SUPERVISOR}</span>
            </div>
        </header>
    );
}
