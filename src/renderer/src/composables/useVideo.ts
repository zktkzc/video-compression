import useConfigStore from '@renderer/store/useConfigStore'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'

export default () => {
  const newValue = ref('')
  const { config } = useConfigStore()

  const addVideoSize = () => {
    if (config.sizes.includes(newValue.value)) {
      ElMessage({ message: '该配置已存在', type: 'error', grouping: true })
      newValue.value = ''
      return
    }

    config.sizes.push(newValue.value)
    ElMessage({ message: '添加成功', type: 'success', grouping: true })
    newValue.value = ''
  }

  const delVideoSize = async (size: string) => {
    await ElMessageBox.confirm(`确定要删除分辨率${size}吗？`)
    const index = config.sizes.indexOf(size)
    if (index > -1) {
      config.sizes.splice(index, 1)
      ElMessage({ message: '删除成功', type: 'success', grouping: true })
    }
  }

  const addVideoFrame = () => {
    if (config.frames.includes(newValue.value)) {
      ElMessage({ message: '该配置已存在', type: 'error', grouping: true })
      newValue.value = ''
      return
    }

    config.frames.push(newValue.value)
    ElMessage({ message: '添加成功', type: 'success', grouping: true })
    newValue.value = ''
  }

  const delVideoFrame = async (frame: string) => {
    await ElMessageBox.confirm(`确定要删除帧率${frame}吗？`)
    const index = config.frames.indexOf(frame)
    if (index > -1) {
      config.frames.splice(index, 1)
      ElMessage({ message: '删除成功', type: 'success', grouping: true })
    }
  }

  const moveUp = (type: 'size' | 'frame', index: number) => {
    if (index <= 0) return

    const value = config[type === 'size' ? 'sizes' : 'frames'][index - 1]
    config[type === 'size' ? 'sizes' : 'frames'][index - 1] =
      config[type === 'size' ? 'sizes' : 'frames'][index]
    config[type === 'size' ? 'sizes' : 'frames'][index] = value
  }

  const moveDown = (type: 'size' | 'frame', index: number) => {
    if (index >= config[type === 'size' ? 'sizes' : 'frames'].length - 1) return

    const value = config[type === 'size' ? 'sizes' : 'frames'][index + 1]
    config[type === 'size' ? 'sizes' : 'frames'][index + 1] =
      config[type === 'size' ? 'sizes' : 'frames'][index]
    config[type === 'size' ? 'sizes' : 'frames'][index] = value
  }

  return { newValue, addVideoSize, delVideoSize, addVideoFrame, delVideoFrame, moveUp, moveDown }
}
