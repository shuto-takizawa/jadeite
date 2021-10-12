<template>
  <nuxt-link :to="`/news/${news.id}`" class="c-card">
    <figure>
      <nuxt-img :src="news.thumbnail.url" :alt="news.title" />
    </figure>
    <div class="card-body">
      <h3 class="card-title">{{ news.title }}</h3>
      <p class="card-sub-text">{{ $moment(news.publishedAt).format('YYYY/MM/DD') }}</p>
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

  @apply m-4 border border-gray-200 rounded-xl overflow-hidden shadow;

  .card-body {
    @apply px-6 py-4;

    .card-title {
      @apply mb-4 sm:mb-6 text-base sm:text-xl font-semibold text-site-black break-all;
    }

    .card-sub-text {
      @apply mb-2 text-sm text-gray-400;
    }

    .card-actions {
      @apply flex items-center mt-2;

      & > * {
        @apply mx-0 mr-2;
      }
    }
  }
}
</style>
