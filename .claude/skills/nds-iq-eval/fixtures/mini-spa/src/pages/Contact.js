const h = React.createElement

export default function Contact() {
  return h(
    'main',
    { className: 'page' },
    h('h1', null, 'Contact'),
    h('div', { className: 'card' }, h('h2', null, 'Get in touch'), h('p', null, 'Send the records office a message.'))
  )
}
