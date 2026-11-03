import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../api/client'
import type { LoadStatus, NewsItem } from '../types'

export const useNewsStore = defineStore('news', () => {
  const items = ref<NewsItem[]>([])
  const status = ref<LoadStatus>('idle')
  const page = ref(1)
  const pageSize = 6

  async function load() {
    if (status.value === 'ready' || status.value === 'loading') return
    status.value = 'loading'
    try {
      const all = await api.news()
      items.value = [...all].sort((a, b) => b.date.localeCompare(a.date))
      status.value = 'ready'
    } catch {
      status.value = 'error'
    }
  }

  const pageCount = computed(() => Math.max(1, Math.ceil(items.value.length / pageSize)))
  const paged = computed(() => {
    const start = (Math.min(page.value, pageCount.value) - 1) * pageSize
    return items.value.slice(start, start + pageSize)
  })
  const latest = computed(() => items.value.slice(0, 3))

  function bySlug(slug: string) {
    return items.value.find((n) => n.slug === slug)
  }
  /** Items on either side of an article, newest first. */
  function neighbours(slug: string) {
    const i = items.value.findIndex((n) => n.slug === slug)
    return { newer: i > 0 ? items.value[i - 1] : undefined, older: i >= 0 ? items.value[i + 1] : undefined }
  }

  return { items, status, page, pageSize, pageCount, paged, latest, load, bySlug, neighbours }
})
