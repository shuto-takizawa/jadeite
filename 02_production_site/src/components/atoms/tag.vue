<template>
  <span class="tag" :class="{small:small}">
    # {{ tag.name }}
  </span>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { tags } from '~/types/cms-types'
export default defineComponent({
  props: {
    tag: {
      type: Object as PropType<tags>,
      required: true,
    },
    small: {
      type: Boolean,
      default: false,
    }
  },
  setup () {

    return {

    }
  }
})
</script>

<style lang="scss" scoped>
.tag {
  @apply mx-2 px-2 sm:px-3 py-1 sm:py-2 text-center text-sm text-site-accent border border-site-accent rounded-3xl shadow;

  &.small {
    @apply mx-1 px-2 py-1 text-xs;
  }
}
</style>
