import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { CompressOptions, MainProcessNoticeType } from '../renderer/src/types'

// Custom APIs for renderer
const api = {
  compress: async (options: CompressOptions) => {
    ipcRenderer.invoke('compress', options)
  },
  selectFile: async (): Promise<Electron.OpenDialogReturnValue> => {
    return ipcRenderer.invoke('selectFile')
  },
  selectDirectory: async (defaultPath: string): Promise<Electron.OpenDialogReturnValue> => {
    return ipcRenderer.invoke('selectDirectory', defaultPath)
  },
  getDefaultSaveDir: async (): Promise<string> => {
    return ipcRenderer.invoke('getDefaultSaveDir')
  },
  mainProcessNotice: (callback: (type: MainProcessNoticeType, data?: any) => void) => {
    ipcRenderer.on(
      'mainProcessNotice',
      (_event: IpcRendererEvent, type: MainProcessNoticeType, data?: any) => {
        callback(type, data)
      }
    )
  },
  openDirectory: (path: string) => ipcRenderer.invoke('openDirectory', path),
  stop: () => ipcRenderer.send('stop')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
