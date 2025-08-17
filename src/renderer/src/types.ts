export enum VideoState {
  READY = 'ready',
  COMPRESSING = 'compressing',
  ERROR = 'error',
  FINISHED = 'finished'
}

export type VideoType = {
  name: string
  path: string
  progress: number
  state: VideoState
  errorMessage: string
}

export type CompressOptions = {
  file: VideoType
  fps: number
  size: string
  saveDirectory: string
}

export enum MainProcessNoticeType {
  PROGRESS = 'progress',
  ERROR = 'error',
  END = 'end',
  STOP = 'stop'
}
