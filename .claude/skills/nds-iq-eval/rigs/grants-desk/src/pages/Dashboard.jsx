import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAll, subscribe } from '../data.js';
import { useLang } from '../i18n.js';

export default function Dashboard() {
    const { t, status, money } = useLang();
    const [rows, setRows] = useState(getAll);
    const [q, setQ] = useState('');
    const [sort, setSort] = useState({ key: 'submitted', dir: 'desc' });

    useEffect(() => subscribe(setRows), []);

    const stats = useMemo(() => ({
        total: rows.length,
        pending: rows.filter((r) => r.status === 'pending').length,
        approved: rows.filter((r) => r.status === 'approved').length,
        value: rows.filter((r) => r.status === 'approved').reduce((sum, r) => sum + r.amount, 0),
    }), [rows]);

    const visible = useMemo(() => {
        const needle = q.trim().toLowerCase();
        const found = needle
            ? rows.filter((r) => r.id.toLowerCase().includes(needle) || r.applicant.toLowerCase().includes(needle))
            : rows;
        const { key, dir } = sort;
        return [...found].sort((a, b) => {
            const x = a[key], y = b[key];
            const cmp = typeof x === 'number' ? x - y : String(x).localeCompare(String(y));
            return dir === 'asc' ? cmp : -cmp;
        });
    }, [rows, q, sort]);

    const sortBy = (key) => setSort((s) => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }));
    const arrow = (key) => (sort.key === key ? (sort.dir === 'asc' ? ' ▲' : ' ▼') : '');

    return (
        <>
            <div className="page-head">
                <div>
                    <h1>{t('dashboardTitle')}</h1>
                    <p className="lead">{t('dashboardLead')}</p>
                </div>
                <Link className="btn primary" to="/requests/new">{t('navNew')}</Link>
            </div>

            <div className="stats">
                <div className="stat"><span>{t('statTotal')}</span><strong>{stats.total}</strong></div>
                <div className="stat"><span>{t('statPending')}</span><strong>{stats.pending}</strong></div>
                <div className="stat"><span>{t('statApproved')}</span><strong>{stats.approved}</strong></div>
                <div className="stat"><span>{t('statValue')}</span><strong>{money(stats.value)}</strong></div>
            </div>

            <div className="panel">
                <div className="panel-head">
                    <input
                        type="search"
                        className="field"
                        placeholder={t('search')}
                        aria-label={t('search')}
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                    />
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th><button type="button" onClick={() => sortBy('id')}>{t('colRef')}{arrow('id')}</button></th>
                            <th><button type="button" onClick={() => sortBy('applicant')}>{t('colApplicant')}{arrow('applicant')}</button></th>
                            <th>{t('colScheme')}</th>
                            <th><button type="button" onClick={() => sortBy('amount')}>{t('colAmount')}{arrow('amount')}</button></th>
                            <th><button type="button" onClick={() => sortBy('submitted')}>{t('colSubmitted')}{arrow('submitted')}</button></th>
                            <th>{t('colStatus')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visible.map((r) => (
                            <tr key={r.id}>
                                <td><Link to={`/requests/${r.id}`}>{r.id}</Link></td>
                                <td>{r.applicant}</td>
                                <td>{r.scheme}</td>
                                <td>{money(r.amount)}</td>
                                <td>{r.submitted}</td>
                                <td><span className={`tag ${r.status}`}>{status(r.status)}</span></td>
                            </tr>
                        ))}
                        {visible.length === 0 && (
                            <tr><td colSpan="6" className="empty">{t('noResults')}</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
