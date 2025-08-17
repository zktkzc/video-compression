import { ElectronAPI } from '@electron-toolkit/preload'
import { MainProcessNoticeType, CompressOptions } from "../renderer/src/types";

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      compress: (options: CompressOptions) => void
      selectFile: () => Promise<Electron.OpenDialogReturnValue>,
      selectDirectory: (defaultPath: string) => Promise<Electron.OpenDialogReturnValue>,
      getDefaultSaveDir: () => Promise<string>
      mainProcessNotice: (callback: (type: MainProcessNoticeType, data?: any) => void) => void
      openDirectory: (path: string) => Promise<string>
      stop: () => void
    }
  }
}
