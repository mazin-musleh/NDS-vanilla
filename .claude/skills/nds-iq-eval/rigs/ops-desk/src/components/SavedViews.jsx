import { useState } from 'react';
import toast from 'react-hot-toast';
import Select from './Select.jsx';
import { useStore } from '../store.js';

export default function SavedViews() {
    const views = useStore((s) => s.views);
    const saveView = useStore((s) => s.saveView);
    const deleteView = useStore((s) => s.deleteView);
    const setFilters = useStore((s) => s.setFilters);
    const [name, setName] = useState('');
    const [active, setActive] = useState(null);

    const options = views.map((v) => ({ value: v.name, label: v.name }));

    const save = (e) => {
        e.preventDefault();
        const clean = name.trim();
        if (!clean) return;
        saveView(clean);
        setActive(clean);
        setName('');
        toast.success(`View "${clean}" saved`);
    };

    const remove = () => {
        deleteView(active);
        setActive(null);
    };

    return (
        <div className="views">
            <form className="views-save" onSubmit={save}>
                <input
                    aria-label="View name"
                    placeholder="Name this view"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit" className="btn" disabled={!name.trim()}>
                    Save view
                </button>
            </form>
            <div className="views-pick">
                <Select
                    aria-label="Saved views"
                    placeholder="Saved views"
                    options={options}
                    noOptionsMessage={() => 'No saved views yet'}
                    value={options.find((o) => o.value === active) || null}
                    onChange={(o) => {
                        setActive(o.value);
                        setFilters(views.find((v) => v.name === o.value).filters);
                    }}
                />
                <button type="button" className="btn" onClick={remove} disabled={!active}>
                    Delete view
                </button>
            </div>
        </div>
    );
}
