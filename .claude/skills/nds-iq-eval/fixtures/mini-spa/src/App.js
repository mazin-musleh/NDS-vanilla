import Home from './pages/Home.js'
import Records from './pages/Records.js'
import Reports from './pages/Reports.js'
import About from './pages/About.js'
import Contact from './pages/Contact.js'
import Settings from './pages/Settings.js'

const h = React.createElement
const { useState, useEffect } = React

const ROUTES = {
  '': Home,
  '#/': Home,
  '#/records': Records,
  '#/reports': Reports,
  '#/about': About,
  '#/contact': Contact,
  '#/settings': Settings,
}

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

export default function App() {
  const hash = useHashRoute()
  const Page = ROUTES[hash] || Home
  return h(
    React.Fragment,
    null,
    h(
      'header',
      { className: 'site-header' },
      h('strong', null, 'Records Portal'),
      h(
        'nav',
        null,
        h('a', { href: '#/' }, 'Home'),
        h('a', { href: '#/records' }, 'Records'),
        h('a', { href: '#/reports' }, 'Reports'),
        h('a', { href: '#/about' }, 'About'),
        h('a', { href: '#/contact' }, 'Contact'),
        h('a', { href: '#/settings' }, 'Settings')
      )
    ),
    h(Page)
  )
}
