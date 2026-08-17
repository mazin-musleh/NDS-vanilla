const h = React.createElement
const { useState } = React

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
  return h(
    'main',
    { className: 'page' },
    h('h1', null, 'Records'),
    h('input', {
      type: 'search',
      placeholder: 'Search records',
      value: q,
      onChange: e => setQ(e.target.value),
    }),
    h(
      'table',
      null,
      h('thead', null, h('tr', null, h('th', null, 'ID'), h('th', null, 'Title'), h('th', null, 'Owner'), h('th', null, 'Updated'))),
      h(
        'tbody',
        null,
        shown.map(r =>
          h('tr', { key: r.id }, h('td', null, r.id), h('td', null, r.title), h('td', null, r.owner), h('td', null, r.updated))
        )
      )
    )
  )
}
