import { useEffect, useState } from 'react';
import { CrewBadge } from './Badge.jsx';
import { useCrews } from '../queries.js';
import { countdown } from '../lib.js';

function useNow() {
    const [now, setNow] = useState(Date.now());
    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(timer);
    }, []);
    return now;
}

export default function CrewBoard() {
    const { data: crews, isLoading } = useCrews();
    const [view, setView] = useState('grid');
    const now = useNow();

    return (
        <>
            <div className="card-head">
                <h2>Crew board</h2>
                <div className="toggle" role="group" aria-label="Crew layout">
                    {['grid', 'list'].map((v) => (
                        <button
                            key={v}
                            type="button"
                            className={`toggle-btn ${view === v ? 'is-active' : ''}`}
                            aria-pressed={view === v}
                            onClick={() => setView(v)}
                        >
                            {v === 'grid' ? 'Grid' : 'List'}
                        </button>
                    ))}
                </div>
            </div>
            {isLoading && <p className="muted">Loading crews...</p>}
            <ul className={`crew-items crew-${view}`}>
                {crews?.map((c) => {
                    const ended = new Date(c.shiftEndsAt).getTime() <= now;
                    return (
                        <li key={c.id} className="crew-card">
                            <div className="crew-top">
                                <strong>{c.name}</strong>
                                <CrewBadge status={c.status} />
                            </div>
                            <span>Lead: {c.lead}</span>
                            <span>{c.members} members - {c.district}</span>
                            <small className="muted">
                                {ended ? 'Shift ended' : `Shift ends in ${countdown(c.shiftEndsAt, now)}`}
                            </small>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
