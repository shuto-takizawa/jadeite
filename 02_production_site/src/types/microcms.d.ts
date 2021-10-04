import { createClient } from 'microcms-js-sdk'

declare module '@nuxt/types' {
  interface Context {
    $microcms: ReturnType<typeof createClient>
  }
}

/**
 * MicroCMS Response Type
 */
type MicroResponseArrayType<T> = {
  contents: T[]
  limit: number
  offset: number
  totalCount: number
}

export type MicroResponseType<T> = MicroResponseArrayType<T>
