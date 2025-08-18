<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <main class="text-slate-600 bg-gray-50 border-b text-xs flex justify-between px-3 py-2 drag">
    <section class="opacity-80 select-none">视频压缩工具</section>
    <section class="flex justify-between items-center gap-2">
      <router-link
        :to="{ name: 'home' }"
        :class="['select-none cursor-pointer no-drag', route.path === '/' ? 'active' : '']"
        style="-webkit-user-drag: none"
      >
        转码
      </router-link>
      <router-link
        :to="{ name: 'setting' }"
        :class="['select-none cursor-pointer no-drag', route.path === '/setting' ? 'active' : '']"
        style="-webkit-user-drag: none"
      >
        配置
      </router-link>
    </section>
  </main>
</template>

<style lang="scss">
.active {
  @apply font-bold text-blue-500;
}
</style>
