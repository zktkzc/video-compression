<script lang="ts" setup>
import useVideo from '@renderer/composables/useVideo'
import useCompress from '@renderer/composables/useCompress.'

const { removeAll, resetAll } = useVideo()
const { isRunning } = useCompress()
const stop = () => {
  window.api.stop()
}
</script>

<template>
  <main class="flex justify-center">
    <el-button type="primary" size="small" :disabled="!isRunning" @click="stop">
      停止转码
    </el-button>
    <el-button type="danger" size="small" :disabled="isRunning" @click="removeAll">
      删除全部
    </el-button>
    <el-button type="warning" size="small" :disabled="isRunning" @click="resetAll">
      重置失败
    </el-button>
  </main>
</template>

<style lang="scss" scoped>
.disabled {
  @apply cursor-not-allowed;
}
</style>
