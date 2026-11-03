import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'

/** Show the 404 page while keeping the address the visitor asked for. */
export function showNotFound(router: Router, route: RouteLocationNormalizedLoaded) {
  return router.replace({
    name: 'not-found',
    params: { pathMatch: route.path.split('/').filter(Boolean) },
    query: route.query,
    hash: route.hash,
  })
}
