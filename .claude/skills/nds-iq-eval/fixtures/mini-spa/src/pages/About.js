const h = React.createElement

export default function About() {
  return h(
    'main',
    { className: 'page' },
    h('h1', null, 'About'),
    h('div', { className: 'card' }, h('h2', null, 'About this portal'), h('p', null, 'What the portal is for and who runs it.'))
  )
}
