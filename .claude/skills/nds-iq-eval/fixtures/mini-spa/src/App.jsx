import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Records from './pages/Records.jsx'
import Reports from './pages/Reports.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Settings from './pages/Settings.jsx'

export default function App() {
  return (
    <>
      <header className="site-header">
        <strong>Records Portal</strong>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/records">Records</Link>
          <Link to="/reports">Reports</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/records" element={<Records />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  )
}
