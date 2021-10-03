<template>
  <nuxt-link :to="`/news/${news.id}`" class="c-card">
    <figure class="lg:h-full">
      <!-- TODO : レスポンシブ時にデザイン崩れている
      根本的な見直しが必要かもしれない -->
      <nuxt-img :src="news.thumbnail.url" :alt="news.title" class="lg:h-full" />
    </figure>
    <div class="card-body">
      <p class="card-sub-text">{{ $moment(news.publishedAt).format('YYYY/MM/DD') }}</p>
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
  setup () {

    return {

    }
  }
})
</script>

<style lang="scss" scoped>
.c-card {
  @include card-hover();

  @apply block lg:flex m-4 lg:h-40 border border-gray-200 rounded-xl overflow-hidden shadow;

  .card-body {
    @apply px-6 py-4;

    .card-title {
      @apply text-xl font-semibold text-site-black break-all;
    }

    .card-sub-text {
      @apply mb-2 text-sm text-gray-400;
    }

    .card-actions {
      @apply flex items-center mt-4;

      & > * {
        @apply mx-0 mr-2;
      }
    }
  }
}
</style>
