import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { en } from '../copy/en'
import { ar } from '../copy/ar'
import { useLangStore } from '../stores/lang'
import type { Localized } from '../types'

type Params = Record<string, string | number>

/** UI strings, bilingual data fields and number/date formatting, all following the lang store. */
export function useCopy() {
  const langStore = useLangStore()
  const { lang, dir, locale } = storeToRefs(langStore)
  const copy = computed(() => (lang.value === 'ar' ? ar : en))

  /** t('kpis.figures.sitesRestored'), t('common.page', { n: 2 }). Unknown keys return the key. */
  function t(path: string, params?: Params): string {
    let node: unknown = copy.value
    for (const part of path.split('.')) {
      if (node && typeof node === 'object' && part in node) node = (node as Record<string, unknown>)[part]
      else return path
    }
    if (typeof node !== 'string') return path
    return params ? node.replace(/\{(\w+)\}/g, (_, k: string) => String(params[k] ?? `{${k}}`)) : node
  }

  /** Pick the current language out of a bilingual data field. */
  const tr = (value: Localized) => value[lang.value]

  const num = (n: number, opts?: Intl.NumberFormatOptions) => new Intl.NumberFormat(locale.value, opts).format(n)
  const compact = (n: number) => num(n, { notation: 'compact', maximumFractionDigits: 1 })
  const date = (iso: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) =>
    new Intl.DateTimeFormat(locale.value, opts).format(new Date(iso))

  return { lang, dir, copy, t, tr, num, compact, date }
}
