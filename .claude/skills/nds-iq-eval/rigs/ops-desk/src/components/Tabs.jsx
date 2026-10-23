export default function Tabs({ tabs, value, onChange, children }) {
    const move = (e, i) => {
        const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!step) return;
        const next = tabs[(i + step + tabs.length) % tabs.length];
        onChange(next.id);
        document.getElementById(`tab-${next.id}`)?.focus();
    };

    return (
        <div className="tabs">
            <div className="tablist" role="tablist">
                {tabs.map((t, i) => (
                    <button
                        key={t.id}
                        id={`tab-${t.id}`}
                        type="button"
                        role="tab"
                        className={`tab ${value === t.id ? 'is-active' : ''}`}
                        aria-selected={value === t.id}
                        aria-controls={`panel-${t.id}`}
                        tabIndex={value === t.id ? 0 : -1}
                        onClick={() => onChange(t.id)}
                        onKeyDown={(e) => move(e, i)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>
            <div className="tabpanel" role="tabpanel" id={`panel-${value}`} aria-labelledby={`tab-${value}`}>
                {children}
            </div>
        </div>
    );
}
