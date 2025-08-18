<script lang="ts" setup>
import { CloseOne, Error, FolderOpen, Redo } from '@icon-park/vue-next'
import useVideo from '@renderer/composables/useVideo'
import { VideoState, VideoType } from '@renderer/types'
import { ElMessage } from 'element-plus'

const { video } = defineProps<{ video: VideoType; index: number }>()
const { remove, getVideoBgColor, reset, open } = useVideo()
</script>

<template>
  <section
    class="video"
    :style="[`--process: ${video.progress}%;`, `--bgColor: ${getVideoBgColor(video)}`]"
  >
    <div class="title">{{ video.name }}</div>
    <div class="flex justify-center items-center">
      <div v-if="video.state === VideoState.FINISHED" class="open">
        <FolderOpen theme="outline" size="12" @click="open(video)" />
      </div>
      <div v-if="video.state === VideoState.ERROR" class="retry">
        <Error
          theme="outline"
          size="12"
          @click="
            () => {
              if (video.errorMessage !== '')
                ElMessage.error({ message: video.errorMessage, grouping: true })
            }
          "
        />
      </div>
      <div v-if="video.state === VideoState.ERROR" class="retry">
        <Redo theme="outline" size="12" @click="reset(index)" />
      </div>
      <div class="close">
        <CloseOne theme="outline" size="12" @click="remove(index)" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.video {
  @apply bg-white px-3 py-[8px] rounded-lg mb-2 mx-3 text-xs text-slate-600
  flex justify-between items-center relative;
  background-color: var(--bgColor);

  &::before {
    content: '';
    @apply absolute top-0 bottom-0 left-0 right-0 z-0 rounded-lg opacity-80;
    width: var(--process);
    background: var(--bgColor);
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
    @apply truncate z-10 select-none;
  }

  .open {
    @apply text-slate-500 opacity-50 hover:text-blue-500 hover:opacity-90
    hover:scale-150 duration-300 cursor-pointer ml-1;
  }

  .retry {
    @apply text-slate-500 opacity-50 hover:text-yellow-500 hover:opacity-90
    hover:scale-150 duration-300 cursor-pointer ml-1;
  }

  .close {
    @apply text-slate-500 opacity-50 hover:text-red-500 hover:opacity-90
    hover:scale-150 duration-300 cursor-pointer ml-1;
  }
}
</style>
