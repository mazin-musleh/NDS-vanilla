import ReactSelect from 'react-select';

// Menus render in the body so a scrolling drawer or modal never clips them.
const styles = {
    menuPortal: (base) => ({ ...base, zIndex: 3000 }),
    control: (base, state) => ({
        ...base,
        minHeight: 36,
        borderColor: state.isFocused ? 'var(--accent)' : 'var(--line)',
        boxShadow: state.isFocused ? '0 0 0 1px var(--accent)' : 'none',
    }),
};

export default function Select(props) {
    return <ReactSelect classNamePrefix="rs" styles={styles} menuPortalTarget={document.body} {...props} />;
}
