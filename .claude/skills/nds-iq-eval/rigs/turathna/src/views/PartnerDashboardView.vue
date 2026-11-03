<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCopy } from '../composables/useCopy'
import { useAuthStore } from '../stores/auth'
import { useSitesStore } from '../stores/sites'

defineOptions({ name: 'PartnerDashboardView' })

const { t } = useCopy()
const router = useRouter()
const auth = useAuthStore()
const sites = useSitesStore()

onMounted(() => {
  auth.loadProposals()
  sites.load() // proposals refer to sites by id
})

/** Called by the sign-out button. */
async function signOut() {
  auth.signOut()
  await router.replace({ name: 'partner-sign-in' })
}
void signOut

const dump = computed(() =>
  JSON.stringify(
    {
      partner: auth.partner,
      status: auth.proposalsStatus,
      proposals: auth.proposals.map((p) => ({ ...p, site: p.siteId ? sites.byId(p.siteId)?.name : null })),
    },
    null,
    2,
  ),
)
</script>

<template>
  <div>
    <!-- UI: see BRIEF.md -->
    <h1>{{ t('partners.dashboardTitle') }}</h1>
    <pre>{{ dump }}</pre>
  </div>
</template>
