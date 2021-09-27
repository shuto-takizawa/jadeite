<template>
  <article v-if="news">
    <p class="date">{{ $moment(news.publishedAt).format('YYYY/MM/DD') }}</p>
    <h1>{{ news.title }}</h1>
    <tag v-for="tag in news.tags" :key="tag.id" :tag="tag" />
    <div v-html="news.content" />
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
  @apply my-4 text-center;
}
</style>
