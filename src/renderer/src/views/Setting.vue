<script lang="ts" setup>
import { ref } from 'vue'

const sizes = ref(['1920x1080', '1024x720'])
const size = ref('1920x1080')
const frames = ref([30, 60])
const frame = ref(60)
</script>

<template>
  <main class="bg-white p-3 flex gap-2">
    <el-tooltip content="分辨率" effect="light">
      <el-select v-model="size">
        <el-option
          v-for="(item, index) in sizes"
          :key="index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-tooltip>
    <el-tooltip content="帧率" effect="light">
      <el-select v-model="frame">
        <el-option
          v-for="(item, index) in frames"
          :key="index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-tooltip>
  </main>
</template>

<style lang="scss" scoped></style>
