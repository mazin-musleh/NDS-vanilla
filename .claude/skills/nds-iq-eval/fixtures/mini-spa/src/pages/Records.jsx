import { useState } from 'react'

const RECORDS = [
  { id: 'REC-1041', title: 'Annual facility inspection', owner: 'Facilities', updated: '2026-08-02' },
  { id: 'REC-1038', title: 'Vendor contract renewal', owner: 'Procurement', updated: '2026-07-28' },
  { id: 'REC-1035', title: 'Staff onboarding checklist', owner: 'HR', updated: '2026-07-21' },
  { id: 'REC-1029', title: 'Quarterly budget review', owner: 'Finance', updated: '2026-07-14' },
  { id: 'REC-1022', title: 'Incident report follow-up', owner: 'Operations', updated: '2026-07-03' },
]

export default function Records() {
  const [q, setQ] = useState('')
  const shown = RECORDS.filter(r =>
    (r.id + ' ' + r.title + ' ' + r.owner).toLowerCase().includes(q.toLowerCase())
  )
  return (
    <main className="page">
      <h1>Records</h1>
      <input
        type="search"
        placeholder="Search records"
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <table>
        <thead>
          <tr><th>ID</th><th>Title</th><th>Owner</th><th>Updated</th></tr>
        </thead>
        <tbody>
          {shown.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td><td>{r.title}</td><td>{r.owner}</td><td>{r.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
