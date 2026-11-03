import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { api, ApiError } from '../api/client'
import type { LoadStatus, Partner, Proposal } from '../types'

const KEY = 'turathna.session'

export type SignInError = 'required' | 'invalid' | 'locked' | 'network' | null

interface Session {
  token: string
  partner: Partner
}

function readSession(): Session | null {
  for (const store of [sessionStorage, localStorage]) {
    try {
      const raw = store.getItem(KEY)
      if (raw) return JSON.parse(raw) as Session
    } catch {
      // storage blocked or malformed; treat as signed out
    }
  }
  return null
}

export const useAuthStore = defineStore('auth', () => {
  const session = ref<Session | null>(readSession())
  const status = ref<'idle' | 'signing-in' | 'error'>('idle')
  /** Maps to copy keys partners.errors.*. */
  const error = ref<SignInError>(null)

  const isSignedIn = computed(() => !!session.value)
  const partner = computed(() => session.value?.partner ?? null)

  const proposals = ref<Proposal[]>([])
  const proposalsStatus = ref<LoadStatus>('idle')

  async function signIn(email: string, password: string, remember = false) {
    if (!email.trim() || !password) {
      status.value = 'error'
      error.value = 'required'
      return false
    }
    status.value = 'signing-in'
    error.value = null
    try {
      const result = await api.signIn(email, password)
      session.value = result
      try {
        ;(remember ? localStorage : sessionStorage).setItem(KEY, JSON.stringify(result))
      } catch {
        // the session still works until the tab closes
      }
      status.value = 'idle'
      return true
    } catch (e) {
      status.value = 'error'
      if (e instanceof ApiError) error.value = e.code === 'account_locked' ? 'locked' : 'invalid'
      else error.value = 'network'
      return false
    }
  }

  function signOut() {
    session.value = null
    proposals.value = []
    proposalsStatus.value = 'idle'
    for (const store of [sessionStorage, localStorage]) {
      try {
        store.removeItem(KEY)
      } catch {
        // ignore
      }
    }
  }

  async function loadProposals() {
    if (!session.value) return
    proposalsStatus.value = 'loading'
    try {
      proposals.value = await api.proposals()
      proposalsStatus.value = 'ready'
    } catch {
      proposalsStatus.value = 'error'
    }
  }

  function clearError() {
    error.value = null
    status.value = 'idle'
  }

  return { session, status, error, isSignedIn, partner, proposals, proposalsStatus, signIn, signOut, loadProposals, clearError }
})
