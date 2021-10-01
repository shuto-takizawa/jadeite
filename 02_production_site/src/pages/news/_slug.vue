<template>
  <article v-if="news">
    <p class="date">{{ $moment(news.publishedAt).format('YYYY/MM/DD') }}</p>
    <h1 class="title">{{ news.title }}</h1>
    <div class="tags">
      <tag v-for="tag in news.tags" :key="tag.id" :tag="tag" />
    </div>
    <nuxt-img class="thumbnail" :src="news.thumbnail.url" :alt="news.title" />
    <div class="content" v-html="news.content" />
  </article>
</template>

<script lang='ts'>
import { defineComponent, useContext, useMeta, useFetch, ref } from '@nuxtjs/composition-api'
import { news } from '~/types/cms-types'
import Tag from '~/components/atoms/tag.vue'
export default defineComponent({
  components: {
    Tag,
  },
  head: {},
  watchQuery: ['slug'],
  setup () {
    const { params, $microcms, $log, error, redirect } = useContext()
    // TODO : meta設定
    const { title } = useMeta()
    const news = ref<news>()
    useFetch(async () => {
      try {
        const res = await $microcms.get<news>({
          endpoint: 'news',
          contentId: params.value.slug
        })
        title.value = res.title
        news.value = res
      } catch (e) {
        error({
          statusCode: 404,
        })
        if (process.server) redirect(404, '/')
      }
    })
    $log.info('news result:', news.value)
    return {
      news,
    }
  },
})
</script>

<style lang="scss" scoped>
.date {
  @apply my-2 sm:my-4 text-center text-base text-gray-400 font-light tracking-wide;
}

.title {
  @apply mb-4 sm:mb-6 text-center text-2xl sm:text-3xl font-semibold;
}

.tags {
  @apply mb-8 sm:mb-10 text-center;
}

.thumbnail {
  @apply mb-8 sm:mb-10 w-full;
}

.content::v-deep {
  h1 {
    @apply mb-4 text-xl font-semibold;
  }

  p {
    @apply text-sm sm:text-base;
  }
}
</style>
