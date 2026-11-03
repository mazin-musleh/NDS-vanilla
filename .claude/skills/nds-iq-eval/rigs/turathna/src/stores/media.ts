import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../api/client'
import type { Channel, LoadStatus, Post } from '../types'

export const useMediaStore = defineStore('media', () => {
  const channels = ref<Channel[]>([])
  const posts = ref<Post[]>([])
  const status = ref<LoadStatus>('idle')
  /** Channel filter for the post list; 'all' shows every channel. */
  const channel = ref<string>('all')

  async function load() {
    if (status.value === 'ready' || status.value === 'loading') return
    status.value = 'loading'
    try {
      const data = await api.media()
      channels.value = data.channels
      posts.value = [...data.posts].sort((a, b) => b.date.localeCompare(a.date))
      status.value = 'ready'
    } catch {
      status.value = 'error'
    }
  }

  const visiblePosts = computed(() =>
    channel.value === 'all' ? posts.value : posts.value.filter((p) => p.channel === channel.value),
  )
  const channelById = (id: string) => channels.value.find((c) => c.id === id)

  return { channels, posts, status, channel, visiblePosts, load, channelById }
})
