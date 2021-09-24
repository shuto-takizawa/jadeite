<template>
  <div class="">
    <h1 class="page-title">404 Page Not Found ...</h1>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  head: {
    title: '404 Not Found'
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  }
})
</script>
