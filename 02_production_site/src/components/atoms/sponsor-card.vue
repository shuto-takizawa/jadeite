<template>
  <div class="flex">
    <div>
      <p>{{ sponsor.description }}</p>
    </div>
    <div>
      <nuxt-img :src="sponsor.logo.url" :alt="sponsor.name" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { sponsors } from '~/types/cms-types'
export default defineComponent({
  props: {
    sponsor: {
      type: Object as PropType<sponsors>,
      required: true,
    }
  },
})
</script>
