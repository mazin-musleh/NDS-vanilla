<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useCopy } from '../composables/useCopy'

defineOptions({ name: 'NotFoundView' })

const { t } = useCopy()
const route = useRoute()
</script>

<template>
  <div>
    <!-- UI: see BRIEF.md -->
    <h1>{{ t('notFound.title') }}</h1>
    <pre>{{ route.fullPath }}</pre>
  </div>
</template>
