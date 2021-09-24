<template>
  <article v-if="news">
    <p class="date">{{ $moment(news.publishedAt).format('YYYY/MM/DD') }}</p>
    <h1>{{ news.title }}</h1>
    <tag v-for="tag in news.tags" :key="tag.id" :tag="tag" />
    <div v-html="news.content" />
  </article>
</template>

<script lang='ts'>
import { defineComponent, useAsync, useContext, useMeta } from '@nuxtjs/composition-api'
import { news } from '~/types/cms-types'
import Tag from '~/components/atoms/tag.vue'
export default defineComponent({
  layout: 'simple',
  components: {
    Tag,
  },
  head: {},
  watchQuery: ['slug'],
  setup () {
    const { params, $microcms, $log } = useContext()
    const { title } = useMeta()
    const news = useAsync(async () => {
      const res = await $microcms.get<news>({
        endpoint: 'news',
        contentId: params.value.slug
      })
      title.value = res.title
      return res
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
