import useConfigStore from '@renderer/store/useConfigStore'
import { VideoState, VideoType } from '@renderer/types'
import { ElMessage } from 'element-plus'

export default () => {
  const { config } = useConfigStore()

  const addFile = async () => {
    let alreadyHas = false
    const result = await window.api.selectFile()
    if (result.canceled || result.filePaths.length === 0) return
    result.filePaths.forEach((filePath) => {
      if (config.files.map((file) => file.path).includes(filePath)) alreadyHas = true
    })
    if (alreadyHas) return

    for (let i = 0; i < result.filePaths.length; i++) {
      const path = result.filePaths[i]
      const name = result.filePaths[i].substring(path.lastIndexOf('/') + 1)
      config.files.push({ name, path, progress: 0, state: VideoState.READY, errorMessage: '' })
    }
  }

  const remove = (index: number) => {
    if (config.files[index].state === VideoState.COMPRESSING) {
      ElMessage.error({ message: '请等待视频压缩完成', grouping: true })
      return
    }
    config.files.splice(index, 1)
  }

  const removeAll = () => {
    config.files = []
  }

  const resetErrorVideo = () => {
    config.files.forEach((file) => {
      if (file.state !== VideoState.ERROR) return
      file.state = VideoState.READY
      file.progress = 0
    })
  }

  const getVideoBgColor = (video: VideoType) => {
    return {
      [VideoState.COMPRESSING]:
        'repeating-linear-gradient(-45deg,#c4ff8e 0px,#c4ff8e 10px,#a8ed6a 10px,#a8ed6a 20px)',
      [VideoState.ERROR]: '#e18068',
      [VideoState.FINISHED]: '#bee88a'
    }[video.state]
  }

  const reset = (index: number) => {
    if (config.files[index]) {
      config.files[index].state = VideoState.READY
      config.files[index].progress = 0
    }
  }

  const open = async (file: VideoType) => {
    const result = await window.api.openDirectory(
      file.path.substring(0, file.path.lastIndexOf('/'))
    )
    if (result !== '') {
      ElMessage.error({ message: result, grouping: true })
    }
  }

  return { addFile, remove, removeAll, resetAll: resetErrorVideo, getVideoBgColor, reset, open }
}
