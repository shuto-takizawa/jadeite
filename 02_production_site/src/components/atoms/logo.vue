<template>
  <img
    class="inline-block"
    src="~/assets/image/logo.svg"
    alt="logo"
    :width="width"
  >
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    width: {
      type: Number,
      default: 100
    },
  },
  setup () {
    return {

    }
  }
})
</script>
