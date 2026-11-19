const h = React.createElement
const { useEffect } = React

// Chrome of the NDS views: console shape with the rail side menu. Page views come in as children.
// The legacy shell (src/App.js) is not used here, so src/styles.css never loads on these routes.

const topBar =
  h('div', { className: 'nds-topbar nds-content-wrapper', role: 'region', 'aria-label': 'Top bar utilities', 'data-i18n-aria-label': 'topbar.top_bar_utilities' },
    h('div', { className: 'nds-topbar-info' },
      h('span', { className: 'nds-meta', 'data-hidden': 'sm md' },
        h('span', { className: 'nds-meta-item' },
          h('i', { className: 'nds-icon nds-hgi-calendar-03', 'aria-hidden': 'true' }),
          h('time', { 'data-date-today': '', 'data-calendar': 'gregory', 'data-date-format': 'long' })
        )
      ),
      h('span', { className: 'nds-meta', 'data-hidden': 'sm' },
        h('span', { className: 'nds-meta-item' },
          h('i', { className: 'nds-icon nds-hgi-clock-01', 'aria-hidden': 'true' }),
          h('time', { className: 'nds-clock' })
        )
      ),
      h('button', { className: 'nds-btn nds-subtle nds-icon-only nds-tooltip', 'data-tooltip-hover': '500', 'data-theme-toggle': '', title: 'Toggle dark mode', 'data-i18n-title': 'topbar.toggle_dark_mode', 'aria-label': 'Toggle dark mode', 'data-i18n-aria-label': 'topbar.toggle_dark_mode' },
        h('i', { className: 'nds-icon nds-hgi-moon-02', 'aria-hidden': 'true' })
      )
    )
  )

const mainNav =
  h('nav', { className: 'nds-main-nav nds-content-wrapper', id: 'nds-main-nav', 'aria-label': 'Primary navigation', 'data-i18n-aria-label': 'main-nav.primary_navigation' },
    h('div', { className: 'nds-nav-container' },
      h('a', { href: '../#/', className: 'nds-brand' },
        h('span', { className: 'nds-brand-name' }, 'Records Portal')
      ),
      h('ul', { className: 'nds-nav-minimal', hidden: true },
        h('li', { className: 'nds-nav-toggler nds-nav-item' },
          h('button', { type: 'button', className: 'nds-nav-link nds-btn nds-subtle nds-indicator', 'aria-label': 'Toggle navigation menu', 'data-i18n-aria-label': 'main-nav.toggle_menu', 'aria-expanded': 'false', 'aria-controls': 'nds-nav-collapse' },
            h('i', { className: 'nds-icon nds-hgi-menu-01', 'aria-hidden': 'true' })
          )
        )
      ),
      h('div', { className: 'nds-nav-collapse', id: 'nds-nav-collapse', hidden: true },
        h('div', { className: 'nds-nav-collapse-content' },
          h('ul', { className: 'nds-nav-primary' },
            h('li', { className: 'nds-nav-item' },
              h('a', { href: '../#/', className: 'nds-nav-link nds-btn nds-subtle nds-indicator' },
                h('span', { className: 'nds-label' }, 'Home')
              )
            ),
            h('li', { className: 'nds-nav-item' },
              h('a', { href: '../#/about', className: 'nds-nav-link nds-btn nds-subtle nds-indicator' },
                h('span', { className: 'nds-label' }, 'About')
              )
            ),
            h('li', { className: 'nds-nav-item' },
              h('a', { href: '../#/contact', className: 'nds-nav-link nds-btn nds-subtle nds-indicator' },
                h('span', { className: 'nds-label' }, 'Contact')
              )
            )
          ),
          h('div', { className: 'nds-nav-item nds-show-more' },
            h('button', { type: 'button', className: 'nds-nav-link nds-btn nds-subtle nds-indicator nds-full', title: 'Show more', 'data-i18n-title': 'scroll-more.show_more', 'aria-label': 'Show more', 'data-i18n-aria-label': 'scroll-more.show_more' },
              h('i', { className: 'nds-icon nds-hgi-arrow-down-01', 'aria-hidden': 'true' })
            )
          )
        )
      )
    )
  )

