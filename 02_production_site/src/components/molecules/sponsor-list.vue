<template>
  <div class="">
    <card
      v-for="sponsor in sponsors"
      :key="sponsor.id"
      :sponsor="sponsor"
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { sponsors } from '~/types/cms-types'
import Card from '~/components/atoms/sponsor-card.vue'
export default defineComponent({
  components: { Card },
  props: {
    sponsors: {
      type: Array as PropType<sponsors[]>,
      required: true,
    }
  },
})
</script>
