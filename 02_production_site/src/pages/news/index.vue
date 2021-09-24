<template>
  <div>
    <h1 class="page-title">News</h1>
    <news-list v-if="newsItems" :items="newsItems.contents" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, useAsync, useContext } from '@nuxtjs/composition-api'
import { news } from '~/types/cms-types'
import { MicroResponseType } from '~/types/microcms'
import NewsList from '~/components/molecules/news-list.vue'

export default defineComponent({
  components: {
    NewsList,
  },
  head: {
    title: 'News',
    // TODO : meta設定
  },
  setup () {
    const { $microcms } = useContext()
    const newsItems = useAsync(() => $microcms.get<MicroResponseType<news>>({
        endpoint: 'news',
        queries: {
          orders: '-publishedAt'
        }
      })
    )
    return {
      newsItems,
    }
  }
})
</script>
