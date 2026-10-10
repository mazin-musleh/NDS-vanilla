import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SCHEMES, add } from '../data.js';
import { useLang } from '../i18n.js';

const STEPS = ['stepApplicant', 'stepProject', 'stepReview'];

export default function NewRequest() {
    const { t, money } = useLang();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        applicant: '', contact: '', email: '', phone: '',
        scheme: SCHEMES[0], amount: '', summary: '',
    });

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    function validate() {
        const need = step === 0
            ? ['applicant', 'contact', 'email']
            : step === 1 ? ['amount', 'summary'] : [];
        const found = {};
        need.forEach((k) => { if (!String(form[k]).trim()) found[k] = t('required'); });
        setErrors(found);
        return Object.keys(found).length === 0;
    }

    function next() {
        if (validate()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }

    function submit(e) {
        e.preventDefault();
        const record = add({ ...form, amount: Number(form.amount) || 0 });
        navigate(`/requests/${record.id}/receipt`);
    }

    const field = (key, label, type = 'text') => (
        <label className="fieldrow">
            <span>{label}</span>
            <input type={type} className={`field${errors[key] ? ' invalid' : ''}`} value={form[key]} onChange={set(key)} />
            {errors[key] && <em className="error">{errors[key]}</em>}
        </label>
    );

    return (
        <>
            <div className="page-head">
                <h1>{t('newTitle')}</h1>
            </div>

            <ol className="steps">
                {STEPS.map((s, i) => (
                    <li key={s} className={i === step ? 'current' : i < step ? 'done' : ''}>
                        <span className="num">{i + 1}</span>{t(s)}
                    </li>
                ))}
            </ol>

            <form className="panel form" onSubmit={submit}>
                <p className="muted">{t('step')} {step + 1} {t('of')} {STEPS.length}</p>

                {step === 0 && (
                    <>
                        {field('applicant', t('fieldOrg'))}
                        {field('contact', t('fieldContact'))}
                        {field('email', t('fieldEmail'), 'email')}
                        {field('phone', t('fieldPhone'), 'tel')}
                    </>
                )}

                {step === 1 && (
                    <>
                        <label className="fieldrow">
                            <span>{t('fieldScheme')}</span>
                            <select className="field" value={form.scheme} onChange={set('scheme')}>
                                {SCHEMES.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </label>
                        {field('amount', t('fieldAmount'), 'number')}
                        <label className="fieldrow">
                            <span>{t('fieldSummary')}</span>
                            <textarea rows="5" className={`field${errors.summary ? ' invalid' : ''}`} value={form.summary} onChange={set('summary')} />
                            {errors.summary && <em className="error">{errors.summary}</em>}
                        </label>
                    </>
                )}

                {step === 2 && (
                    <dl className="review">
                        <dt>{t('fieldOrg')}</dt><dd>{form.applicant}</dd>
                        <dt>{t('fieldContact')}</dt><dd>{form.contact}</dd>
                        <dt>{t('fieldEmail')}</dt><dd>{form.email}</dd>
                        <dt>{t('fieldPhone')}</dt><dd>{form.phone || '—'}</dd>
                        <dt>{t('fieldScheme')}</dt><dd>{form.scheme}</dd>
                        <dt>{t('fieldAmount')}</dt><dd>{money(Number(form.amount) || 0)}</dd>
                        <dt>{t('fieldSummary')}</dt><dd>{form.summary}</dd>
                    </dl>
                )}

                <div className="actions">
                    {step > 0 && <button type="button" className="btn ghost" onClick={() => setStep((s) => s - 1)}>{t('back')}</button>}
                    {step < STEPS.length - 1
                        ? <button type="button" className="btn primary" onClick={next}>{t('next')}</button>
                        : <button type="submit" className="btn primary">{t('submit')}</button>}
                </div>
            </form>
        </>
    );
}
