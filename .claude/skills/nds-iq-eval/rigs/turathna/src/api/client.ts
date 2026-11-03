import type {
  AboutContent,
  Channel,
  HomeContent,
  Indicator,
  KpiReport,
  NewsItem,
  Partner,
  Post,
  Proposal,
  RegionId,
  Site,
} from '../types'

export class ApiError extends Error {
  status: number
  code: string
  constructor(status: number, code: string, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

const base = import.meta.env.BASE_URL
const wait = () => new Promise<void>((r) => setTimeout(r, 300 + Math.random() * 300))

const cache = new Map<string, unknown>()

async function getJson<T>(file: string): Promise<T> {
  await wait()
  if (cache.has(file)) return cache.get(file) as T
  const res = await fetch(`${base}data/${file}`)
  if (!res.ok) throw new ApiError(res.status, 'http_error', `Could not load ${file}`)
  const json = (await res.json()) as T
  cache.set(file, json)
  return json
}

// --- KPI aggregation -------------------------------------------------------

interface KpiRegionRaw {
  sitesRestored: number
  jobsCreated: number
  visitorsPerMonth: number[]
  budget: Record<string, number>
  indicators: Omit<Indicator, 'status'>[]
}
interface KpiRaw {
  years: number[]
  regions: RegionId[]
  byYear: Record<string, Record<RegionId, KpiRegionRaw>>
}

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0)

function figuresFor(raw: KpiRaw, year: number, region: RegionId | 'all') {
  const data = raw.byYear[String(year)]
  const picked = region === 'all' ? raw.regions.map((r) => data[r]) : [data[region]]
  return {
    sitesRestored: sum(picked.map((p) => p.sitesRestored)),
    visitors: sum(picked.map((p) => sum(p.visitorsPerMonth))),
    budget: Math.round(sum(picked.flatMap((p) => Object.values(p.budget))) * 10) / 10,
    jobsCreated: sum(picked.map((p) => p.jobsCreated)),
  }
}

function statusOf(actual: number, target: number): Indicator['status'] {
  const ratio = target === 0 ? 1 : actual / target
  if (ratio >= 1) return 'achieved'
  return ratio >= 0.9 ? 'onTrack' : 'behind'
}

function buildReport(raw: KpiRaw, year: number, region: RegionId | 'all'): KpiReport {
  const data = raw.byYear[String(year)]
  const picked = region === 'all' ? raw.regions.map((r) => data[r]) : [data[region]]
  const categories = Object.keys(picked[0].budget)
  const indicators: Indicator[] = picked[0].indicators.map((first, idx) => {
    const rows = picked.map((p) => p.indicators[idx])
    // counts add up across regions, percentages average
    const agg = (f: 'target' | 'actual') =>
      first.unit === 'count' ? sum(rows.map((r) => r[f])) : Math.round(sum(rows.map((r) => r[f])) / rows.length)
    const target = agg('target')
    const actual = agg('actual')
    return { key: first.key, unit: first.unit, target, actual, status: statusOf(actual, target) }
  })
  return {
    year,
    region,
    figures: figuresFor(raw, year, region),
    previous: raw.byYear[String(year - 1)] ? figuresFor(raw, year - 1, region) : null,
    sitesByRegion: raw.regions.map((r) => ({ region: r, value: data[r].sitesRestored })),
    visitorsByMonth: Array.from({ length: 12 }, (_, m) => sum(picked.map((p) => p.visitorsPerMonth[m]))),
    budgetSplit: categories.map((category) => ({
      category,
      value: Math.round(sum(picked.map((p) => p.budget[category])) * 10) / 10,
    })),
    indicators,
  }
}

// --- Simulated accounts ----------------------------------------------------

const accounts: Record<string, { password: string; locked?: boolean; partner: Partner }> = {
  'partner@example.sa': {
    password: 'Turath#2026',
    partner: {
      name: 'Sara Al-Qahtani',
      email: 'partner@example.sa',
      organisation: { en: 'Najd Builders Association', ar: 'جمعية بنّائي نجد' },
    },
  },
  'locked@example.sa': {
    password: 'Turath#2026',
    locked: true,
    partner: {
      name: 'Omar Al-Shehri',
      email: 'locked@example.sa',
      organisation: { en: 'Asir Weavers Guild', ar: 'نقابة حائكي عسير' },
    },
  },
}

// --- Public API ------------------------------------------------------------

export const api = {
  async sites(): Promise<Site[]> {
    return (await getJson<{ sites: Site[] }>('sites.json')).sites
  },
  async news(): Promise<NewsItem[]> {
    return (await getJson<{ items: NewsItem[] }>('news.json')).items
  },
  async media(): Promise<{ channels: Channel[]; posts: Post[] }> {
    return getJson('media.json')
  },
  async home(): Promise<HomeContent> {
    return getJson('home.json')
  },
  async about(): Promise<AboutContent> {
    return (await getJson<{ about: AboutContent }>('pages.json')).about
  },
  async kpiOptions(): Promise<{ years: number[]; regions: RegionId[] }> {
    const raw = await getJson<KpiRaw>('kpis.json')
    return { years: raw.years, regions: raw.regions }
  },
  /** 2023 is still being reconciled upstream and answers 500. */
  async kpis(year: number, region: RegionId | 'all'): Promise<KpiReport> {
    const raw = await getJson<KpiRaw>('kpis.json')
    if (year === 2023) throw new ApiError(500, 'server_error', 'Internal server error')
    if (!raw.byYear[String(year)]) throw new ApiError(404, 'not_found', `No data for ${year}`)
    return buildReport(raw, year, region)
  },
  async proposals(): Promise<Proposal[]> {
    return (await getJson<{ proposals: Proposal[] }>('partners.json')).proposals
  },

  // simulated POST endpoints
  async signIn(email: string, password: string): Promise<{ token: string; partner: Partner }> {
    await wait()
    const account = accounts[email.trim().toLowerCase()]
    if (!account || account.password !== password) {
      throw new ApiError(401, 'invalid_credentials', 'invalid credentials')
    }
    if (account.locked) throw new ApiError(423, 'account_locked', 'account locked')
    return { token: `tok_${Math.random().toString(36).slice(2)}`, partner: account.partner }
  },
  async subscribe(email: string): Promise<{ ok: true }> {
    await wait()
    if (email.trim().toLowerCase().endsWith('@fail.test')) {
      throw new ApiError(500, 'server_error', 'Subscription failed')
    }
    return { ok: true }
  },
}
