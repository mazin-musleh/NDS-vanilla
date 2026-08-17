const h = React.createElement

export default function Reports() {
  return h(
    'main',
    { className: 'page' },
    h('h1', null, 'Reports'),
    h('div', { className: 'card' }, h('h2', null, 'Monthly reports'), h('p', null, 'Generated summaries by month and department.'))
  )
}
