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
import { parse } from 'node-html-parser'
import { news } from '~/types/cms-types'
import Tag from '~/components/atoms/tag.vue'
export default defineComponent({
  components: {
    Tag,
  },
  head: {},
  watchQuery: ['slug'],
  setup () {
    const { params, $microcms, $log, error, redirect, $truncate, $config } = useContext()
    const news = ref<news>()
    const description = ref<string>('')
    useFetch(async () => {
      try {
        const res = await $microcms.get<news>({
          endpoint: 'news',
          contentId: params.value.slug
        })
        news.value = res
        const str = parse(news.value.content).text
        description.value = $truncate(str, 60)
      } catch (e) {
        error({
          statusCode: 404,
        })
        if (process.server) redirect(404, '/')
      }
    })
    $log.info('news result:', news.value)

    useMeta(() => ({
      title: news.value?.title,
      meta: [
        { hid: 'description', name: 'description', content: description.value },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:url', property: 'og:url', content: `${$config.BASE_URL}/news/${news.value?.id || ''}` },
        { hid: 'og:title', property: 'og:title', content: `${news.value?.title || ''} | Jadeite` },
        { hid: 'og:description', property: 'og:description', content: description.value },
        { hid: 'og:image', property: 'og:image', content: news.value?.thumbnail.url || `${$config.BASE_URL}/ogp-image.webp` },
      ]
    }))

    return {
      news,
    }
  },
})
</script>

<style lang="scss" scoped>
.date {
  @apply my-2 sm:my-4 text-center text-sm sm:text-base text-gray-400 font-light tracking-wide;
}

.title {
  @apply mb-4 sm:mb-6 text-center text-2xl sm:text-3xl font-semibold break-all;
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
    @apply text-base;
  }

  img {
    @apply mx-auto;
  }

  a {
    @apply underline transition-colors duration-300 ease-in-out hover:text-gray-400;
  }
}
</style>
