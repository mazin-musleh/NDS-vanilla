import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

declare module 'vue-router' {
  interface RouteMeta {
    /** Copy key for the document title. */
    titleKey?: string
    requiresAuth?: boolean
  }
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue'), meta: { titleKey: 'nav.home' } },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue'), meta: { titleKey: 'nav.about' } },
    // /kpis?year=&region=
    { path: '/kpis', name: 'kpis', component: () => import('../views/KpisView.vue'), meta: { titleKey: 'nav.kpis' } },
    // /sites?q=&region=&type=&unesco=&view=grid|list
    { path: '/sites', name: 'sites', component: () => import('../views/SitesView.vue'), meta: { titleKey: 'nav.sites' } },
    { path: '/sites/:id', name: 'site-detail', component: () => import('../views/SiteDetailView.vue'), props: true },
    // /news?page=
    { path: '/news', name: 'news', component: () => import('../views/NewsView.vue'), meta: { titleKey: 'nav.news' } },
    { path: '/news/:slug', name: 'news-detail', component: () => import('../views/NewsDetailView.vue'), props: true },
    { path: '/media', name: 'media', component: () => import('../views/MediaView.vue'), meta: { titleKey: 'nav.media' } },
    // /search?q=&type=&page=
    { path: '/search', name: 'search', component: () => import('../views/SearchView.vue'), meta: { titleKey: 'nav.search' } },
    {
      path: '/partners/sign-in',
      name: 'partner-sign-in',
      component: () => import('../views/PartnerSignInView.vue'),
      meta: { titleKey: 'partners.signInTitle' },
    },
    {
      path: '/partners',
      name: 'partner-dashboard',
      component: () => import('../views/PartnerDashboardView.vue'),
      meta: { titleKey: 'partners.dashboardTitle', requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: { titleKey: 'notFound.title' },
    },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    // filters and paging on the same page keep their scroll position
    if (to.name === from.name && to.path === from.path) return false
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isSignedIn) {
    return { name: 'partner-sign-in', query: { redirect: to.fullPath } }
  }
  if (to.name === 'partner-sign-in' && auth.isSignedIn) return { name: 'partner-dashboard' }
})
