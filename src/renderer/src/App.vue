<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Action from './components/Action.vue'
import Frame from './components/Frame.vue'
import Button from './components/Button.vue'
import VideoList from './components/VideoList.vue'
</script>

<template>
  <main class="">
    <Navbar />
    <Frame class="mt-5" />
    <Action class="mt-5" />
    <Button class="mt-3" />
    <VideoList class="mt-5" />
  </main>
</template>
