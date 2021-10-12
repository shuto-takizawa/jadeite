<template>
  <nuxt-link :to="`/member/${member.slug}`" class="c-card">
    <figure class="mb-2 rounded-3xl overflow-hidden shadow-lg">
      <nuxt-img
        class="transition-all duration-500 ease-in-out transform"
        v-if="member.icon"
        :src="member.icon.url"
        :alt="member.name"
        format="webp"
      />
      <nuxt-img
        class="transition-all duration-500 ease-in-out transform"
        v-else
        src="/no-image.png"
        :alt="member.name"
        format="webp"
      />
    </figure>
    <p class="text-center text-base font-semibold">{{ member.name }}</p>
  </nuxt-link>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { members } from '~/types/cms-types'
export default defineComponent({
  props: {
    member: {
      type: Object as PropType<members>,
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
