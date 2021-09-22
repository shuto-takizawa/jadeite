<template>
  <div>
    sponsors
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    sponsors: {
      type: Array,
      required: true,
    }
  },
  setup () {
    return {

    }
  }
})
</script>
