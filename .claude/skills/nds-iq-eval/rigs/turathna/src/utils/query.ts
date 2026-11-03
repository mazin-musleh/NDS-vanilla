import type { LocationQuery } from 'vue-router'

/** First value of a query param, or '' when absent. */
export function one(value: LocationQuery[string] | undefined): string {
  const v = Array.isArray(value) ? value[0] : value
  return v ?? ''
}

/** Positive integer from a query param, with a fallback. */
export function pageNumber(value: LocationQuery[string] | undefined, fallback = 1): number {
  const n = parseInt(one(value), 10)
  return Number.isFinite(n) && n > 0 ? n : fallback
}

/** True when the known keys of a route query match the wanted query. */
export function sameQuery(wanted: Record<string, string>, current: LocationQuery, keys: string[]): boolean {
  return keys.every((k) => (wanted[k] ?? '') === one(current[k]))
}
