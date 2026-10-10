import { Link, useParams } from 'react-router-dom';
import { getOne } from '../data.js';
import { useLang } from '../i18n.js';

export default function Receipt() {
    const { id } = useParams();
    const { t, status, money } = useLang();
    const record = getOne(id);

    if (!record) return <p className="empty">{t('notFound')}</p>;

    return (
        <div className="receipt">
            <div className="page-head no-print">
                <h1>{t('receiptTitle')}</h1>
                <div className="actions">
                    <Link className="btn ghost" to={`/requests/${record.id}`}>{t('detailTitle')}</Link>
                    <button type="button" className="btn primary" onClick={() => window.print()}>{t('print')}</button>
                </div>
            </div>

            <div className="panel paper">
                <p className="ref">{record.id}</p>
                <dl className="review">
                    <dt>{t('colApplicant')}</dt><dd>{record.applicant}</dd>
                    <dt>{t('colScheme')}</dt><dd>{record.scheme}</dd>
                    <dt>{t('colAmount')}</dt><dd>{money(record.amount)}</dd>
                    <dt>{t('colSubmitted')}</dt><dd>{record.submitted}</dd>
                    <dt>{t('colStatus')}</dt><dd>{status(record.status)}</dd>
                </dl>
                <p className="muted">{t('receiptNote')}</p>
            </div>
        </div>
    );
}
