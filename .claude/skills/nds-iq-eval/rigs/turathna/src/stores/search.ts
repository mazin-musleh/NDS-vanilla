import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { LocationQuery } from 'vue-router'
import { api } from '../api/client'
import { one, pageNumber } from '../utils/query'
import type { LoadStatus, SearchHit, SearchType } from '../types'

const TYPES: SearchType[] = ['all', 'sites', 'news', 'posts']

export const useSearchStore = defineStore('search', () => {
  const q = ref('')
  const type = ref<SearchType>('all')
  const page = ref(1)
  const pageSize = 8

  /** Every hit for the current query, across all types. */
  const allHits = ref<SearchHit[]>([])
  const status = ref<LoadStatus>('idle')

  const hits = computed(() => (type.value === 'all' ? allHits.value : allHits.value.filter((h) => h.type === type.value)))
  const counts = computed(() => ({
    all: allHits.value.length,
    sites: allHits.value.filter((h) => h.type === 'sites').length,
    news: allHits.value.filter((h) => h.type === 'news').length,
    posts: allHits.value.filter((h) => h.type === 'posts').length,
  }))
  const pageCount = computed(() => Math.max(1, Math.ceil(hits.value.length / pageSize)))
  const paged = computed(() => {
    const start = (Math.min(page.value, pageCount.value) - 1) * pageSize
    return hits.value.slice(start, start + pageSize)
  })

  /** Search sites, news and posts in both languages for the current q. Needs two letters. */
  async function run() {
    const needle = q.value.trim().toLowerCase()
    if (needle.length < 2) {
      allHits.value = []
      status.value = 'idle'
      return
    }
    status.value = 'loading'
    try {
      const [sites, news, media] = await Promise.all([api.sites(), api.news(), api.media()])
      if (needle !== q.value.trim().toLowerCase()) return // a newer search replaced this one
      const has = (...parts: string[]) => parts.join(' ').toLowerCase().includes(needle)
      allHits.value = [
        ...sites
          .filter((s) => has(s.name.en, s.name.ar, s.summary.en, s.summary.ar, s.description.en, s.description.ar))
          .map<SearchHit>((s) => ({ type: 'sites', id: s.id, title: s.name, summary: s.summary, image: s.cover, to: `/sites/${s.id}` })),
        ...news
          .filter((n) => has(n.title.en, n.title.ar, n.summary.en, n.summary.ar, ...n.body.en, ...n.body.ar))
          .map<SearchHit>((n) => ({ type: 'news', id: n.slug, title: n.title, summary: n.summary, image: n.image, to: `/news/${n.slug}`, date: n.date })),
        ...media.posts
          .filter((p) => has(p.text.en, p.text.ar))
          .map<SearchHit>((p) => ({ type: 'posts', id: p.id, title: p.text, summary: p.text, image: p.image, to: '/media', date: p.date })),
      ]
      status.value = 'ready'
    } catch {
      status.value = 'error'
    }
  }

  /** Read /search?q=&type=&page= into the state, then search. */
  async function fromQuery(query: LocationQuery) {
    const nextQ = one(query.q)
    const t = one(query.type) as SearchType
    type.value = TYPES.includes(t) ? t : 'all'
    page.value = pageNumber(query.page)
    if (nextQ !== q.value || status.value === 'idle') {
      q.value = nextQ
      await run()
    }
  }
  /** The state as a URL query; defaults are left out. */
  const toQuery = computed(() => {
    const out: Record<string, string> = {}
    if (q.value.trim()) out.q = q.value.trim()
    if (type.value !== 'all') out.type = type.value
    if (page.value > 1) out.page = String(page.value)
    return out
  })

  return { q, type, page, pageSize, allHits, status, hits, counts, pageCount, paged, toQuery, run, fromQuery }
})
