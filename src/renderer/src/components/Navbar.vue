<script setup lang="ts"></script>

<template>
  <main class="text-slate-600 bg-gray-50 border-b text-xs flex justify-between px-3 py-2">
    <section class="opacity-80 select-none">视频压缩工具</section>
    <section class="flex justify-between gap-2">
      <router-link :to="{ name: 'home' }" class="select-none cursor-pointer">转码</router-link>
      <router-link :to="{ name: 'setting' }" class="select-none cursor-pointer">配置</router-link>
    </section>
  </main>
</template>

<style lang="scss"></style>
