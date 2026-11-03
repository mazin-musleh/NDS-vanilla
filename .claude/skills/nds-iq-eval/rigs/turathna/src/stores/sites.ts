import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { LocationQuery } from 'vue-router'
import { api } from '../api/client'
import { one } from '../utils/query'
import type { LoadStatus, RegionId, Site, SiteType, SiteView } from '../types'

export const useSitesStore = defineStore('sites', () => {
  const items = ref<Site[]>([])
  const status = ref<LoadStatus>('idle')

  // List filters. The /sites view keeps these and the URL query in step.
  const q = ref('')
  const region = ref<RegionId | 'all'>('all')
  const type = ref<SiteType | 'all'>('all')
  const unesco = ref(false)
  const view = ref<SiteView>('grid')
  const page = ref(1)
  const pageSize = 9

  async function load() {
    if (status.value === 'ready' || status.value === 'loading') return
    status.value = 'loading'
    try {
      items.value = await api.sites()
      status.value = 'ready'
    } catch {
      status.value = 'error'
    }
  }

  const filtered = computed(() => {
    const needle = q.value.trim().toLowerCase()
    return items.value.filter((s) => {
      if (region.value !== 'all' && s.region !== region.value) return false
      if (type.value !== 'all' && s.type !== type.value) return false
      if (unesco.value && !s.unesco) return false
      if (!needle) return true
      return [s.name.en, s.name.ar, s.summary.en, s.summary.ar, s.description.en, s.description.ar]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    })
  })
  const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
  const paged = computed(() => {
    const start = (Math.min(page.value, pageCount.value) - 1) * pageSize
    return filtered.value.slice(start, start + pageSize)
  })
  const hasFilters = computed(() => !!q.value.trim() || region.value !== 'all' || type.value !== 'all' || unesco.value)

  // Any filter change starts again from page 1.
  watch([q, region, type, unesco], () => {
    page.value = 1
  })

  function byId(id: string) {
    return items.value.find((s) => s.id === id)
  }
  /** Same region first, then same type; never the site itself. */
  function related(id: string, count = 3) {
    const site = byId(id)
    if (!site) return []
    return items.value
      .filter((s) => s.id !== id)
      .map((s) => ({ s, score: (s.region === site.region ? 2 : 0) + (s.type === site.type ? 1 : 0) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map((x) => x.s)
  }

  function resetFilters() {
    q.value = ''
    region.value = 'all'
    type.value = 'all'
    unesco.value = false
  }

  /** Read /sites?q=&region=&type=&unesco=&view= into the filters. */
  function fromQuery(query: LocationQuery) {
    q.value = one(query.q)
    const r = one(query.region)
    region.value = (['central', 'western', 'eastern', 'northern', 'southern'].includes(r) ? r : 'all') as RegionId | 'all'
    const tp = one(query.type)
    type.value = (tp || 'all') as SiteType | 'all'
    unesco.value = one(query.unesco) === '1' || one(query.unesco) === 'true'
    view.value = one(query.view) === 'list' ? 'list' : 'grid'
  }
  /** The filters as a URL query; defaults are left out. */
  const toQuery = computed(() => {
    const out: Record<string, string> = {}
    if (q.value.trim()) out.q = q.value.trim()
    if (region.value !== 'all') out.region = region.value
    if (type.value !== 'all') out.type = type.value
    if (unesco.value) out.unesco = '1'
    if (view.value !== 'grid') out.view = view.value
    return out
  })

  return {
    items, status, q, region, type, unesco, view, page, pageSize,
    filtered, paged, pageCount, hasFilters, toQuery,
    load, byId, related, resetFilters, fromQuery,
  }
})
