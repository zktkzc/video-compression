<script lang="ts" setup>
import useConfigStore from '@renderer/store/useConfigStore'
import useCompress from '@renderer/composables/useCompress.'

const { config } = useConfigStore()
const { isRunning } = useCompress()
</script>

<template>
  <main class="bg-white p-3 flex gap-2">
    <el-tooltip content="分辨率" effect="light">
      <el-select v-model="config.size" :disabled="isRunning">
        <el-option
          v-for="(item, index) in config.sizes"
          :key="index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-tooltip>
    <el-tooltip content="帧率" effect="light">
      <el-select v-model="config.frame" :disabled="isRunning">
        <el-option
          v-for="(item, index) in config.frames"
          :key="index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-tooltip>
  </main>
</template>

<style lang="scss" scoped></style>
