<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCopy } from '../composables/useCopy'
import { useKpisStore } from '../stores/kpis'
import { sameQuery } from '../utils/query'

defineOptions({ name: 'KpisView' })

const { t } = useCopy()
const route = useRoute()
const router = useRouter()
const kpis = useKpisStore()

// This view is kept alive, so ignore route changes that belong to other pages.
watch(
  () => route.query,
  (query) => {
    if (route.name === 'kpis') kpis.fromQuery(query)
  },
  { immediate: true },
)
watch(
  () => kpis.toQuery,
  (query) => {
    if (route.name === 'kpis' && !sameQuery(query, route.query, ['year', 'region'])) router.replace({ query })
  },
)
watch(() => [kpis.year, kpis.region], kpis.load)
kpis.load()

const dump = computed(() =>
  JSON.stringify(
    {
      filters: { year: kpis.year, region: kpis.region, years: kpis.years, regions: kpis.regions },
      status: kpis.status,
      error: kpis.error,
      report: kpis.report,
    },
    null,
    2,
  ),
)
</script>

<template>
  <div>
    <!-- UI: see BRIEF.md -->
    <h1>{{ t('kpis.title') }}</h1>
    <pre>{{ dump }}</pre>
  </div>
</template>
