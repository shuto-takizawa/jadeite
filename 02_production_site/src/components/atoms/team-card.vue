<template>
  <nuxt-link :to="`/team/${team.name}`">
    <nuxt-img :src="team.image.url" :alt="team.name" />
    <p class="text-center">{{ team.name }}</p>
  </nuxt-link>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { teams } from '~/types/cms-types'
export default defineComponent({
  props: {
    team: {
      type: Object as PropType<teams>,
      required: true,
    }
  },
})
</script>
