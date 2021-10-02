<template>
  <div>
    <div class="flex mb-20">
      <!-- TODO : カルーセル -->
      <!-- https://howhere.jp/ -->
      <img class="hero-img" src="/hero1.jpg" alt="hero">
      <div class="hidden lg:block">
        <a href="https://twitter.com/Team_Jadeite" target="blank"><fa class="block text-2xl" :icon='twitter' /></a>
        <a href="https://www.youtube.com/channel/UCZnHIffwda5od9Tmliopb5Q" target="blank"><fa class="block text-2xl" :icon='youtube' /></a>
        <a href="" target="blank"><fa class="block text-2xl" :icon='twitch' /></a>
        <!-- https://codepen.io/sego/pen/bQZKwP -->
        <!-- https://codepen.io/pavelderschleifer/pen/jAXpgq -->
        <span>Scroll</span>
      </div>
    </div>

    <!-- ニュース一覧 -->
    <section class="container px-4 sm:px-8">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-xl sm:text-3xl font-semibold">News</h1>
        <nuxt-link class="link-arrow" to="/news">
          <span class="arrow left">
            <span  class="shaft" />
          </span>
          <span class="arrow-main">
            <span class="arrow-text">View all</span>
            <span class="arrow right">
              <span class="shaft" />
            </span>
          </span>
        </nuxt-link>
      </div>
      <div v-if="newsItems">
        <news-list :items='newsItems' :type="'card'" />
      </div>
      <div v-else>
        <p class="mt-10 text-xl font-semibold">Newsがありません</p>
      </div>
    </section>

    <div class="my-20 short-divider" />

    <!-- スポンサー一覧 -->
    <section class="container px-8 max-w-5xl">
      <div v-if="sponsors" class="grid grid-cols-2 lg:grid-cols-4">
        <a
          v-for="sponsor in sponsors"
          :key="sponsor.id"
          :href="sponsor.url"
          target="blank"
          class="p-2"
        >
          <nuxt-img
            :src="sponsor.logo.url"
            :alt="sponsor.name"
            format="webp"
          />
        </a>
      </div>
      <div v-else>
        <p class="text-xl font-semibold text-center">スポンサー募集中です</p>
      </div>
    </section>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, useFetch, useContext } from '@nuxtjs/composition-api'
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
    const newsItems = ref<news[]>()
    useFetch(async () => {
      const { contents } = await $microcms.get<MicroResponseType<news>>({
        endpoint: 'news',
        queries: {
          limit: 6,
          orders: '-publishedAt'
        }
      })
      newsItems.value = contents
    })
    const sponsors = ref()
    useFetch(async () => {
      const { contents } = await $microcms.get<MicroResponseType<sponsors>>({endpoint: 'sponsors'})
      sponsors.value = contents
    })

    return {
      newsItems,
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

/** 矢印リンク */
.link-arrow {
  $black: $site-black;
  $white: #eaeaea;
  $gray: #999;

  --text-arrow-space: 10px;
  --shaft-width: 30px;

  @include mq(sm) {
    --text-arrow-space: 16px;
    --shaft-width: 64px;
  }

  $text-arrow-space: 16px;
  $shaft-width: 64px;
  $shaft-thickness: 1px;
  $arrow-head-width: 8px;
  $arrow-head-thickness: $shaft-thickness;

  @apply relative inline-block text-base italic no-underline;

  color: $gray;
  // font-size: 1.25em;
  transition: all 0.2s;

  .arrow {
    width: var(--shaft-width);
    transition: all 0.2s;

    > .shaft {
      background-color: $gray;
      display: block;
      height: $shaft-thickness;
      position: relative;
      transition: all 0.2s;
      transition-delay: 0;
      will-change: transform;

      &::before,
      &::after {
        @apply absolute top-0 right-0 block;

        background-color: $gray;
        content: '';
        height: $arrow-head-thickness;
        transition: all 0.2s;
        transition-delay: 0;
      }

      &::before { transform-origin: top right; }
      &::after { transform-origin: bottom right; }
    }

    &.left {
      @apply absolute left-0;

      top: 60%;

      > .shaft {
        width: 0;
        background-color: $gray;

        &::before,
        &::after {
          width: 0;
          background-color: $gray;
        }

        &::before { transform: rotate(0); }
        &::after { transform: rotate(0); }
      }
    }

    &.right {
      top: 3px;

      > .shaft {
        width: var(--shaft-width);
        transition-delay: 0.2s;

        &::before,
        &::after {
          width: $arrow-head-width;
          transition: all 0.5s;
          transition-delay: 0.3s;
        }

        &::before { transform: rotate(40deg); }
        &::after { transform: rotate(-40deg); }
      }
    }
  }

  > .arrow-main {
    @apply flex items-center;

    transition: all 0.2s;

    > .arrow-text {
      @apply text-sm sm:text-base;

      margin: 0 var(--text-arrow-space) 0 0;
      line-height: 1;
    }

    > .arrow { position: relative; }
  }

  &:hover {
    color: $white;

    > .arrow.left > .shaft {
      width: var(--shaft-width);
      transition-delay: 0.1s;
      background-color: $white;

      &::before,
      &::after {
        width: $arrow-head-width;
        transition-delay: 0.1s;
        background-color: $white;
      }

      &::before { transform: rotate(40deg); }
      &::after { transform: rotate(-40deg); }
    }

    > .arrow-main {
      transform: translateX(calc(var(--shaft-width) + var(--text-arrow-space)));

      > .arrow.right > .shaft {
        width: 0;
        transform: translateX(200%);
        transition-delay: 0;

        &::before,
        &::after {
          width: 0;
          transition: all 0.1s;
          transition-delay: 0;
        }

        &::before { transform: rotate(0); }
        &::after { transform: rotate(0); }
      }
    }
  }
}
</style>
