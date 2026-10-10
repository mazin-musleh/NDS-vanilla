import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOne, historyFor, setStatus, subscribe } from '../data.js';
import { useLang } from '../i18n.js';

export default function RequestDetail() {
    const { id } = useParams();
    const { t, status, money } = useLang();
    const [record, setRecord] = useState(() => getOne(id));

    useEffect(() => subscribe(() => setRecord(getOne(id))), [id]);
    useEffect(() => setRecord(getOne(id)), [id]);

    if (!record) return <p className="empty">{t('notFound')}</p>;

    return (
        <>
            <div className="page-head">
                <div>
                    <h1>{t('detailTitle')} {record.id}</h1>
                    <p className="lead">{record.applicant}</p>
                </div>
                <Link className="btn ghost" to={`/requests/${record.id}/receipt`}>{t('printReceipt')}</Link>
            </div>

            <div className="split">
                <div className="panel">
                    <dl className="review">
                        <dt>{t('colApplicant')}</dt><dd>{record.applicant}</dd>
                        <dt>{t('colScheme')}</dt><dd>{record.scheme}</dd>
                        <dt>{t('colAmount')}</dt><dd>{money(record.amount)}</dd>
                        <dt>{t('colSubmitted')}</dt><dd>{record.submitted}</dd>
                        <dt>{t('colStatus')}</dt><dd><span className={`tag ${record.status}`}>{status(record.status)}</span></dd>
                        {record.summary && <><dt>{t('fieldSummary')}</dt><dd>{record.summary}</dd></>}
                    </dl>

                    <div className="actions">
                        <span className="muted">{t('decision')}</span>
                        <button type="button" className="btn primary" onClick={() => setStatus(record.id, 'approved')}>{t('approve')}</button>
                        <button type="button" className="btn danger" onClick={() => setStatus(record.id, 'rejected')}>{t('reject')}</button>
                    </div>
                </div>

                <div className="panel">
                    <h2>{t('history')}</h2>
                    <ol className="timeline">
                        {historyFor(record.status).map((entry, i, all) => (
                            <li key={entry} className={i === all.length - 1 ? 'current' : 'done'}>{entry}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </>
    );
}
