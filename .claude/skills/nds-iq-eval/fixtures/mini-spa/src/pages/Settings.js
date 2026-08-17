const h = React.createElement

export default function Settings() {
  return h(
    'main',
    { className: 'page' },
    h('h1', null, 'Settings'),
    h('div', { className: 'card' }, h('h2', null, 'Preferences'), h('p', null, 'Manage your notification and display preferences.'))
  )
}
