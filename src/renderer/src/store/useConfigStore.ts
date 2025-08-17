import { defineStore } from 'pinia'
import { ref } from 'vue'
import { VideoType } from '../types'

const defaultSaveDir = await window.api.getDefaultSaveDir()
export default defineStore(
  'config',
  () => {
    const config = ref({
      sizes: ['1920x1080', '1024x720'],
      size: '1920x1080',
      frames: ['24', '30', '60', '120'],
      frame: '60',
      files: [] as VideoType[],
      videoSaveDir: defaultSaveDir
    })

    return { config }
  },
  { persist: true }
)