const sideMenu =
  h('aside', { className: 'nds-sidemenu', 'aria-label': 'Sidebar', 'data-i18n-aria-label': 'sidemenu.sidebar' },
    h('nav', { className: 'nds-drawer nds-divided' },
      h('button', { className: 'nds-sidemenu-toggle nds-btn nds-peek', 'aria-label': 'Sidebar Menu', 'data-i18n-aria-label': 'sidemenu.sidebar_menu', hidden: true },
        h('i', { className: 'nds-icon nds-hgi-menu-02', 'aria-hidden': 'true' }),
        h('span', { className: 'nds-label nds-truncate' }, 'Side menu')
      ),
      h('div', { className: 'nds-scroll-more nds-divided' },
        h('ul', { className: 'nds-drawer-list nds-scroll-more-content' },
          h('li', { 'data-state': 'active' },
            h('a', { className: 'nds-btn nds-subtle nds-indicator', href: '#/records' },
              h('i', { className: 'hgi hgi-stroke hgi-folder-01', 'aria-hidden': 'true' }),
              h('span', { className: 'nds-label' }, 'Records')
            )
          ),
          h('li', null,
            h('a', { className: 'nds-btn nds-subtle nds-indicator', href: '../#/reports' },
              h('i', { className: 'hgi hgi-stroke hgi-chart-histogram', 'aria-hidden': 'true' }),
              h('span', { className: 'nds-label' }, 'Reports')
            )
          ),
          h('li', null,
            h('a', { className: 'nds-btn nds-subtle nds-indicator', href: '../#/settings' },
              h('i', { className: 'hgi hgi-stroke hgi-settings-01', 'aria-hidden': 'true' }),
              h('span', { className: 'nds-label' }, 'Settings')
            )
          )
        ),
        h('button', { className: 'nds-show-more nds-btn nds-subtle', 'aria-label': 'Show more', 'data-i18n-aria-label': 'scroll-more.show_more' },
          h('i', { className: 'nds-icon nds-hgi-arrow-down-01', 'aria-hidden': 'true' })
        )
      )
    )
  )

const footer =
  h('footer', { className: 'nds-footer nds-content-wrapper nds-brand', role: 'contentinfo', 'aria-label': 'Site Footer', 'data-i18n-aria-label': 'footer.site_footer' },
    h('div', { className: 'nds-footer-bottom' },
      h('div', { className: 'nds-footer-meta' },
        h('div', { className: 'nds-footer-legal' },
          h('div', { className: 'nds-footer-copyright' },
            h('span', null, '© 2026 Records Portal')
          ),
          h('div', { className: 'nds-footer-policy' },
            h('button', { type: 'button', className: 'nds-link', 'data-cookies-toggle': '' },
              h('span', { className: 'nds-label' }, 'Cookie settings')
            )
          )
        )
      )
    )
  )

// The skip link's #main-content reads as a route under a hash router, so focus it directly.
function skipToMain(event) {
  event.preventDefault()
  document.getElementById('main-content').focus()
}

export default function Shell({ children }) {
  // One view for now. When a router swaps NDS pages, each page takes its own mount/destroy pair.
  useEffect(() => {
    const view = document.getElementById('root')
    window.NDS?.init.mount(view)
    return () => window.NDS?.init.destroy(view)
  }, [])

  return h(
    React.Fragment,
    null,
    h('a', { className: 'nds-skip-link', href: '#main-content', onClick: skipToMain }, 'Skip to main content'),
    h('header', null, topBar, mainNav),
    h(
      'main',
      null,
      h(
        'div',
        { className: 'nds-content-layout nds-has-sidemenu nds-rail nds-full-width' },
        sideMenu,
        h('div', { className: 'nds-content', id: 'main-content', tabIndex: -1 }, children)
      )
    ),
    footer
  )
}
