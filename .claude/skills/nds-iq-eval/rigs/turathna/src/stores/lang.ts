import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Lang, Localized } from '../types'

const STORAGE_KEY = 'turathna.lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'ar') return saved
  } catch {
    // storage can be blocked; fall through to the default
  }
  return 'en'
}

export const useLangStore = defineStore('lang', () => {
  const lang = ref<Lang>(initialLang())
  const dir = computed(() => (lang.value === 'ar' ? 'rtl' : 'ltr'))
  const locale = computed(() => (lang.value === 'ar' ? 'ar-SA-u-nu-latn-ca-gregory' : 'en-GB'))

  // Runs once at startup and again on every switch; no reload involved.
  watch(
    lang,
    (value) => {
      document.documentElement.lang = value
      document.documentElement.dir = value === 'ar' ? 'rtl' : 'ltr'
      try {
        localStorage.setItem(STORAGE_KEY, value)
      } catch {
        // ignore
      }
    },
    { immediate: true },
  )

  function setLang(value: Lang) {
    lang.value = value
  }
  function toggle() {
    lang.value = lang.value === 'en' ? 'ar' : 'en'
  }
  /** Pick the current language out of a bilingual field. */
  function pick(value: Localized) {
    return value[lang.value]
  }

  return { lang, dir, locale, setLang, toggle, pick }
})
