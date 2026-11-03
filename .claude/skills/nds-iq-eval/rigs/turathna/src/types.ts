export type Lang = 'en' | 'ar'
export type LoadStatus = 'idle' | 'loading' | 'ready' | 'error'
export type Localized = Record<Lang, string>

export type RegionId = 'central' | 'western' | 'eastern' | 'northern' | 'southern'
export type SiteType =
  | 'fort'
  | 'palace'
  | 'oasis'
  | 'rock-art'
  | 'old-town'
  | 'archaeological'
  | 'port'
  | 'village'

export type Day = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'

export interface GalleryImage {
  src: string
  width: number
  height: number
  alt: Localized
}

export interface Site {
  id: string
  name: Localized
  region: RegionId
  type: SiteType
  unesco: boolean
  restoredYear: number
  coordinates: { lat: number; lng: number }
  cover: string
  summary: Localized
  description: Localized
  visiting: {
    hours: { days: Day[]; open: string; close: string }[]
    closedOn: Day[]
    note: Localized
  }
  tickets:
    | { free: true; currency: string; note: Localized }
    | {
        free: false
        currency: string
        adult: number
        child: number
        student: number
        under6Free: boolean
        note: Localized
      }
  gallery: GalleryImage[]
}

export type SiteView = 'grid' | 'list'

export interface NewsItem {
  slug: string
  date: string
  category: string
  image: string
  title: Localized
  summary: Localized
  body: Record<Lang, string[]>
}

export interface Channel {
  id: string
  name: string
  handle: string
  url: string
  followers: number
}

export interface Post {
  id: string
  channel: string
  date: string
  image: string | null
  text: Localized
  engagement: number
  url: string
}

export interface Person {
  id: string
  name: Localized
  role: Localized
  bio: Localized
  photo: string
}

export interface AboutContent {
  vision: Localized
  mission: Localized
  values: { key: string; title: Localized; text: Localized }[]
  goals: { id: string; title: Localized; text: Localized }[]
  leadership: Person[]
  structure: { id: string; name: Localized; text: Localized }[]
  milestones: { year: number; title: Localized; text: Localized }[]
}

export interface ProgramEvent {
  id: string
  date: string
  title: Localized
  place: Localized
  siteId: string | null
  free: boolean
}

export interface PartnerLogo {
  id: string
  name: Localized
  logo: string
}

export interface HomeContent {
  hero: { image: string }
  figures: { key: string; value: number }[]
  featuredSiteIds: string[]
  events: ProgramEvent[]
  partnerLogos: PartnerLogo[]
}

export type IndicatorStatus = 'achieved' | 'onTrack' | 'behind'

export interface Indicator {
  key: string
  unit: 'count' | 'percent'
  target: number
  actual: number
  status: IndicatorStatus
}

export interface KpiFigures {
  sitesRestored: number
  visitors: number
  budget: number
  jobsCreated: number
}

export interface KpiReport {
  year: number
  region: RegionId | 'all'
  figures: KpiFigures
  /** Same figures for the year before, or null for the first year on record. */
  previous: KpiFigures | null
  sitesByRegion: { region: RegionId; value: number }[]
  visitorsByMonth: number[]
  budgetSplit: { category: string; value: number }[]
  indicators: Indicator[]
}

export type ProposalStatus = 'draft' | 'submitted' | 'underReview' | 'needsInfo' | 'approved' | 'rejected'

export interface Proposal {
  id: string
  title: Localized
  siteId: string | null
  submitted: string
  updated: string
  status: ProposalStatus
  amountSar: number
  nextStep: Localized
}

export interface Partner {
  name: string
  organisation: Localized
  email: string
}

export type SearchType = 'all' | 'sites' | 'news' | 'posts'

export interface SearchHit {
  type: Exclude<SearchType, 'all'>
  id: string
  title: Localized
  summary: Localized
  image: string | null
  /** Router path of the result. */
  to: string
  date?: string
}
