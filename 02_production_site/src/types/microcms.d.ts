import { createClient } from 'microcms-js-sdk'

declare module '@nuxt/types' {
  interface Context {
    $microcms: ReturnType<typeof createClient>
  }
}

/** MicroCMS Response Type
 * TODO : 現在複数の時しか考慮していないので、単数の取得も含めた型定義を検討する
 * */
export type MicroResponseType<T> = {
  contents: T[]
  limit: number
  offset: number
  totalCount: number
}
