<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCopy } from '../composables/useCopy'
import { useSearchStore } from '../stores/search'

defineOptions({ name: 'SearchView' })

const { t } = useCopy()
const route = useRoute()
const search = useSearchStore()

// /search?q=&type=&page= drives the store; a form only needs to change the query.
watch(() => route.query, (query) => search.fromQuery(query), { immediate: true })

const dump = computed(() =>
  JSON.stringify(
    {
      q: search.q,
      type: search.type,
      page: search.page,
      pageCount: search.pageCount,
      status: search.status,
      counts: search.counts,
      results: search.paged,
    },
    null,
    2,
  ),
)
</script>

<template>
  <div>
    <!-- UI: see BRIEF.md -->
    <h1>{{ t('search.title') }}</h1>
    <pre>{{ dump }}</pre>
  </div>
</template>
