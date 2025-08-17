<script setup lang="ts">
import { Plus, UpdateRotation } from '@icon-park/vue-next'
import useVideo from '@renderer/composables/useVideo'
import useCompress from '@renderer/composables/useCompress.'
import { ref } from 'vue'

const updateRef = ref()
const { addFile } = useVideo()
const { compress, isRunning, progressNotice } = useCompress()
progressNotice()
</script>

<template>
  <main>
    <section class="flex justify-center gap-2">
      <el-tooltip content="选择视频文件" effect="light" placement="top">
        <div class="button">
          <Plus theme="outline" size="42" @click="addFile" />
        </div>
      </el-tooltip>
      <el-tooltip content="开始压缩" effect="light" placement="top">
        <div :class="['button', isRunning ? 'disabled' : '']">
          <UpdateRotation
            ref="updateRef"
            theme="outline"
            size="42"
            :class="[isRunning ? 'animate-spin' : '']"
            @click="!isRunning && compress()"
          />
        </div>
      </el-tooltip>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.button {
  @apply w-20 h-20 rounded-lg bg-white flex justify-center items-center text-slate-600 cursor-pointer;
}

.disabled {
  @apply cursor-not-allowed text-slate-300;
}
</style>
