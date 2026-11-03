<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCopy } from '../composables/useCopy'
import { useSitesStore } from '../stores/sites'
import { sameQuery } from '../utils/query'

defineOptions({ name: 'SitesView' })

const { t } = useCopy()
const route = useRoute()
const router = useRouter()
const sites = useSitesStore()
sites.load()

// This view is kept alive, so ignore route changes that belong to other pages.
watch(
  () => route.query,
  (query) => {
    if (route.name === 'sites') sites.fromQuery(query)
  },
  { immediate: true },
)
watch(
  () => sites.toQuery,
  (query) => {
    if (route.name === 'sites' && !sameQuery(query, route.query, ['q', 'region', 'type', 'unesco', 'view'])) {
      router.replace({ query })
    }
  },
)

const dump = computed(() =>
  JSON.stringify(
    {
      filters: { q: sites.q, region: sites.region, type: sites.type, unesco: sites.unesco, view: sites.view },
      status: sites.status,
      total: sites.filtered.length,
      page: sites.page,
      pageCount: sites.pageCount,
      sites: sites.paged,
    },
    null,
    2,
  ),
)
</script>

<template>
  <div>
    <!-- UI: see BRIEF.md -->
    <h1>{{ t('sites.title') }}</h1>
    <pre>{{ dump }}</pre>
  </div>
</template>
