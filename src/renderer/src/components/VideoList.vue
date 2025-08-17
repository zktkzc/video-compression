<script lang="ts" setup>
import VideoItem from './VideoItem.vue'
import useConfigStore from '@renderer/store/useConfigStore'

const { config } = useConfigStore()
</script>

<template>
  <main class="overflow-y-auto h-80">
    <VideoItem
      v-for="(video, index) in config.files"
      v-if="config.files.length"
      :key="index"
      :video="{
        name: video?.name,
        progress: video?.progress,
        path: video?.path,
        state: video?.state,
        errorMessage: video?.errorMessage
      }"
      :index="index"
    />
    <div v-else class="text-xs opacity-80 text-slate-600 text-center">暂无压缩视频</div>
  </main>
</template>

<style lang="scss" scoped></style>
