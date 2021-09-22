<template>
  <div v-if="items">
    <div v-for="news in items" :key="news.id">
      {{ news.title }}
      {{ news.id }}
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { news } from '~/types/cms-types'
export default defineComponent({
  props: {
    items: {
      type: Array as PropType<news[]>,
      required: true,
    }
  },
  setup () {
    return {

    }
  }
})
</script>
