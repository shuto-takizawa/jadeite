import { Plugin } from '@nuxt/types'

const truncate = (value: string, max: number, suffix: string = '...') => {
  if (!value) return ''
  if (value.length >= max) return value.substr(0, max) + suffix
  return value
}

const plugins: Plugin = (_, inject) => {
  inject('truncate', truncate)
}

export default plugins
