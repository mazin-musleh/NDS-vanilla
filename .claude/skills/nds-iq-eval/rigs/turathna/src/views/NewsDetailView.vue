<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCopy } from '../composables/useCopy'
import { useNewsStore } from '../stores/news'
import { showNotFound } from '../utils/notFound'

defineOptions({ name: 'NewsDetailView' })

const props = defineProps<{ slug: string }>()

const { t, tr } = useCopy()
const route = useRoute()
const router = useRouter()
const news = useNewsStore()
news.load()

const article = computed(() => news.bySlug(props.slug))
const neighbours = computed(() => news.neighbours(props.slug))

// Unknown slug: show the 404 page once the list has loaded.
watch(
  () => [news.status, props.slug] as const,
  ([status]) => {
    if (status === 'ready' && !article.value) showNotFound(router, route)
  },
  { immediate: true },
)

const dump = computed(() => JSON.stringify({ status: news.status, article: article.value, ...neighbours.value }, null, 2))
</script>

<template>
  <div>
    <!-- UI: see BRIEF.md -->
    <h1>{{ article ? tr(article.title) : t('states.loading') }}</h1>
    <pre>{{ dump }}</pre>
  </div>
</template>
