<template>
  <div>
    <div class="flex mb-20">
      <!-- TODO : カルーセル -->
      <!-- https://howhere.jp/ -->
      <img class="hero-img" src="/hero1.jpg" alt="hero">
      <div>
        <a href="https://twitter.com/Team_Jadeite" target="blank"><fa class="block text-2xl" :icon='twitter' /></a>
        <a href="https://www.youtube.com/channel/UCZnHIffwda5od9Tmliopb5Q" target="blank"><fa class="block text-2xl" :icon='youtube' /></a>
        <a href="" target="blank"><fa class="block text-2xl" :icon='twitch' /></a>
        <span>Scroll</span>
      </div>
    </div>

    <!-- ニュース一覧 -->
    <section class="container">
      <div class="flex justify-between">
        <h1 class="mb-4 text-3xl font-semibold">News</h1>
        <nuxt-link class="link-arrow" to="/news">View all</nuxt-link>
      </div>
      <div v-if="newsItems">
        <news-list :items='newsItems.contents' :type="'card'" />
      </div>
      <div v-else>
        <p>Newsがありません。</p>
      </div>
    </section>

    <div class="my-20 short-divider" />

    <!-- スポンサー一覧 -->
    <section v-if="sponsors" class="container max-w-5xl grid grid-cols-4">
      <a
        v-for="sponsor in sponsors"
        :key="sponsor.id"
        :href="sponsor.url"
        target="blank"
      >
      <!-- <a
        v-for="sponsor in sponsors.contents"
        :key="sponsor.id"
        :href="sponsor.url"
        target="blank"
      > -->
        <nuxt-img
          :src="sponsor.logo.url"
          :alt="sponsor.name"
          format="webp"
        />
      </a>
    </section>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, useAsync, useFetch, useContext } from '@nuxtjs/composition-api'
import { twitter, twitch, youtube } from '~/utils/font-awesome'
import { news, sponsors } from '~/types/cms-types'
import { MicroResponseType } from '~/types/microcms'
import NewsList from '~/components/molecules/news-list.vue'
import SponsorList from '~/components/molecules/sponsor-list.vue'

export default defineComponent({
  layout: 'top',
  components: {
    NewsList,
    SponsorList,
  },
  head: {
    title: 'Jadeite',
    titleTemplate: '',
    // TODO : meta設定
  },
  setup () {
    const { $microcms } = useContext()
    // const newsItems = useAsync(() => $microcms.get<MicroResponseType<news>>({
    //   endpoint: 'news',
    //   queries: {
    //     limit: 6,
    //     orders: '-publishedAt'
    //   }
    // }))
    const sponsors = ref()
    useFetch(async () => {
      const data = await $microcms.get<MicroResponseType<sponsors>>({endpoint: 'sponsors'})
      sponsors.value = data.contents
    })
    // const sponsors = useAsync(() => $microcms.get<MicroResponseType<sponsors>>({endpoint: 'sponsors'}))

    return {
      // newsItems,
      sponsors,
      twitter,
      twitch,
      youtube,
    }
  },
})
</script>

<style lang="scss" scoped>
.hero-img {
  // width: 90vw;
  height: calc(100vh - #{$header-h});
}

.link-arrow {
  @apply relative inline-block font-light text-gray-300 hover:text-gray-500 transition-colors duration-300 ease-in-out;

  &::before {
    @apply absolute top-0 right-0 bg-gray-300 transition-all duration-300 ease-in-out;

    content: '';
    width: 80%;
    height: 1px;
  }
}
</style>
