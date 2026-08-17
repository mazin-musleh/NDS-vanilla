import App from './App.js'

const styles = Object.assign(document.createElement('link'), {
  rel: 'stylesheet',
  href: new URL('./styles.css', import.meta.url).href,
})
document.head.appendChild(styles)

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(React.StrictMode, null, React.createElement(App))
)
