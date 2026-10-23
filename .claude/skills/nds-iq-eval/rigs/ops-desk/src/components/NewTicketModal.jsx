import { useActionState, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import Modal from './Modal.jsx';
import Select from './Select.jsx';
import TagInput from './TagInput.jsx';
import { createTicket } from '../api.js';
import { CATEGORIES } from '../data/seed.js';
import { DISTRICT_OPTIONS, PRIORITY_OPTIONS } from '../lib.js';

const CATEGORY_OPTIONS = Object.keys(CATEGORIES).map((c) => ({ value: c, label: c }));

function Field({ label, htmlFor, error, children }) {
    return (
        <div className={`field ${error ? 'has-error' : ''}`}>
            <label htmlFor={htmlFor}>{label}</label>
            {children}
            {error && <p className="field-error" role="alert">{error}</p>}
        </div>
    );
}

export default function NewTicketModal({ onClose }) {
    const qc = useQueryClient();
    const [category, setCategory] = useState(null);
    const [subtype, setSubtype] = useState(null);
    const [district, setDistrict] = useState(null);
    const [due, setDue] = useState(null);
    const [labels, setLabels] = useState([]);

    const [state, formAction, pending] = useActionState(
        async (_prev, formData) => {
            const values = {
                title: formData.get('title').trim(),
                category: formData.get('category'),
                subtype: formData.get('subtype'),
                district: formData.get('district'),
                priority: formData.get('priority'),
                dueAt: formData.get('dueAt') || null,
                labels: formData.getAll('labels'),
                description: formData.get('description').trim(),
            };
            try {
                const ticket = await createTicket(values);
                qc.setQueryData(['tickets'], (old) => [ticket, ...(old || [])]);
                toast.success(`Ticket ${ticket.id} created`);
                onClose();
                return { errors: {}, values: {} };
            } catch (e) {
                if (e.status === 422) return { errors: e.errors, values };
                toast.error('Could not create the ticket. Try again.');
                return { errors: {}, values };
            }
        },
        { errors: {}, values: {} },
    );

    const { errors, values } = state;
    const subtypeOptions = category ? CATEGORIES[category.value].map((s) => ({ value: s, label: s })) : [];

    return (
        <Modal title="New ticket" onClose={onClose} wide>
            <form action={formAction} noValidate>
                <Field label="Title" htmlFor="nt-title" error={errors.title}>
                    <input id="nt-title" name="title" data-autofocus defaultValue={values.title} maxLength={120} />
                </Field>
                <div className="grid-2">
                    <Field label="Category" htmlFor="nt-category" error={errors.category}>
                        <Select
                            inputId="nt-category"
                            name="category"
                            options={CATEGORY_OPTIONS}
                            value={category}
                            placeholder="Choose..."
                            onChange={(o) => {
                                setCategory(o);
                                setSubtype(null);
                            }}
                        />
                    </Field>
                    <Field label="Subtype" htmlFor="nt-subtype" error={errors.subtype}>
                        <Select
                            inputId="nt-subtype"
                            name="subtype"
                            options={subtypeOptions}
                            value={subtype}
                            isDisabled={!category}
                            placeholder={category ? 'Choose...' : 'Pick a category first'}
                            onChange={setSubtype}
                        />
                    </Field>
                </div>
                <div className="grid-2">
                    <Field label="District" htmlFor="nt-district" error={errors.district}>
                        <Select
                            inputId="nt-district"
                            name="district"
                            options={DISTRICT_OPTIONS}
                            value={district}
                            placeholder="Choose..."
                            onChange={setDistrict}
                        />
                    </Field>
                    <Field label="Due date" htmlFor="nt-due">
                        <DatePicker
                            id="nt-due"
                            selected={due}
                            onChange={setDue}
                            showTimeSelect
                            timeFormat="HH:mm"
                            dateFormat="dd/MM/yyyy HH:mm"
                            minDate={new Date()}
                            placeholderText="Default from priority"
                            isClearable
                            portalId="popups"
                        />
                        <input type="hidden" name="dueAt" value={due ? due.toISOString() : ''} />
                    </Field>
                </div>
                <fieldset className={`field radios ${errors.priority ? 'has-error' : ''}`}>
                    <legend>Priority</legend>
                    <div className="inline">
                        {PRIORITY_OPTIONS.map((p) => (
                            <label key={p.value} className="radio">
                                <input type="radio" name="priority" value={p.value} defaultChecked={values.priority === p.value} />
                                {p.label}
                            </label>
                        ))}
                    </div>
                    {errors.priority && <p className="field-error" role="alert">{errors.priority}</p>}
                </fieldset>
                <Field label="Labels" htmlFor="nt-labels">
                    <TagInput id="nt-labels" name="labels" value={labels} onChange={setLabels} />
                </Field>
                <Field label="Description" htmlFor="nt-description">
                    <textarea id="nt-description" name="description" rows={3} defaultValue={values.description} />
                </Field>
                <div className="modal-actions">
                    <button type="button" className="btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={pending}>
                        {pending ? 'Creating...' : 'Create ticket'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
