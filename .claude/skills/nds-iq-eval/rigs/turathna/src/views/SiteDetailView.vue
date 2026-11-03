<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCopy } from '../composables/useCopy'
import { useSitesStore } from '../stores/sites'
import { showNotFound } from '../utils/notFound'

defineOptions({ name: 'SiteDetailView' })

const props = defineProps<{ id: string }>()

const { t, tr } = useCopy()
const route = useRoute()
const router = useRouter()
const sites = useSitesStore()
sites.load()

const site = computed(() => sites.byId(props.id))
const related = computed(() => sites.related(props.id))

// Unknown id: show the 404 page once the list has loaded.
watch(
  () => [sites.status, props.id] as const,
  ([status]) => {
    if (status === 'ready' && !site.value) showNotFound(router, route)
  },
  { immediate: true },
)

const dump = computed(() => JSON.stringify({ status: sites.status, site: site.value, related: related.value }, null, 2))
</script>

<template>
  <div>
    <!-- UI: see BRIEF.md -->
    <h1>{{ site ? tr(site.name) : t('states.loading') }}</h1>
    <pre>{{ dump }}</pre>
  </div>
</template>
