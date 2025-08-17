import { app, dialog, ipcMain, IpcMainInvokeEvent, shell } from 'electron'
import Ffmpeg from './ffmpeg'
import { CompressOptions } from '../renderer/src/types'
import fs from 'fs'

ipcMain.handle('selectFile', async () => {
  return await dialog.showOpenDialog({
    title: '选择视频文件',
    properties: ['openFile', 'multiSelections'],
    filters: [
      {
        name: 'Video file',
        extensions: ['mp4']
      }
    ]
  })
})

let ffmpeg = null as Ffmpeg | null
ipcMain.handle('compress', async (event: IpcMainInvokeEvent, options: CompressOptions) => {
  ffmpeg = new Ffmpeg(event, options)
  ffmpeg.run()
})

ipcMain.handle('selectDirectory', async (_event: IpcMainInvokeEvent, defaultPath: string) => {
  return await dialog.showOpenDialog({
    title: '选择文件夹',
    defaultPath: defaultPath,
    properties: ['openDirectory', 'createDirectory']
  })
})

ipcMain.handle('getDefaultSaveDir', () => {
  return app.getPath('videos')
})

ipcMain.handle('openDirectory', async (_event: IpcMainInvokeEvent, path: string) => {
  let message = ''
  if (!fs.existsSync(path)) {
    message = '文件夹不存在'
    return message
  }
  if (process.platform === 'win32') {
    await shell.openPath(`file://${path}`)
  } else {
    await shell.openPath(path)
  }
  return message
})

ipcMain.on('stop', () => {
  ffmpeg?.stop()
})
