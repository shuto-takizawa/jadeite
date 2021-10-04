import { Logger } from '~/plugins/logger'

/** Vueインスタンス用 */
declare module 'vue/types/vue' {
  interface Vue {
    readonly $log: Logger
    $truncate: (value: string, max: number, suffix?: string) => string
  }
}

/** Context用 */
declare module '@nuxt/types' {
  interface Context {
    readonly $log: Logger
    $truncate: (value: string, max: number, suffix?: string) => string
  }
}

/** Vuex用 */
declare module 'vuex/types/index' {
  interface Store<S> {

  }
}
