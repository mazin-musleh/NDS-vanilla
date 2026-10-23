import { useTickets, useCrews } from '../queries.js';
import { isOpen, isBreaching, avgResponse } from '../lib.js';

function Kpi({ label, value, tone }) {
    return (
        <div className={`card kpi ${tone || ''}`}>
            <span className="kpi-label">{label}</span>
            <strong className="kpi-value">{value}</strong>
        </div>
    );
}

export default function KpiRow() {
    const { data: tickets } = useTickets();
    const { data: crews } = useCrews();
    const dash = '-';
    const now = Date.now();

    return (
        <section className="kpis" aria-label="Key figures">
            <Kpi label="Open tickets" value={tickets ? tickets.filter(isOpen).length : dash} />
            <Kpi
                label="Breaching SLA"
                value={tickets ? tickets.filter((t) => isBreaching(t, now)).length : dash}
                tone="danger"
            />
            <Kpi label="Crews available" value={crews ? crews.filter((c) => c.status === 'available').length : dash} />
            <Kpi label="Avg response" value={tickets ? `${avgResponse(tickets)} min` : dash} />
        </section>
    );
}
