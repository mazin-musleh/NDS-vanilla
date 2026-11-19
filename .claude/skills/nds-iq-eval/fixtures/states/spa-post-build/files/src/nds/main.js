import Shell from './Shell.js'
import RecordsList from './records/RecordsList.js'

const h = React.createElement

// NDS entry: no src/styles.css injection (it styles body, h1, h2 and a globally).
ReactDOM.createRoot(document.getElementById('root')).render(
  h(React.StrictMode, null, h(Shell, null, h(RecordsList)))
)
