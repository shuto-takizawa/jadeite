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
  @apply px-4 py-2 text-white font-semibold bg-site-accent bg-opacity-90 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:bg-opacity-100 hover:-translate-y-1 hover:shadow-lg;

  &:disabled {
    @apply cursor-default bg-gray-300;
  }
}
</style>
