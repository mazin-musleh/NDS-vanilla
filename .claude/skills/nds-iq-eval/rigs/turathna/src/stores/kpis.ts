import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { LocationQuery } from 'vue-router'
import { api, ApiError } from '../api/client'
import { one } from '../utils/query'
import type { KpiReport, LoadStatus, RegionId } from '../types'

const DEFAULT_YEAR = 2025

export const useKpisStore = defineStore('kpis', () => {
  const years = ref<number[]>([2023, 2024, 2025, 2026])
  const regions = ref<RegionId[]>(['central', 'western', 'eastern', 'northern', 'southern'])
  const year = ref(DEFAULT_YEAR)
  const region = ref<RegionId | 'all'>('all')

  const report = ref<KpiReport | null>(null)
  const status = ref<LoadStatus>('idle')
  const error = ref<{ status: number; message: string } | null>(null)

  let request = 0

  /** Load the report for the current year and region. The latest call wins. */
  async function load() {
    const mine = ++request
    status.value = 'loading'
    error.value = null
    try {
      const [options, data] = await Promise.all([api.kpiOptions(), api.kpis(year.value, region.value)])
      if (mine !== request) return
      years.value = options.years
      regions.value = options.regions
      report.value = data
      status.value = 'ready'
    } catch (e) {
      if (mine !== request) return
      report.value = null
      error.value = e instanceof ApiError ? { status: e.status, message: e.message } : { status: 0, message: 'Network error' }
      status.value = 'error'
    }
  }
  const retry = load

  function fromQuery(query: LocationQuery) {
    const y = parseInt(one(query.year), 10)
    year.value = years.value.includes(y) ? y : DEFAULT_YEAR
    const r = one(query.region)
    region.value = (regions.value as string[]).includes(r) ? (r as RegionId) : 'all'
  }
  /** The filters as a URL query; defaults are left out. */
  const toQuery = computed(() => {
    const out: Record<string, string> = {}
    if (year.value !== DEFAULT_YEAR) out.year = String(year.value)
    if (region.value !== 'all') out.region = region.value
    return out
  })

  return { years, regions, year, region, report, status, error, toQuery, load, retry, fromQuery }
})
