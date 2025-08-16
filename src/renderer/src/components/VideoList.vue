<script lang="ts" setup>
import { ref } from 'vue'

const videos = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
</script>

<template>
  <main class="overflow-y-auto h-80">
    <section v-for="(video, index) in videos" :key="index" class="video">
      {{ video }}
    </section>
  </main>
</template>

<style lang="scss" scoped>
.video {
  @apply bg-white px-3 py-1 rounded-lg mb-2 mx-3 text-xs text-slate-600;
}
</style>
