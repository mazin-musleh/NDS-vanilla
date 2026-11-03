<script setup lang="ts">
import { computed } from 'vue'
import { useCopy } from '../composables/useCopy'
import { useContentStore } from '../stores/content'

defineOptions({ name: 'AboutView' })

const { t } = useCopy()
const content = useContentStore()
content.loadAbout()

const dump = computed(() => JSON.stringify({ status: content.aboutStatus, about: content.about }, null, 2))
</script>

<template>
  <div>
    <!-- UI: see BRIEF.md -->
    <h1>{{ t('about.title') }}</h1>
    <pre>{{ dump }}</pre>
  </div>
</template>
