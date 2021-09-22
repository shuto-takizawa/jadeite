<template>
  <div>
    <div class="flex">
      <!-- TODO : カルーセル -->
      <img class="hero-img" src="/hero1.jpg" alt="hero">
      <div>
        <a href="https://twitter.com/Team_Jadeite" target="blank"><fa class="block text-2xl text-blue-400" :icon='twitter' /></a>
        <a href="https://www.youtube.com/channel/UCZnHIffwda5od9Tmliopb5Q" target="blank"><fa class="block text-2xl text-red-500" :icon='youtube' /></a>
        <a href="" target="blank"><fa class="block text-2xl text-purple-500" :icon='twitch' /></a>
      </div>
    </div>

    <!-- ニュース一覧 -->
    <section>
      <h1>News</h1>
      <news-list :items='state.newsItems' />
    </section>

    <!-- スポンサー一覧 -->
    <section>
    </section>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, useAsync, useContext } from '@nuxtjs/composition-api'
import { twitter, twitch, youtube } from '~/utils/font-awesome'
import { news } from '~/types/cms-types'
import { MicroResponseType } from '~/types/microcms'
import NewsList from '~/components/molecules/news-list.vue'
import SponsorList from '~/components/molecules/sponsor-list.vue'

type State = {
  newsItems: news[]
}

export default defineComponent({
  components: {
    NewsList,
    SponsorList,
  },
  setup () {
    const { $log, $microcms, } = useContext()
    const state = reactive<State>({
      newsItems: [],
    })

    useAsync(async () => {
      const { contents } = await $microcms.get<MicroResponseType<news>>({
        endpoint: 'news',
        queries: {
          limit: 6,
          orders: 'publishedAt'
        }
      })
      $log.info('res:', contents)
      state.newsItems = contents
    })
    return {
      state,
      twitter,
      twitch,
      youtube,
    }
  }
})
</script>

<style lang="scss" scoped>
.hero-img {
  width: 90vw;
}
</style>
