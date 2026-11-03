<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCopy } from '../composables/useCopy'
import { useAuthStore } from '../stores/auth'
import { one } from '../utils/query'

defineOptions({ name: 'PartnerSignInView' })

const { t } = useCopy()
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

// Where to go after signing in: the page that sent the visitor here, else the dashboard.
const redirectTo = computed(() => one(route.query.redirect) || '/partners')

/** Called by the form's submit handler. Resolves true after navigating on success. */
async function submit(email: string, password: string, remember = false) {
  if (!(await auth.signIn(email, password, remember))) return false
  await router.replace(redirectTo.value)
  return true
}
void submit

const dump = computed(() =>
  JSON.stringify({ status: auth.status, error: auth.error, redirectTo: redirectTo.value, signedIn: auth.isSignedIn }, null, 2),
)
</script>

<template>
  <div>
    <!-- UI: see BRIEF.md -->
    <h1>{{ t('partners.signInTitle') }}</h1>
    <pre>{{ dump }}</pre>
  </div>
</template>
