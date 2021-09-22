import { Plugin } from '@nuxt/types'

export class Logger {
  private readonly isDev: boolean

  constructor (env: string = 'development') {
    this.isDev = env !== 'production'
  }

  info (...message: any[]) {
    if (this.isDev) console.log('[info]:', ...message)
  }

  warn (...message: any[]) {
    if (this.isDev) console.warn('[warn]:', message)
  }

  error (...message: any[]) {
    if (this.isDev) console.error('[error]:', message)
  }
}

const plugin: Plugin = (ctx, inject) => {
  inject('log', new Logger(process.env.NODE_ENV))
}

export default plugin
