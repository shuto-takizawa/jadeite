<template>
  <nuxt-link :to="`/news/${news.id}`" class="c-card">
    <figure class="card-image">
      <nuxt-img :src="news.thumbnail.url" :alt="news.title" />
    </figure>
    <div class="card-body">
      <p class="card-sub-text">{{ $moment(news.post_date).format('YYYY/MM/DD') }}</p>
      <h3 class="card-title">{{ news.title }}</h3>
      <div class="card-actions">
        <tag v-for="tag in news.tags" :key="tag.id" :tag="tag" small />
      </div>
    </div>
  </nuxt-link>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { news } from '~/types/cms-types'
import Tag from '~/components/atoms/tag.vue'
export default defineComponent({
  components: {
    Tag,
  },
  props: {
    news: {
      type: Object as PropType<news>,
      required: true,
    }
  },
})
</script>

<style lang="scss" scoped>
.c-card {
  @include card-hover();

  @apply block lg:flex m-4 lg:h-40 border border-gray-200 rounded-xl overflow-hidden shadow;

  .card-image {
    flex-basis: 30%;

    > img {
      @apply lg:w-full lg:h-full object-cover;
    }
  }

  .card-body {
    @apply px-6 py-4;

    flex-basis: 70%;

    .card-title {
      @apply text-xl font-semibold text-site-black break-all;
    }

    .card-sub-text {
      @apply mb-2 text-sm text-gray-400;
    }

    .card-actions {
      @apply flex items-center mt-4 flex-wrap gap-2;
    }
  }
}
</style>
