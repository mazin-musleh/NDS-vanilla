const h = React.createElement

const RECORDS = [
  { id: 'REC-1041', title: 'Annual facility inspection', owner: 'Facilities', updated: '2026-08-02' },
  { id: 'REC-1038', title: 'Vendor contract renewal', owner: 'Procurement', updated: '2026-07-28' },
  { id: 'REC-1035', title: 'Staff onboarding checklist', owner: 'HR', updated: '2026-07-21' },
  { id: 'REC-1029', title: 'Quarterly budget review', owner: 'Finance', updated: '2026-07-14' },
  { id: 'REC-1022', title: 'Incident report follow-up', owner: 'Operations', updated: '2026-07-03' },
]

const hero =
  h('section', { className: 'nds-hero-section nds-sub' },
    h('nav', { className: 'nds-breadcrumb-nav', 'aria-label': 'Breadcrumb', 'data-i18n-aria-label': 'breadcrumb.breadcrumb' },
      h('ol', { className: 'nds-breadcrumb' },
        h('li', null,
          h('a', { href: '../#/' }, 'Home')
        ),
        h('li', { className: 'nds-truncate', 'aria-current': 'page' }, 'Records')
      )
    ),
    h('div', { className: 'nds-section-wrapper' },
      h('div', { className: 'nds-section-head' },
        h('h1', { className: 'nds-section-title' }, 'Records'),
        h('p', { className: 'nds-section-description' }, 'Search, filter and export the records the portal holds.')
      )
    )
  )

