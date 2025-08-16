<script lang="ts" setup>
import { ref } from 'vue'
import VideoItem from './VideoItem.vue'

const videos = ref<string[]>([
  'Video1fadfasdcdasvdasdvasvsavdsavasvasfasfasdvasdvsavsacasdvdsvsacasvdvas',
  'Video 2',
  'Video 3',
  'Video 4'
])
</script>

<template>
  <main class="overflow-y-auto h-80">
    <VideoItem v-for="(video, index) in videos" :key="index" :video="{ title: video }" />
  </main>
</template>

<style lang="scss" scoped></style>
