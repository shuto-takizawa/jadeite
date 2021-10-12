<template>
  <div class="">
    <h1 v-if='error.statusCode === 404' class="page-title">404 Page <br class="block sm:hidden">Not Found ...</h1>
    <h1 v-else class="page-title">Other Error...</h1>
  </div>
</template>

<script lang='ts'>
import { NuxtError } from '@nuxt/types'
import { defineComponent, PropType } from '@nuxtjs/composition-api'
export default defineComponent({
  head: {
    title: '404 Not Found'
    // TODO : meta設定
  },
  props: {
    error: {
      type: Object as PropType<NuxtError>,
      default: null
    }
  }
})
</script>
