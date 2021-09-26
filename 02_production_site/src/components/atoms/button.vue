<template>
  <button
    class="btn"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    disabled: {
      type: Boolean
    },
    type: {
      type: String,
      default: 'button'
    }
  }
})
</script>

<style lang="scss" scoped>
.btn {
  @apply p-1 bg-site-accent rounded-lg;

  &:disabled {
    @apply cursor-default text-white bg-gray-300;
  }
}
</style>
