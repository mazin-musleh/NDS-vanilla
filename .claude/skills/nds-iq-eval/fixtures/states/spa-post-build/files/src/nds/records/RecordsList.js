// Records list — ported from NDS_ROOT/_source/examples/manage-records.md (the
// "Manage Records" archetype named in NDS-PLAN.md). Structure and JS logic are
// canonical, copied verbatim; only content changed (request -> record, REQ- ->
// REC- ids, and the requester field now fetches public/data/requesters.json
// since this project has no backend — same client-only-data pattern the rest
// of the app already uses).
const h = React.createElement
const { useEffect, useRef } = React

const HERO_HTML = `
<section class="nds-hero-section nds-sub">
  <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
    <ol class="nds-breadcrumb">
      <li><a href="#/nds">Home</a></li>
      <li aria-current="page">Records</li>
    </ol>
  </nav>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h1 class="nds-section-title">Records</h1>
      <p class="nds-section-description">Manage every record in the portal: create, edit, delete, filter, sort, and export. Open a row to read its processing detail.</p>
    </div>
  </div>
</section>
`

const SECTION_HTML = `
<section id="records" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <div class="nds-section-action nds-minimal">
        <button class="nds-btn nds-primary nds-lead-icon" id="add-record" type="button">
          <i class="hgi hgi-stroke hgi-add-01"></i>
          <span class="nds-label">New record</span>
        </button>
      </div>
      <h2 class="nds-section-title">All Records</h2>
      <p class="nds-section-description">Every record submitted to the portal. Open a row to read its processing detail.</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-toolbar">
        <div class="nds-bar-row">
          <div class="nds-bar-start">
            <span class="nds-bar-text" data-paged-target="recordsTableBody" data-selection-target="recordsTableBody">
              <span class="nds-records-view">Showing <b data-paged-from>0</b>&ndash;<b data-paged-to>0</b> of <b data-paged-count>0</b> record(s)</span>
              <span class="nds-selection-view" hidden><b data-selection-count>0</b> selected of <b data-paged-count>0</b> record(s)</span>
            </span>
          </div>
          <div class="nds-bar-end">
            <button class="nds-btn nds-primary nds-destructive nds-md nds-lead-icon" id="bulk-delete" type="button" hidden>
              <i class="hgi hgi-stroke hgi-delete-02"></i>
              <span class="nds-label">Delete selected</span>
            </button>
            <div class="nds-dropmenu" data-select-name="perPage" data-select-value="5" data-per-page-target="recordsTableBody">
              <button class="nds-btn nds-secondary-outline nds-md nds-menu-btn nds-dropmenu-trigger" type="button">
                <span class="nds-label">5</span>
              </button>
              <div class="nds-dropmenu-menu nds-center" hidden>
                <div class="nds-dropmenu-scroll">
                  <button class="nds-btn nds-subtle nds-dropmenu-item" data-value="5"><span class="nds-label">5</span></button>
                  <button class="nds-btn nds-subtle nds-dropmenu-item" data-value="10"><span class="nds-label">10</span></button>
                  <button class="nds-btn nds-subtle nds-dropmenu-item" data-value="25"><span class="nds-label">25</span></button>
                  <button class="nds-btn nds-subtle nds-dropmenu-item" data-value="50"><span class="nds-label">50</span></button>
                </div>
              </div>
            </div>
            <div class="nds-dropmenu" data-columns-target="recordsTable">
              <button class="nds-btn nds-neutral nds-md nds-menu-btn nds-dropmenu-trigger" type="button">
                <i class="nds-icon nds-hgi-view-off-slash" aria-hidden="true"></i>
                <span class="nds-label">Columns</span>
              </button>
              <div class="nds-dropmenu-menu" hidden>
                <div class="nds-dropmenu-scroll">
                  <fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-columns-list data-no-auto-close>
                    <legend class="nds-label">Visible columns</legend>
                  </fieldset>
                </div>
              </div>
            </div>
            <div class="nds-dropmenu">
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-dropmenu-trigger">
                <i class="hgi hgi-stroke hgi-download-04" aria-hidden="true"></i>
                <span class="nds-label">Export</span>
              </button>
              <div class="nds-dropmenu-menu" hidden>
                <div class="nds-dropmenu-scroll">
                  <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-export="csv" data-export-target="#recordsTable">
                    <span class="nds-label">CSV</span>
                  </button>
                  <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-export="xls" data-export-target="#recordsTable">
                    <span class="nds-label">Excel</span>
                  </button>
                  <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-export="pdf" data-export-target="#recordsTable">
                    <span class="nds-label">PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="nds-bar-row">
          <div class="nds-form-container nds-search-box" data-filter-target="recordsTableBody">
            <div class="nds-search-content">
              <div class="nds-form-control">
                <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                <input type="text" class="nds-search-input" placeholder="Search records...">
                <div class="nds-form-action">
                  <button class="nds-btn nds-subtle nds-clear" hidden aria-label="Clear search"><i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i></button>
                </div>
              </div>
              <button class="nds-btn nds-primary nds-search-btn" type="button">
                <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                <span class="nds-label" data-hidden="sm sr">Search</span>
              </button>
            </div>
          </div>
          <div class="nds-dropmenu nds-filter" data-filter-target="recordsTableBody">
            <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
              <i class="hgi hgi-stroke hgi-filter"></i>
              <span class="nds-label" data-hidden="sm sr">Filter</span>
            </button>
            <div class="nds-dropmenu-menu" style="min-width: 300px;" hidden>
              <div class="nds-dropmenu-scroll">
                <div data-filter="service" data-filter-type="checkbox" data-filter-legend="Service" data-no-auto-close></div>
                <hr class="nds-divider">
                <div data-filter="status" data-filter-type="radio" data-filter-legend="Status"
                  data-filter-values='{"pending":"Pending","approved":"Approved","rejected":"Rejected"}' data-no-auto-close></div>
                <hr class="nds-divider">
                <div data-filter="amount" data-filter-type="slider" data-filter-legend="Fee"
                  data-filter-min="0" data-filter-max="6000" data-filter-step="100" data-filter-currency="SAR" data-no-auto-close></div>
              </div>
              <div class="nds-dropmenu-footer">
                <hr class="nds-divider">
                <div class="nds-dropmenu-action">
                  <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-filter-action="clear" data-no-auto-close>
                    <span class="nds-label">Reset</span>
                  </button>
                  <button class="nds-btn nds-primary nds-dropmenu-item" type="button" data-filter-action="apply">
                    <span class="nds-label">Filter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="nds-bar-row">
          <div class="nds-bar-start">
            <div class="nds-filter-applied" data-filter-target="recordsTableBody" hidden>
              <span class="nds-label">Applied Filters:</span>
              <div class="nds-chips"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="nds-block">
        <table id="recordsTable" class="nds-table nds-sortable" data-export-name="records">
          <thead>
            <tr>
              <th>
                <div class="nds-form-container nds-check-container">
                  <div class="nds-form-control"><input type="checkbox" class="nds-check" aria-label="Select all records"></div>
                </div>
              </th>
              <th data-columns-lock>
                <div class="nds-col-header"><span class="nds-label">Reference</span>
                  <div class="nds-col-actions"><button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by reference"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i></button></div>
                </div>
              </th>
              <th>
                <div class="nds-col-header"><span class="nds-label">Requester</span>
                  <div class="nds-col-actions"><button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by requester"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i></button></div>
                </div>
              </th>
              <th>
                <div class="nds-col-header"><span class="nds-label">Service</span>
                  <div class="nds-col-actions"><button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by service"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i></button></div>
                </div>
              </th>
              <th>
                <div class="nds-col-header"><span class="nds-label">Submitted</span>
                  <div class="nds-col-actions"><button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by submitted date"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i></button></div>
                </div>
              </th>
              <th data-export-label="Fee (SAR)">
                <div class="nds-col-header"><span class="nds-label">Fee</span>
                  <div class="nds-col-actions"><button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by fee"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i></button></div>
                </div>
              </th>
              <th>
                <div class="nds-col-header"><span class="nds-label">Status</span>
                  <div class="nds-col-actions"><button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by status"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i></button></div>
                </div>
              </th>
              <th class="actions-column" data-export-skip><div class="nds-col-header"><span class="nds-label">Actions</span></div></th>
            </tr>
          </thead>
          <tbody id="recordsTableBody" class="nds-paged-content" data-filter-items="tr" style="--per-page:5;"></tbody>
        </table>
      </div>
      <nav class="nds-pagination" data-auto-pagination="recordsTableBody" aria-label="Records pagination"></nav>
    </div>
  </div>
</section>

<!-- Create / edit dialog -->
<div id="record-modal" class="nds-modal nds-card nds-stroke nds-lg" role="dialog" aria-labelledby="record-modal-title" aria-hidden="true" hidden>
  <div class="nds-card-header">
    <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-file-edit"></i></span>
    <button class="nds-close nds-modal-close nds-btn nds-subtle" aria-label="Close dialog"><i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i></button>
  </div>
  <form id="record-form" class="nds-form" data-ajax>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title" id="record-modal-title">New record</span>
        <p class="nds-card-description">Fill in the record details. Fields marked required must be filled.</p>
      </div>
      <div class="nds-scroll-more">
        <div class="nds-scroll-more-content nds-flex nds-col" style="--gap: var(--spacing-3xl);">
          <div class="nds-form-container" data-required data-url="/public/data/requesters.json"
            data-name="Name" data-fetch="once" data-min-chars="2" data-empty-message="No matching people">
            <div class="nds-form-header"><label for="record-requester"><span class="nds-label">Requester</span></label></div>
            <div class="nds-form-control" data-portal>
              <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
              <input type="text" id="record-requester" class="nds-input" autocomplete="on" placeholder="Type a name..." required>
              <div class="nds-form-action">
                <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear input"><i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i></button>
              </div>
            </div>
          </div>
          <div class="nds-form-container nds-select" id="record-service-field" data-required>
            <div class="nds-form-header"><label for="record-service"><span class="nds-label">Service</span></label></div>
            <div class="nds-form-control" data-portal>
              <input type="text" id="record-service" class="nds-input nds-select-input" placeholder="Choose a service..." readonly>
              <input type="hidden" name="service" id="record-service-value" class="nds-select-value">
              <div class="nds-select-dropdown" hidden>
                <div class="nds-select-options">
                  <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="Commercial registration"><span class="nds-option-text">Commercial registration</span></button>
                  <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="Work permit renewal"><span class="nds-option-text">Work permit renewal</span></button>
                  <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="Municipal licence"><span class="nds-option-text">Municipal licence</span></button>
                  <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="Building permit"><span class="nds-option-text">Building permit</span></button>
                  <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="Vehicle transfer"><span class="nds-option-text">Vehicle transfer</span></button>
                </div>
              </div>
            </div>
          </div>
          <div class="nds-form-container nds-date-picker" data-required>
            <div class="nds-form-header"><label for="record-date"><span class="nds-label">Submitted</span></label></div>
            <div class="nds-form-control" data-portal>
              <div class="nds-form-action">
                <button type="button" class="nds-btn nds-subtle nds-md date-picker-toggle" aria-label="Calendar Toggler"><i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i></button>
              </div>
              <input type="text" id="record-date" class="nds-input nds-date-input" placeholder="DD/MM/YYYY" data-year-before="5" data-year-after="1" required>
            </div>
          </div>
          <div class="nds-form-container" data-required>
            <div class="nds-form-header"><label for="record-amount"><span class="nds-label">Fee (SAR)</span></label></div>
            <div class="nds-form-control"><input type="number" id="record-amount" class="nds-input" placeholder="0" min="0" step="10" required></div>
          </div>
          <div class="nds-form-container nds-select">
            <div class="nds-form-header"><label for="record-status"><span class="nds-label">Status</span></label></div>
            <div class="nds-form-control" data-portal>
              <input type="text" id="record-status" class="nds-input nds-select-input" placeholder="Pending" readonly>
              <input type="hidden" name="status" id="record-status-value" class="nds-select-value">
              <div class="nds-select-dropdown" hidden>
                <div class="nds-select-options">
                  <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="pending"><span class="nds-option-text">Pending</span></button>
                  <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="approved"><span class="nds-option-text">Approved</span></button>
                  <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="rejected"><span class="nds-option-text">Rejected</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="nds-btn nds-subtle nds-md nds-show-more" type="button" aria-label="Show more">
          <span class="nds-label">Show more</span>
          <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <div class="nds-card-actions">
      <button class="nds-btn nds-primary nds-lg" type="submit"><span class="nds-label">Save</span></button>
      <button class="nds-btn nds-secondary-outline nds-lg" type="button" data-modal-close><span class="nds-label">Cancel</span></button>
    </div>
  </form>
</div>

<!-- Delete confirmation -->
<div id="delete-modal" class="nds-modal nds-card nds-stroke nds-sm" role="dialog" aria-labelledby="delete-modal-title" aria-hidden="true" hidden>
  <div class="nds-card-header">
    <span class="nds-featured-icon nds-circle" data-status="error"><i class="hgi hgi-stroke hgi-delete-02"></i></span>
    <button class="nds-close nds-modal-close nds-btn nds-subtle" aria-label="Close dialog"><i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i></button>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title" id="delete-modal-title">Delete record</span>
      <p class="nds-card-description" id="delete-modal-text">This cannot be undone.</p>
    </div>
  </div>
  <div class="nds-card-actions">
    <button class="nds-btn nds-primary nds-destructive nds-lg" id="delete-confirm" type="button"><span class="nds-label">Delete</span></button>
    <button class="nds-btn nds-secondary-outline nds-lg" type="button" data-modal-close><span class="nds-label">Cancel</span></button>
  </div>
</div>
`

