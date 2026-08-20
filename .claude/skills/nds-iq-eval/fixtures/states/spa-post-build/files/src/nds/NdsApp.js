import Shell from './Shell.js'
import RecordsList from './records/RecordsList.js'

const h = React.createElement
const { useState, useEffect } = React

// Gate-by-gate: only Records ships so far (NDS-PLAN.md). Any other /nds route,
// including the bare landing hash, redirects to it rather than rendering a stub.
const ROUTES = {
  '#/nds/records': RecordsList,
}

export default function NdsApp() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const Page = ROUTES[hash]
  useEffect(() => {
    // Only redirect within the nds world. A hash that left it (e.g. browser
    // back/forward to a legacy route) is main.js's Root swapping worlds —
    // NdsApp is about to unmount, not a route it should try to own.
    if (hash.indexOf('#/nds') === 0 && !Page) window.location.hash = '#/nds/records'
  }, [hash, Page])

  return h(Shell, null, Page ? h(Page) : null)
}
