<template>
  <div class="c-card">
    <div class="col-span-2">
      <div class="flex mb-3">
        <a
          v-show="sponsor.twitter"
          :href="sponsor.twitter"
          target="_blank"
        >
          <fa :icon="twitter" class="icon" />
        </a>
        <a
          v-show="sponsor.youtube"
          :href="sponsor.youtube"
          target="_blank"
        >
          <fa :icon="youtube" class="icon" />
        </a>
      </div>
      <p class="mb-3 text-xs sm:text-base whitespace-pre-line">{{ sponsor.description }}</p>
      <a v-show="sponsor.url" :href="sponsor.url" target="_blank" class="text-sm text-site-accent text-opacity-80 font-semibold transition-all duration-300 ease-in-out hover:text-opacity-100">Offical HP →</a>
    </div>
    <figure class="flex items-center justify-center">
      <nuxt-img
        class="w-5/6 sm:w-2/3"
        :src="sponsor.logo.url"
        :alt="sponsor.name"
        format="webp"
      />
    </figure>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { sponsors } from '~/types/cms-types'
import { twitter, youtube } from '~/utils/font-awesome'

export default defineComponent({
  props: {
    sponsor: {
      type: Object as PropType<sponsors>,
      required: true,
    }
  },
  setup () {
    return {
      twitter,
      youtube,
    }
  }
})
</script>

<style lang="scss" scoped>
.c-card {
  @apply relative px-6 sm:px-8 py-4 grid grid-cols-3 rounded-xl overflow-hidden shadow-lg;

  &::before {
    @apply absolute top-0 left-0 w-2 bg-site-black;

    content: '';
    height: 50%;
  }

  &::after {
    @apply absolute bottom-0 left-0 w-2 bg-site-accent;

    content: '';
    height: 50%;
  }
}

.icon {
  @apply mr-2 text-xl sm:text-3xl;
}
</style>
