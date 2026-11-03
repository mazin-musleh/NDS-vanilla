<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useCopy } from './composables/useCopy'

const route = useRoute()
const { t } = useCopy()

// Browser tab title follows the route and the language.
watchEffect(() => {
  const page = route.meta.titleKey ? t(route.meta.titleKey) : ''
  document.title = page ? `${page} | ${t('brand.name')}` : t('brand.name')
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <KeepAlive :include="['SitesView', 'KpisView']">
        <component :is="Component" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
