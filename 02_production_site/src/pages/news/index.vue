<template>
  <div>
    <h1 class="page-title">News</h1>
    <news-list v-if="newsItems && newsItems.length" :items="newsItems" />
    <p v-else class="text-center text-xl font-semibold">Newsがありません</p>
    <pagenation :pager="pager" :current="current" path="news" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, useContext, useFetch, ref } from '@nuxtjs/composition-api'
import { news } from '~/types/cms-types'
import { MicroResponseType } from '~/types/microcms'
import NewsList from '~/components/molecules/news-list.vue'
import Pagenation from '~/components/atoms/pagenation.vue'

export default defineComponent({
  components: {
    NewsList,
    Pagenation,
  },
  head: {
    title: 'News',
    meta: [
      { hid: 'description', name: 'description', content: 'Jadeiteに関するニュースを発信しています。' },
    ]
  },
  setup () {
    const { $microcms, params } = useContext()
    const page = Number(params.value.page) || 1
    const limit = 6
    const offset = (page-1) * limit
    const newsItems = ref<news[]>()
    const pager = ref<number[]>()
    const current = ref<number>()
    current.value = page
    useFetch(async () => {
      const { contents, totalCount } = await $microcms.get<MicroResponseType<news>>({
        endpoint: 'news',
        queries: {
          orders: '-publishedAt',
          limit,
          offset,
        }
      })
      newsItems.value = contents
      pager.value = [...Array(Math.ceil(totalCount/limit)).keys()]
    })
    return {
      newsItems,
      current,
      pager,
    }
  }
})
</script>
