const h = React.createElement

export default function Home() {
  return h(
    'main',
    { className: 'page' },
    h('h1', null, 'Home'),
    h('div', { className: 'card' }, h('h2', null, 'Welcome'), h('p', null, 'Overview of recent activity across the portal.'))
  )
}
