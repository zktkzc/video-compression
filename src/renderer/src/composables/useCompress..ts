import useConfigStore from '@renderer/store/useConfigStore'
import { MainProcessNoticeType, VideoState, VideoType } from '@renderer/types'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const isRunning = ref(false)

export default () => {
  const { config } = useConfigStore()
  const video = ref<VideoType | null>()

  const getCompressFile = () => {
    video.value = config.files.find((file) => file.state === VideoState.READY)
    if (!video.value) {
      ElMessage.info({ message: '无待压缩的视频', grouping: true })
      return
    }

    video.value.state = VideoState.COMPRESSING
  }

  const progressNotice = () => {
    window.api.mainProcessNotice((type: MainProcessNoticeType, data: any) => {
      switch (type) {
        case MainProcessNoticeType.PROGRESS:
          if (video.value) video.value.progress = data
          break
        case MainProcessNoticeType.END:
          if (video.value) {
            video.value.state = VideoState.FINISHED
            video.value = null
            isRunning.value = false
            compress()
          }
          break
        case MainProcessNoticeType.ERROR:
          if (video.value) {
            video.value.state = VideoState.ERROR
            video.value.errorMessage = data.message
            ElMessage.error({ message: data.message, grouping: true })
            video.value = null
            isRunning.value = false
            compress()
          }
          break
        case MainProcessNoticeType.STOP:
          if (video.value) {
            video.value.state = VideoState.ERROR
            ElMessage.success({ message: '转码已停止', grouping: true })
            video.value = null
            isRunning.value = false
          }
          break
      }
    })
  }

  const compress = () => {
    getCompressFile()

    if (!video.value || isRunning.value) return

    if (!config.videoSaveDir || config.videoSaveDir.trim() === '') {
      ElMessage({ type: 'error', message: '未设置视频保存目录', grouping: true })
      isRunning.value = false
      return
    }

    isRunning.value = true
    window.api.compress({
      file: { ...video.value },
      fps: Number(config.frame),
      size: config.size,
      saveDirectory: config.videoSaveDir
    })
  }

  return { compress, isRunning, progressNotice }
}
