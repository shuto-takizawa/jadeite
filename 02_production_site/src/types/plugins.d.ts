import { Logger } from '~/plugins/logger'

/** Vueインスタンス用 */
declare module 'vue/types/vue' {
  interface Vue {
    readonly $log: Logger
  }
}

/** Context用 */
declare module '@nuxt/types' {
  interface Context {
    readonly $log: Logger
  }
}

/** Vuex用 */
declare module 'vuex/types/index' {
  interface Store<S> {

  }
}
