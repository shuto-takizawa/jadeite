<template>
  <nuxt-link :to="`/team/${team.name}`" class="c-card">
    <figure class="mb-2 rounded-3xl overflow-hidden shadow-lg">
      <nuxt-img
        class="transition-all duration-500 ease-in-out transform"
        :src="team.image.url"
        :alt="team.name"
        format="webp"
      />
    </figure>
    <p class="text-center text-xl font-semibold">{{ team.name }}</p>
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

<style lang="scss" scoped>
.c-card {
  @apply m-2 transition-all duration-500 ease-in-out transform hover:-translate-y-1;

  &:hover {
    figure > img {
      @apply scale-110;
    }
  }
}
</style>