// Seed rows: same shape rowHtml() below writes, so the first paint and every
// row added afterward are identical markup (sort/filter/export/sub-toggle all
// work on both without special-casing).
// Every seed row goes through the same rowHtml() a runtime create() writes, and
// the same on-demand nds:table:sub-request flow — no special-cased pre-written
// detail markup, so there is exactly one code path for row shape.
const SEED = [
  { ref: 'REC-2026-118', requester: 'Norah Al-Otaibi', service: 'Commercial registration', date: '22/07/2026', amount: '1200', status: 'pending' },
  { ref: 'REC-2026-117', requester: 'Faisal Al-Harbi', service: 'Work permit renewal', date: '21/07/2026', amount: '650', status: 'approved' },
  { ref: 'REC-2026-116', requester: 'Maha Al-Zahrani', service: 'Municipal licence', date: '20/07/2026', amount: '2400', status: 'pending' },
  { ref: 'REC-2026-115', requester: 'Turki Al-Dossary', service: 'Building permit', date: '18/07/2026', amount: '5000', status: 'rejected' },
  { ref: 'REC-2026-114', requester: 'Sara Al-Ghamdi', service: 'Commercial registration', date: '17/07/2026', amount: '1200', status: 'approved' },
  { ref: 'REC-2026-113', requester: 'Abdullah Al-Qahtani', service: 'Vehicle transfer', date: '15/07/2026', amount: '300', status: 'pending' },
]

