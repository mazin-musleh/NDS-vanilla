<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCopy } from '../composables/useCopy'
import { useNewsStore } from '../stores/news'
import { pageNumber } from '../utils/query'

defineOptions({ name: 'NewsView' })

const { t } = useCopy()
const route = useRoute()
const news = useNewsStore()
news.load()

// /news?page= drives the store; paging links only need to change the query.
watch(() => route.query.page, (page) => (news.page = pageNumber(page)), { immediate: true })

const dump = computed(() =>
  JSON.stringify({ status: news.status, page: news.page, pageCount: news.pageCount, items: news.paged }, null, 2),
)
</script>

<template>
  <div>
    <!-- UI: see BRIEF.md -->
    <h1>{{ t('news.title') }}</h1>
    <pre>{{ dump }}</pre>
  </div>
</template>
