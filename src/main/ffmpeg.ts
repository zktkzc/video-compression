import { BrowserWindow, IpcMainInvokeEvent } from 'electron'
import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import ffprobePath from '@ffprobe-installer/ffprobe'
import ffmpeg from 'fluent-ffmpeg'
import { CompressOptions, MainProcessNoticeType } from '../renderer/src/types'
import path from 'path'
import fs from 'fs'

ffmpeg.setFfmpegPath(ffmpegPath.path)
ffmpeg.setFfprobePath(ffprobePath.path)

export default class Ffmpeg {
  ffmpeg: ffmpeg.FfmpegCommand
  window: BrowserWindow

  constructor(
    private event: IpcMainInvokeEvent,
    private options: CompressOptions
  ) {
    this.ffmpeg = ffmpeg(this.options.file.path)
    this.window = BrowserWindow.fromWebContents(this.event.sender)!
  }

  progressEvent(progress: {
    frames: number
    currentFps: number
    currentKbps: number
    targetSize: number
    timemark: string
    percent?: number | undefined
  }) {
    // console.log('Processing: ' + progress.percent + '%')
    this.window.webContents.send(
      'mainProcessNotice',
      MainProcessNoticeType.PROGRESS,
      progress.percent
    )
  }

  error(error: Error) {
    console.error('An error occurred: ' + error.message)
    this.window.webContents.send('mainProcessNotice', MainProcessNoticeType.ERROR, error)
  }

  end() {
    console.log('Processing finished successfully.')
    this.window.webContents.send('mainProcessNotice', MainProcessNoticeType.END)
  }

  private getFileInfo() {
    return path.parse(this.options.file.name)
  }

  run() {
    const fileInfo = this.getFileInfo()

    if (!fs.existsSync(this.options.saveDirectory)) {
      fs.mkdirSync(this.options.saveDirectory, { recursive: true })
    }

    if (
      fs.existsSync(
        path.resolve(
          this.options.saveDirectory,
          `${fileInfo.name}_${this.options.size}_${this.options.fps}${fileInfo.ext}`
        )
      )
    ) {
      this.error(new Error('文件已存在'))
      return
    }

    this.ffmpeg
      .fps(this.options.fps)
      .size(this.options.size)
      .videoCodec('libx264')
      .on('progress', this.progressEvent.bind(this))
      .on('error', this.error.bind(this))
      .on('end', this.end.bind(this))
      .save(
        path.resolve(
          this.options.saveDirectory,
          `${fileInfo.name}_${this.options.size}_${this.options.fps}${fileInfo.ext}`
        )
      )
  }

  stop() {
    this.ffmpeg.kill('SIGKILL')
    this.window.webContents.send('mainProcessNotice', MainProcessNoticeType.STOP)
  }
}