const STATUSES = {
  pending: { label: 'Pending', tag: 'warning', sort: 1 },
  approved: { label: 'Approved', tag: 'success', sort: 2 },
  rejected: { label: 'Rejected', tag: 'error', sort: 3 },
}

function esc(value) {
  return String(value == null ? '' : value).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]
  })
}

// 22/07/2026 -> 2026-07-22, so the Submitted column sorts by real date order.
function toIso(value) {
  const parts = String(value).split('/')
  return parts.length === 3 ? parts[2] + '-' + parts[1] + '-' + parts[0] : value
}

function toast(variant, title, description) {
  if (!window.NDS?.Alert) return
  NDS.Alert.create({ variant, title, description, display: 'toast', position: 'top', duration: 4000 })
}

// Returns the <td> cells only — callers wrap it in <tr class="nds-page-item">
// whether seeding the table or creating a row at runtime.
function rowHtml(record) {
  const status = STATUSES[record.status] || STATUSES.pending
  return (
    '<td><div class="nds-form-container nds-check-container"><div class="nds-form-control">' +
    '<input type="checkbox" class="nds-check" aria-label="Select record ' + esc(record.ref) + '"></div></div></td>' +
    '<td>' + esc(record.ref) + '</td>' +
    '<td>' + esc(record.requester) + '</td>' +
    '<td><span class="nds-tag nds-gray nds-sm"><span class="nds-label" data-filter="service">' + esc(record.service) + '</span></span></td>' +
    '<td data-sort-value="' + esc(toIso(record.date)) + '">' + esc(record.date) + '</td>' +
    '<td data-sort-value="' + esc(record.amount) + '"><span class="nds-number-format" data-currency="SAR" data-filter="amount" data-filter-value="' + esc(record.amount) + '">' + esc(record.amount) + '</span></td>' +
    '<td data-sort-value="' + status.sort + '"><span class="nds-tag nds-sm" data-status="' + status.tag + '"><span class="nds-label" data-filter="status" data-filter-value="' + esc(record.status) + '">' + status.label + '</span></span></td>' +
    '<td class="actions-column"><div class="nds-flex" style="--gap: var(--spacing-xs); --align: center;">' +
    // No aria-controls: the sub row is built on demand; the component stamps
    // the toggle with the real id once it exists (see nds:table:sub-request).
    '<button class="nds-btn nds-subtle nds-md nds-icon-only" type="button" data-sub-toggle aria-label="Toggle details"><i class="hgi hgi-stroke hgi-list-view"></i></button>' +
    '<div class="nds-dropmenu" data-portal>' +
    '<button class="nds-btn nds-subtle nds-md nds-icon-only nds-dropmenu-trigger" type="button" aria-label="Row actions"><i class="hgi hgi-stroke hgi-more-vertical"></i></button>' +
    '<div class="nds-dropmenu-menu nds-record-menu" hidden><div class="nds-dropmenu-scroll">' +
    '<button class="nds-btn nds-subtle nds-dropmenu-item" type="button" data-record-action="edit"><i class="hgi hgi-stroke hgi-edit-02"></i><span class="nds-label">Edit</span></button>' +
    '<hr class="nds-divider">' +
    '<button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive" type="button" data-record-action="delete"><i class="hgi hgi-stroke hgi-delete-02"></i><span class="nds-label">Delete</span></button>' +
    '</div></div></div></div></td>'
  )
}

