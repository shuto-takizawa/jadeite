<template>
  <nuxt-link :to="`/team/${team.id}`" class="c-card">
    <figure class="mb-2 rounded-3xl overflow-hidden shadow-lg">
      <nuxt-img
        v-if="team.image"
        :src="team.image.url"
        :alt="team.name"
        format="webp"
      />
      <nuxt-img
        v-else
        src="/no-image.png"
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

  figure > img {
    @apply transition-all duration-500 ease-in-out transform object-cover;

    aspect-ratio: 16 / 10;
  }

  &:hover {
    figure > img {
      @apply scale-110;
    }
  }
}
</style>
