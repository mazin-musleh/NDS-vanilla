import { useMemo } from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';
import { useTickets } from '../queries.js';
import { isOpen } from '../lib.js';

const COLORS = ['#14624a', '#c77d0a', '#2a6fb0', '#a4262c', '#6b5b95'];
const HOUR = 3600e3;

function perHour(tickets) {
    const start = new Date();
    start.setMinutes(0, 0, 0);
    const first = start.getTime() - 23 * HOUR;
    const buckets = Array.from({ length: 24 }, (_, i) => ({
        label: `${String(new Date(first + i * HOUR).getHours()).padStart(2, '0')}:00`,
        count: 0,
    }));
    for (const t of tickets) {
        const i = Math.floor((new Date(t.createdAt).getTime() - first) / HOUR);
        if (i >= 0 && i < 24) buckets[i].count += 1;
    }
    return buckets;
}

function byCategory(tickets) {
    const counts = {};
    for (const t of tickets) if (isOpen(t)) counts[t.category] = (counts[t.category] || 0) + 1;
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

export default function Charts() {
    const { data: tickets = [] } = useTickets();
    const hourly = useMemo(() => perHour(tickets), [tickets]);
    const categories = useMemo(() => byCategory(tickets), [tickets]);

    return (
        <div className="charts">
            <section className="card" aria-labelledby="chart-hourly">
                <h2 id="chart-hourly">Tickets created, last 24 hours</h2>
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={hourly} margin={{ top: 8, right: 12, bottom: 0, left: -16 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e3e7eb" />
                        <XAxis dataKey="label" interval={3} tick={{ fontSize: 12 }} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" name="Tickets" stroke="#14624a" strokeWidth={2} dot={false} isAnimationActive={false} />
                    </LineChart>
                </ResponsiveContainer>
            </section>
            <section className="card" aria-labelledby="chart-category">
                <h2 id="chart-category">Open tickets by category</h2>
                <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                        <Pie data={categories} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2} isAnimationActive={false}>
                            {categories.map((c, i) => (
                                <Cell key={c.name} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="middle" align="right" layout="vertical" />
                    </PieChart>
                </ResponsiveContainer>
            </section>
        </div>
    );
}
