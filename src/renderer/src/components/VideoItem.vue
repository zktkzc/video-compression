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
    @apply absolute top-0 bottom-0 left-0 right-0 z-0 rounded-lg opacity-80;
    width: var(--process);
    background: repeating-linear-gradient(
      -45deg,
      #c4ff8e 0px,
      #c4ff8e 10px,
      #a8ed6a 10px,
      #a8ed6a 20px
    );
    background-size: 28.28px 28.28px;
    animation: moveRight 1s linear infinite;
  }

  @keyframes moveRight {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: 28.28px;
    }
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
