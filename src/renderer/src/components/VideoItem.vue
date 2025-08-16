<script lang="ts" setup>
import { CloseOne } from '@icon-park/vue-next'
import { ref } from 'vue'

interface VideoType {
  title: string
}

defineProps<{ video: VideoType }>()

const process = ref(60)
</script>

<template>
  <section class="video" :style="`--process: ${process}%;`">
    <div class="title">{{ video.title }}</div>
    <div class="icon">
      <CloseOne theme="outline" size="12" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.video {
  @apply bg-white px-3 py-[8px] rounded-lg mb-2 mx-3 text-xs text-slate-600 
  flex justify-between items-center relative;

  &::before {
    content: '';
    @apply bg-yellow-300 absolute top-0 bottom-0 left-0 right-0 z-0 rounded-lg opacity-80;
    width: var(--process);
  }

  .title {
    @apply truncate z-10;
  }

  .icon {
    @apply text-slate-500 opacity-50 hover:text-yellow-500 hover:opacity-90
    hover:scale-125 duration-300 cursor-pointer ml-1;
  }
}
</style>
