<script setup lang="ts">
import { computed } from 'vue'
import { useCopy } from '../composables/useCopy'
import { useMediaStore } from '../stores/media'

defineOptions({ name: 'MediaView' })

const { t } = useCopy()
const media = useMediaStore()
media.load()

const dump = computed(() =>
  JSON.stringify({ status: media.status, channel: media.channel, channels: media.channels, posts: media.visiblePosts }, null, 2),
)
</script>

<template>
  <div>
    <!-- UI: see BRIEF.md -->
    <h1>{{ t('media.title') }}</h1>
    <pre>{{ dump }}</pre>
  </div>
</template>
