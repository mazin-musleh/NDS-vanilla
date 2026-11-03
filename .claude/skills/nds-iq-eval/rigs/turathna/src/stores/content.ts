import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../api/client'
import type { AboutContent, HomeContent, LoadStatus } from '../types'

/** Editorial content that is not a list: the home page blocks and the About page. */
export const useContentStore = defineStore('content', () => {
  const home = ref<HomeContent | null>(null)
  const homeStatus = ref<LoadStatus>('idle')
  const about = ref<AboutContent | null>(null)
  const aboutStatus = ref<LoadStatus>('idle')

  async function loadHome() {
    if (homeStatus.value === 'ready' || homeStatus.value === 'loading') return
    homeStatus.value = 'loading'
    try {
      home.value = await api.home()
      homeStatus.value = 'ready'
    } catch {
      homeStatus.value = 'error'
    }
  }
  async function loadAbout() {
    if (aboutStatus.value === 'ready' || aboutStatus.value === 'loading') return
    aboutStatus.value = 'loading'
    try {
      about.value = await api.about()
      aboutStatus.value = 'ready'
    } catch {
      aboutStatus.value = 'error'
    }
  }

  return { home, homeStatus, about, aboutStatus, loadHome, loadAbout }
})
