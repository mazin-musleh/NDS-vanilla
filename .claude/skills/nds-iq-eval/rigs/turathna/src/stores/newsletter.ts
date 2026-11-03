import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../api/client'

export type NewsletterError = 'invalid' | 'failed' | null

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const useNewsletterStore = defineStore('newsletter', () => {
  const email = ref('')
  const status = ref<'idle' | 'sending' | 'done' | 'error'>('idle')
  /** Maps to copy keys newsletter.invalid and newsletter.failed. */
  const error = ref<NewsletterError>(null)

  async function subscribe() {
    if (status.value === 'sending') return
    if (!EMAIL.test(email.value.trim())) {
      status.value = 'error'
      error.value = 'invalid'
      return
    }
    status.value = 'sending'
    error.value = null
    try {
      await api.subscribe(email.value)
      status.value = 'done'
      email.value = ''
    } catch {
      status.value = 'error'
      error.value = 'failed'
    }
  }
  function reset() {
    email.value = ''
    status.value = 'idle'
    error.value = null
  }

  return { email, status, error, subscribe, reset }
})