function detailHtml(record) {
  const status = STATUSES[record.status] || STATUSES.pending
  return (
    '<p>Processing history for ' + esc(record.ref) + ', filed by ' + esc(record.requester) + '.</p>' +
    '<table class="nds-table nds-compact"><thead><tr><th>Step</th><th>Officer</th><th>Date</th></tr></thead><tbody>' +
    '<tr><td>Submitted</td><td>&mdash;</td><td>' + esc(record.date) + '</td></tr>' +
    '<tr><td>Documents checked</td><td>M. Al-Rashid</td><td>' + esc(record.date) + '</td></tr>' +
    '<tr><td>' + status.label + '</td><td>S. Al-Mansour</td><td>' + esc(record.date) + '</td></tr>' +
    '</tbody></table>'
  )
}

function readRow(row) {
  return {
    ref: row.cells[1].textContent.trim(),
    requester: row.cells[2].textContent.trim(),
    service: row.cells[3].textContent.trim(),
    date: row.cells[4].textContent.trim(),
    amount: row.cells[5].querySelector('[data-filter-value]').getAttribute('data-filter-value'),
    status: row.cells[6].querySelector('[data-filter-value]').getAttribute('data-filter-value'),
  }
}

export default function RecordsList() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    const tbody = root.querySelector('#recordsTableBody')
    const table = root.querySelector('#recordsTable')
    const form = root.querySelector('#record-form')
    const modalTitle = root.querySelector('#record-modal-title')
    const bulkBtn = root.querySelector('#bulk-delete')
    const deleteText = root.querySelector('#delete-modal-text')
    const serviceField = root.querySelector('#record-service-field')
    const fields = {
      requester: root.querySelector('#record-requester'),
      service: root.querySelector('#record-service'),
      serviceValue: root.querySelector('#record-service-value'),
      date: root.querySelector('#record-date'),
      amount: root.querySelector('#record-amount'),
      status: root.querySelector('#record-status'),
      statusValue: root.querySelector('#record-status-value'),
    }

    // Seed the table with the initial dataset, same row markup a create writes.
    tbody.innerHTML = SEED.map((r) => '<tr class="nds-page-item">' + rowHtml(r) + '</tr>').join('')

    let editing = null // the row being edited, null while creating
    let toDelete = []
    let selectedRows = []
    let nextRef = 119

    function setSelect(input, value) {
      if (value) NDS.CustomSelect.setValue(input, value)
      else NDS.CustomSelect.clear(input)
    }

    function openEditor(row) {
      editing = row
      const record = row ? readRow(row) : null
      modalTitle.textContent = record ? 'Edit ' + record.ref : 'New record'
      fields.requester.value = record ? record.requester : ''
      fields.date.value = record ? record.date : ''
      fields.amount.value = record ? record.amount : ''
      setSelect(fields.service, record ? record.service : '')
      setSelect(fields.status, record ? record.status : 'pending')
      NDS.Forms.syncState(fields.requester)
      NDS.Forms.syncState(fields.date)
      NDS.Forms.syncState(fields.amount)
      NDS.Forms.clearStatus(fields.requester)
      NDS.Forms.clearStatus(fields.date)
      NDS.Forms.clearStatus(fields.amount)
      NDS.Forms.clearStatus(serviceField)
      NDS.Modal.open('record-modal')
    }

    function releaseRow(row) {
      row.querySelectorAll('.nds-dropmenu').forEach((menu) => NDS.Dropmenu.destroy(menu))
    }

    function refreshWidgets() {
      NDS.Init.refresh(tbody)
    }

    function askDelete(rows) {
      if (!rows.length) return
      toDelete = rows
      deleteText.textContent = rows.length === 1
        ? 'Delete record ' + readRow(rows[0]).ref + '? This cannot be undone.'
        : 'Delete ' + rows.length + ' records? This cannot be undone.'
      NDS.Modal.open('delete-modal')
    }

    const addBtn = root.querySelector('#add-record')
    const onAdd = () => openEditor(null)
    addBtn.addEventListener('click', onAdd)

    const onFormValid = () => {
      const record = {
        ref: editing ? readRow(editing).ref : 'REC-2026-' + nextRef++,
        requester: fields.requester.value.trim(),
        service: fields.serviceValue.value,
        date: fields.date.value.trim(),
        amount: fields.amount.value.trim(),
        status: fields.statusValue.value || 'pending',
      }
      if (editing) {
        NDS.Tables.row(editing).sub.close()
        releaseRow(editing)
        editing.innerHTML = rowHtml(record)
      } else {
        const row = document.createElement('tr')
        row.className = 'nds-page-item'
        row.innerHTML = rowHtml(record)
        tbody.prepend(row)
      }
      NDS.Modal.close()
      refreshWidgets()
      toast('success', editing ? 'Record updated' : 'Record created', record.ref)
      editing = null
    }
    form.addEventListener('nds:formValid', onFormValid)

    const deleteConfirmBtn = root.querySelector('#delete-confirm')
    const onDeleteConfirm = () => {
      const count = toDelete.length
      toDelete.forEach((row) => {
        const sub = NDS.Tables.row(row).sub.el
        if (sub) sub.remove()
        releaseRow(row)
        row.remove()
      })
      toDelete = []
      selectedRows = []
      bulkBtn.hidden = true
      NDS.Modal.close()
      refreshWidgets()
      toast('success', 'Deleted', count === 1 ? 'One record removed.' : count + ' records removed.')
    }
    deleteConfirmBtn.addEventListener('click', onDeleteConfirm)

    const onBulkDelete = () => askDelete(selectedRows.slice())
    bulkBtn.addEventListener('click', onBulkDelete)

    // The row menu carries data-portal, so it moves to <body> when it opens and
    // closest('tr') finds nothing. NDS.Dropmenu.from() resolves its wrapper —
    // which is still inside the row.
    const onDocClick = (event) => {
      const action = event.target.closest('[data-record-action]')
      if (!action) return
      const owner = NDS.Dropmenu.from(action) || action
      const row = owner.closest('tr')
      if (!row) return
      if (action.dataset.recordAction === 'edit') openEditor(row)
      else askDelete([row])
    }
    document.addEventListener('click', onDocClick)

    const onSelection = (event) => {
      selectedRows = event.detail.selectedRows
      bulkBtn.hidden = selectedRows.length === 0
      bulkBtn.querySelector('.nds-label').textContent = 'Delete ' + selectedRows.length
    }
    table.addEventListener('nds:table:selection', onSelection)

    // Detail rows loaded on demand: NDS never fetches, so answer with
    // setContent().open(); the seed rows carry pre-written detail in SEED.
    const onSubRequest = (event) => {
      const row = event.detail.row
      const record = readRow(row)
      const timer = setTimeout(() => {
        NDS.Tables.row(row).sub.setContent(detailHtml(record)).open()
      }, 700)
      event.detail.signal.addEventListener('abort', () => clearTimeout(timer))
    }
    table.addEventListener('nds:table:sub-request', onSubRequest)

    window.NDS?.Init.refresh(root)

    return () => {
      addBtn.removeEventListener('click', onAdd)
      form.removeEventListener('nds:formValid', onFormValid)
      deleteConfirmBtn.removeEventListener('click', onDeleteConfirm)
      bulkBtn.removeEventListener('click', onBulkDelete)
      document.removeEventListener('click', onDocClick)
      table.removeEventListener('nds:table:selection', onSelection)
      table.removeEventListener('nds:table:sub-request', onSubRequest)
      window.NDS?.Init.destroy(root)
    }
  }, [])

  return h(
    React.Fragment,
    null,
    h('div', { dangerouslySetInnerHTML: { __html: HERO_HTML } }),
    h('div', { ref: sectionRef, dangerouslySetInnerHTML: { __html: SECTION_HTML } })
  )
}
