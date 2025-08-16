<script lang="ts" setup>
import { CloseOne } from '@icon-park/vue-next'
import { ref } from 'vue'

const videos = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
</script>

<template>
  <main class="overflow-y-auto h-80">
    <section v-for="(video, index) in videos" :key="index" class="video">
      {{ video }}
      <div class="icon">
        <CloseOne theme="outline" size="12" />
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.video {
  @apply bg-white px-3 py-1 rounded-lg mb-2 mx-3 text-xs text-slate-600 
  flex justify-between items-center;

  .icon {
    @apply text-slate-500 opacity-50 hover:text-yellow-500 hover:opacity-90
    hover:scale-125 duration-300 cursor-pointer;
  }
}
</style>
