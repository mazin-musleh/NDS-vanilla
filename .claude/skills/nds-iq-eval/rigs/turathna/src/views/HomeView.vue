<script setup lang="ts">
import { computed } from 'vue'
import { useCopy } from '../composables/useCopy'
import { useContentStore } from '../stores/content'
import { useSitesStore } from '../stores/sites'
import { useNewsStore } from '../stores/news'
import { useNewsletterStore } from '../stores/newsletter'

defineOptions({ name: 'HomeView' })

const { t } = useCopy()
const content = useContentStore()
const sites = useSitesStore()
const news = useNewsStore()
const newsletter = useNewsletterStore()

content.loadHome()
sites.load()
news.load()

const featured = computed(() =>
  (content.home?.featuredSiteIds ?? []).map((id) => sites.byId(id)).filter((s) => !!s),
)

const dump = computed(() =>
  JSON.stringify(
    {
      status: { home: content.homeStatus, sites: sites.status, news: news.status },
      hero: content.home?.hero,
      figures: content.home?.figures,
      featured: featured.value,
      latestNews: news.latest,
      events: content.home?.events,
      partnerLogos: content.home?.partnerLogos,
      newsletter: { email: newsletter.email, status: newsletter.status, error: newsletter.error },
    },
    null,
    2,
  ),
)
</script>

<template>
  <div>
    <!-- UI: see BRIEF.md -->
    <h1>{{ t('home.title') }}</h1>
    <pre>{{ dump }}</pre>
  </div>
</template>