export default function RecordsList() {
  return h(
    React.Fragment,
    null,
    hero,
    h(
      'section',
      { id: 'records', className: 'nds-content-section' },
      h(
        'div',
        { className: 'nds-section-wrapper' },
        h(
          'div',
          { className: 'nds-section-head' },
          h('h2', { className: 'nds-section-title' }, 'All records'),
          h('p', { className: 'nds-section-description' }, 'Every record in the portal. Search by ID, title or owner, or filter by owner and update date.')
        ),
        h(
          'div',
          { className: 'nds-section-body' },
          h('div', { className: 'nds-toolbar' },
            h('div', { className: 'nds-toolbar-row' },
              h('div', { className: 'nds-toolbar-start' },
                h('span', { className: 'nds-toolbar-text', 'data-paged-target': 'records-rows' },
                  h('span', { className: 'nds-records-view' },
                    'Showing ',
                    h('b', { 'data-paged-from': '' }, 1),
                    '–',
                    h('b', { 'data-paged-to': '' }, Math.min(5, RECORDS.length)),
                    ' of ',
                    h('b', { 'data-paged-count': '' }, RECORDS.length),
                    ' records'
                  )
                )
              ),
              h('div', { className: 'nds-toolbar-end' },
                h('div', { className: 'nds-dropmenu', 'data-select-name': 'perPage', 'data-select-value': '5', 'data-per-page-target': 'records-rows' },
                  h('button', { className: 'nds-btn nds-secondary-outline nds-md nds-menu-btn nds-dropmenu-trigger', type: 'button', 'aria-label': 'Records per page' },
                    h('span', { className: 'nds-label' }, '5')
                  ),
                  h('div', { className: 'nds-dropmenu-menu nds-center', hidden: true },
                    h('div', { className: 'nds-dropmenu-scroll' },
                      h('button', { className: 'nds-btn nds-subtle nds-dropmenu-item', type: 'button', 'data-value': '5' },
                        h('span', { className: 'nds-label' }, '5')
                      ),
                      h('button', { className: 'nds-btn nds-subtle nds-dropmenu-item', type: 'button', 'data-value': '10' },
                        h('span', { className: 'nds-label' }, '10')
                      ),
                      h('button', { className: 'nds-btn nds-subtle nds-dropmenu-item', type: 'button', 'data-value': '25' },
                        h('span', { className: 'nds-label' }, '25')
                      )
                    )
                  )
                ),
                h('div', { className: 'nds-dropmenu', 'data-columns-target': 'records-table' },
                  h('button', { className: 'nds-btn nds-secondary-outline nds-md nds-menu-btn nds-dropmenu-trigger', type: 'button' },
                    h('i', { className: 'nds-icon nds-hgi-view-off-slash', 'aria-hidden': 'true' }),
                    h('span', { className: 'nds-label', 'data-hidden': 'sm sr', 'data-i18n': 'table.columns' }, 'Columns')
                  ),
                  h('div', { className: 'nds-dropmenu-menu', hidden: true },
                    h('div', { className: 'nds-dropmenu-scroll' },
                      h('fieldset', { className: 'nds-form-group nds-checkbox-group nds-dropmenu-group', 'data-columns-list': '', 'data-no-auto-close': '' },
                        h('legend', { className: 'nds-label', 'data-i18n': 'table.visible_columns' }, 'Visible columns')
                      )
                    )
                  )
                ),
                h('div', { className: 'nds-dropmenu' },
                  h('button', { className: 'nds-btn nds-secondary-outline nds-md nds-dropmenu-trigger', type: 'button' },
                    h('i', { className: 'nds-icon nds-hgi-download-04', 'aria-hidden': 'true' }),
                    h('span', { className: 'nds-label', 'data-hidden': 'sm sr', 'data-i18n': 'export.export' }, 'Export')
                  ),
                  h('div', { className: 'nds-dropmenu-menu', hidden: true },
                    h('div', { className: 'nds-dropmenu-scroll' },
                      h('button', { className: 'nds-btn nds-subtle nds-dropmenu-item', type: 'button', 'data-export': 'csv', 'data-export-target': '#records-table' },
                        h('span', { className: 'nds-label' }, 'CSV')
                      ),
                      h('button', { className: 'nds-btn nds-subtle nds-dropmenu-item', type: 'button', 'data-export': 'xls', 'data-export-target': '#records-table' },
                        h('span', { className: 'nds-label' }, 'Excel')
                      ),
                      h('button', { className: 'nds-btn nds-subtle nds-dropmenu-item', type: 'button', 'data-export': 'pdf', 'data-export-target': '#records-table' },
                        h('span', { className: 'nds-label' }, 'PDF')
                      )
                    )
                  )
                )
              )
            ),
            h('div', { className: 'nds-toolbar-row' },
              h('div', { className: 'nds-form-container nds-search-box', 'data-filter-target': 'records-rows' },
                h('div', { className: 'nds-search-content' },
                  h('div', { className: 'nds-form-control' },
                    h('i', { className: 'nds-icon nds-hgi-search-01', 'aria-hidden': 'true' }),
                    h('input', { type: 'text', className: 'nds-search-input', placeholder: 'Search records...', 'aria-label': 'Search records' }),
                    h('div', { className: 'nds-form-action' },
                      h('button', { className: 'nds-btn nds-subtle nds-clear nds-icon-only', type: 'button', hidden: true, 'aria-label': 'Clear search', 'data-i18n-aria-label': 'form.clear_search' },
                        h('i', { className: 'nds-icon nds-hgi-cancel-01', 'aria-hidden': 'true' })
                      )
                    )
                  ),
                  h('button', { className: 'nds-btn nds-primary nds-search-btn', type: 'button' },
                    h('i', { className: 'nds-icon nds-hgi-search-01', 'aria-hidden': 'true' }),
                    h('span', { className: 'nds-label', 'data-hidden': 'sm sr', 'data-i18n': 'filter.search' }, 'Search')
                  )
                )
              ),
              h('div', { className: 'nds-dropmenu nds-filter', 'data-filter-target': 'records-rows' },
                h('button', { className: 'nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger', type: 'button' },
                  h('i', { className: 'nds-icon nds-hgi-filter', 'aria-hidden': 'true' }),
                  h('span', { className: 'nds-label', 'data-hidden': 'sm sr', 'data-i18n': 'filter.filter' }, 'Filter')
                ),
                h('div', { className: 'nds-dropmenu-menu', hidden: true },
                  h('div', { className: 'nds-dropmenu-scroll' },
                    h('div', { 'data-filter': 'owner', 'data-filter-type': 'checkbox', 'data-filter-legend': 'Owner', 'data-no-auto-close': '' }),
                    h('hr', { className: 'nds-divider' }),
                    h('fieldset', { className: 'nds-form-group nds-dropmenu-group', 'data-filter': 'updated' },
                      h('legend', { className: 'nds-label' }, 'Updated'),
                      h('div', { className: 'nds-form-container nds-date-picker nds-date-range' },
                        h('div', { className: 'nds-form-control' },
                          h('div', { className: 'nds-form-action' },
                            h('button', { type: 'button', className: 'nds-btn nds-subtle nds-md nds-date-picker-toggle nds-icon-only', 'aria-label': 'Open calendar', 'data-i18n-aria-label': 'date-picker.open_calendar' },
                              h('i', { className: 'nds-icon nds-hgi-calendar-03', 'aria-hidden': 'true' })
                            )
                          ),
                          h('input', { type: 'text', id: 'records-updated', className: 'nds-input nds-date-input', placeholder: 'DD/MM/YYYY - DD/MM/YYYY', 'aria-label': 'Updated' })
                        ),
                        h('input', { type: 'hidden', className: 'nds-date-value', 'data-date-format': 'YYYY-MM-DD', 'data-calendar': 'gregory' }),
                        h('input', { type: 'hidden', className: 'nds-date-value', 'data-date-format': 'YYYY-MM-DD', 'data-calendar': 'gregory' })
                      )
                    )
                  ),
                  h('div', { className: 'nds-dropmenu-footer' },
                    h('hr', { className: 'nds-divider' }),
                    h('div', { className: 'nds-dropmenu-action' },
                      h('button', { className: 'nds-btn nds-secondary nds-dropmenu-item', type: 'button', 'data-filter-action': 'clear', 'data-no-auto-close': '' },
                        h('span', { className: 'nds-label', 'data-i18n': 'filter.reset' }, 'Reset')
                      ),
                      h('button', { className: 'nds-btn nds-primary nds-dropmenu-item', type: 'button', 'data-filter-action': 'apply' },
                        h('span', { className: 'nds-label', 'data-i18n': 'filter.apply' }, 'Apply')
                      )
                    )
                  )
                )
              )
            ),
            h('div', { className: 'nds-toolbar-row' },
              h('div', { className: 'nds-toolbar-start' },
                h('div', { className: 'nds-filter-applied', 'data-filter-target': 'records-rows', hidden: true },
                  h('span', { className: 'nds-label', 'data-i18n': 'filter.applied_filters' }, 'Applied Filters:'),
                  h('div', { className: 'nds-chips' })
                )
              )
            )
          ),
          h('div', { className: 'nds-table-wrapper nds-block' },
            h('table', { id: 'records-table', className: 'nds-table', 'data-export-name': 'records' },
              h('thead', null,
                h('tr', null,
                  h('th', { 'data-columns-lock': '' },
                    h('div', { className: 'nds-col-header' },
                      h('span', { className: 'nds-label' }, 'ID'),
                      h('div', { className: 'nds-col-actions' },
                        h('button', { className: 'nds-btn nds-subtle nds-sort-btn nds-icon-only', type: 'button', 'aria-label': 'Sort by ID' },
                          h('i', { className: 'nds-icon nds-hgi-sorting-05 nds-sort-icon', 'aria-hidden': 'true' })
                        )
                      )
                    )
                  ),
                  h('th', null,
                    h('div', { className: 'nds-col-header' },
                      h('span', { className: 'nds-label' }, 'Title'),
                      h('div', { className: 'nds-col-actions' },
                        h('button', { className: 'nds-btn nds-subtle nds-sort-btn nds-icon-only', type: 'button', 'aria-label': 'Sort by title' },
                          h('i', { className: 'nds-icon nds-hgi-sorting-05 nds-sort-icon', 'aria-hidden': 'true' })
                        )
                      )
                    )
                  ),
                  h('th', null,
                    h('div', { className: 'nds-col-header' },
                      h('span', { className: 'nds-label' }, 'Owner'),
                      h('div', { className: 'nds-col-actions' },
                        h('button', { className: 'nds-btn nds-subtle nds-sort-btn nds-icon-only', type: 'button', 'aria-label': 'Sort by owner' },
                          h('i', { className: 'nds-icon nds-hgi-sorting-05 nds-sort-icon', 'aria-hidden': 'true' })
                        )
                      )
                    )
                  ),
                  h('th', null,
                    h('div', { className: 'nds-col-header' },
                      h('span', { className: 'nds-label' }, 'Updated'),
                      h('div', { className: 'nds-col-actions' },
                        h('button', { className: 'nds-btn nds-subtle nds-sort-btn nds-icon-only', type: 'button', 'aria-label': 'Sort by updated date' },
                          h('i', { className: 'nds-icon nds-hgi-sorting-05 nds-sort-icon', 'aria-hidden': 'true' })
                        )
                      )
                    )
                  )
                )
              ),
              h('tbody', { id: 'records-rows', className: 'nds-paged-content', 'data-filter-items': 'tr', style: { '--per-page': '5' } },
                RECORDS.map(r =>
                  h('tr', { className: 'nds-page-item', key: r.id },
                    h('td', null, r.id),
                    h('td', null, r.title),
                    h('td', null,
                      h('span', { className: 'nds-tag nds-gray nds-sm' },
                        h('span', { className: 'nds-label', 'data-filter': 'owner' }, r.owner)
                      )
                    ),
                    h('td', null,
                      h('time', { dateTime: r.updated, 'data-filter': 'updated', 'data-filter-value': r.updated }, r.updated)
                    )
                  )
                )
              )
            )
          ),
          h('nav', { className: 'nds-pagination', 'data-auto-pagination': 'records-rows', 'aria-label': 'Records pagination' })
        )
      )
    )
  )
}
