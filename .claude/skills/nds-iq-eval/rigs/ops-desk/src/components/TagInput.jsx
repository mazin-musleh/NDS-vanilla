import { useState } from 'react';

export default function TagInput({ value, onChange, name, id }) {
    const [text, setText] = useState('');

    const add = () => {
        const tag = text.trim().toLowerCase();
        if (tag && !value.includes(tag)) onChange([...value, tag]);
        setText('');
    };

    return (
        <div className="tags">
            {value.map((tag) => (
                <span className="chip" key={tag}>
                    {tag}
                    <button type="button" aria-label={`Remove ${tag}`} onClick={() => onChange(value.filter((t) => t !== tag))}>
                        &times;
                    </button>
                    <input type="hidden" name={name} value={tag} />
                </span>
            ))}
            <input
                id={id}
                className="tags-input"
                value={text}
                placeholder={value.length ? '' : 'Type a label and press Enter'}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        add();
                    }
                }}
            />
        </div>
    );
}
