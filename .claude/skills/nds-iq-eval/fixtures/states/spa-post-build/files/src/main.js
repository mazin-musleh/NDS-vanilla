import App from './App.js'
import NdsApp from './nds/NdsApp.js'

const h = React.createElement
const { useState, useEffect } = React

// Legacy stylesheet has element-level selectors (body/h1/h2/a) — keep it out of
// the NDS world entirely (NDS-PLAN.md "Global stylesheet hazard").
let styleTag = null
function setLegacyStyles(on) {
  if (on && !styleTag) {
    styleTag = Object.assign(document.createElement('link'), {
      rel: 'stylesheet',
      href: new URL('./styles.css', import.meta.url).href,
    })
    document.head.appendChild(styleTag)
  } else if (!on && styleTag) {
    styleTag.remove()
    styleTag = null
  }
}

function Root() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const isNds = hash.indexOf('#/nds') === 0
  useEffect(() => {
    setLegacyStyles(!isNds)
    // Console shape switch (page-shell.md) — the index.html inline script covers
    // first paint; this covers crossing worlds without a full reload.
    document.body.className = isNds ? 'nds-full-width' : ''
  }, [isNds])

  return isNds ? h(NdsApp) : h(App)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(React.StrictMode, null, React.createElement(Root))
)
