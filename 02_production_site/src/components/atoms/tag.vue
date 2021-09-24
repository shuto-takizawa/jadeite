<template>
  <span class="tag">
    {{ tag.name }}
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
  @apply mr-1 p-1 text-white bg-site-accent rounded-sm;
}
</style>
