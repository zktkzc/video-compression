<script lang="ts" setup>
import useConfigStore from '@renderer/store/useConfigStore'
import { CloseOne, DownC, UpC } from '@icon-park/vue-next'
import Card from '@renderer/components/Card.vue'
import useVideo from '@renderer/composables/useFpsAndSize'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const newWidth = ref('')
const newHeight = ref('')
const { config } = useConfigStore()
const { newValue, addVideoSize, delVideoSize, addVideoFrame, delVideoFrame, moveUp, moveDown } =
  useVideo()

const addSize = () => {
  if (!newWidth.value || !newHeight.value) {
    ElMessage({ message: '请输入宽度和高度', type: 'error', grouping: true })
    return
  }
  newValue.value = `${newWidth.value}x${newHeight.value}`
  addVideoSize()
  newWidth.value = ''
  newHeight.value = ''
}

const addFrame = () => {
  if (!newValue.value) {
    ElMessage({ message: '请输入帧率', type: 'error', grouping: true })
    return
  }
  addVideoFrame()
}

const selectDirectory = async () => {
  const result = await window.api.selectDirectory(config.videoSaveDir)
  if (result.canceled) return
  config.videoSaveDir = result.filePaths[0]
}
</script>

<template>
  <main>
    <Card title="分辨率">
      <div
        class="bg-slate-100 border p-1 flex flex-col gap-1 rounded-lg max-h-[108px] overflow-y-auto"
      >
        <div
          v-for="(item, index) in config.sizes"
          :key="index"
          class="bg-white text-slate-700 text-opacity-80 text-sm border rounded-lg flex justify-between items-center px-2 py-1 select-none"
        >
          {{ item }}
          <div class="flex items-center gap-1">
            <div :class="index === 0 ? 'disabled' : 'up-icon'">
              <UpC theme="outline" size="12" @click="moveUp('size', index)" />
            </div>
            <div :class="index === config.sizes.length - 1 ? 'disabled' : 'down-icon'">
              <DownC theme="outline" size="12" @click="moveDown('size', index)" />
            </div>
            <div class="del-icon">
              <CloseOne v-if="index > 0" theme="outline" size="12" @click="delVideoSize(item)" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center gap-1 mt-2">
        <el-input
          v-model="newWidth"
          size="default"
          placeholder="宽度"
          clearable
          @input="
            (value) => {
              newWidth = value.replace(/[^\d]/g, '')
            }
          "
          @keyup.enter="addSize"
        />
        x
        <el-input
          v-model="newHeight"
          size="default"
          placeholder="高度"
          clearable
          @input="
            (value) => {
              newHeight = value.replace(/[^\d]/g, '')
            }
          "
          @keyup.enter="addSize"
        />
        <el-button type="primary" size="default" @click="addSize">添加</el-button>
      </div>
    </Card>

    <Card title="帧率">
      <div
        class="bg-slate-100 border p-1 flex flex-col gap-1 rounded-lg max-h-[108px] overflow-y-auto"
      >
        <div
          v-for="(item, index) in config.frames"
          :key="index"
          class="bg-white text-slate-700 text-opacity-80 text-sm border rounded-lg flex justify-between items-center px-2 py-1 select-none"
        >
          {{ item }}
          <div class="flex items-center gap-1">
            <div :class="index === 0 ? 'disabled' : 'up-icon'">
              <UpC theme="outline" size="12" @click="moveUp('frame', index)" />
            </div>
            <div :class="index === config.frames.length - 1 ? 'disabled' : 'down-icon'">
              <DownC theme="outline" size="12" @click="moveDown('frame', index)" />
            </div>
            <div class="del-icon">
              <CloseOne v-if="index > 0" theme="outline" size="12" @click="delVideoFrame(item)" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center gap-1 mt-2">
        <el-input
          v-model="newValue"
          size="default"
          placeholder="帧率"
          @input="
            (value) => {
              newValue = value.replace(/[^\d]/g, '')
            }
          "
          @keyup.enter="addFrame"
        />
        <el-button type="success" size="default" @click="addFrame">添加</el-button>
      </div>
    </Card>

    <Card title="视频保存目录">
      <div class="flex gap-1">
        <el-input v-model="config.videoSaveDir" size="default" disabled />
        <el-button type="warning" size="default" @click="selectDirectory">选择</el-button>
      </div>
    </Card>
  </main>
</template>

<style lang="scss" scoped>
section {
  @apply bg-white m-3 p-3 rounded-lg;

  h2 {
    @apply text-slate-700 text-sm mb-2 opacity-80;
  }
}

.up-icon {
  @apply text-slate-500 opacity-50 hover:text-blue-500 hover:opacity-90
    hover:scale-125 duration-300 cursor-pointer;
}

.down-icon {
  @apply text-slate-500 opacity-50 hover:text-green-500 hover:opacity-90
    hover:scale-125 duration-300 cursor-pointer;
}

.del-icon {
  @apply text-slate-500 opacity-50 hover:text-red-500 hover:opacity-90
    hover:scale-125 duration-300 cursor-pointer;
}

.disabled {
  @apply cursor-not-allowed opacity-50;
}
</style>
