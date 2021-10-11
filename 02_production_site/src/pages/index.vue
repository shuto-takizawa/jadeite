<template>
  <div>
    <div class="hero-wrapper">
      <div class="slider">
        <transition-group name='fade'>
          <img
           v-for="(slide, idx) in slides"
           :key="slide"
           v-show="idx === current"
           :src="slides[idx]"
           alt="Hero Image"
           class="slider-img"
          />
          <!-- <nuxt-img
           v-for="(slide, idx) in slides"
           :key="slide"
           v-show="idx === current"
           :src="slides[idx]"
           alt="Hero Image"
           class="slider-img"
          /> -->
        </transition-group>
        <div class="block lg:hidden absolute bottom-1 z-10 left-1/2 transform -translate-x-1/2 text-center">
          <p class="mb-1 text-xl text-white font-semibold">SCROLL</p>
          <fa class="text-2xl text-white " :icon="chevronDown" />
        </div>
      </div>
      <div class="side">
        <div>
          <a href="https://twitter.com/Team_Jadeite" target="blank"><fa class="icon" :icon='twitter' /></a>
        </div>
        <div>
          <a href="https://www.youtube.com/channel/UCZnHIffwda5od9Tmliopb5Q" target="blank"><fa class="icon" :icon='youtube' /></a>
        </div>
        <div>
          <a href="" target="blank"><fa class="icon" :icon='twitch' /></a>
        </div>
        <div class="scroll">
          <span class="scroll-arrow">
            <span />
          </span>
          <span class="scroll-line" />
          <span class="scroll-text">Scroll</span>
        </div>
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
      <div v-if="newsItems && newsItems.length">
        <news-list :items='newsItems' :type="'card'" />
      </div>
      <div v-else>
        <p class="mt-10 text-xl font-semibold">Newsがありません</p>
      </div>
    </section>

    <div class="my-20 short-divider" />

    <!-- スポンサー一覧 -->
    <section class="container px-8 max-w-5xl">
      <div v-if="sponsors && sponsors.length" class="grid grid-cols-2 lg:grid-cols-4">
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
import { defineComponent, ref, useFetch, useContext, onMounted } from '@nuxtjs/composition-api'
import { twitter, twitch, youtube, chevronDown } from '~/utils/font-awesome'
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

    const slides = ref([
      'hero-image.png',
      // 'hero1.jpg',
      // 'hero2.jpg',
      // 'hero3.png',
    ])

    const current = ref(0)

    onMounted(() => {
      setInterval(() => {
        current.value = current.value < slides.value.length - 1 ? current.value + 1 : 0
      }, 6000)
    })

    return {
      newsItems,
      sponsors,
      twitter,
      twitch,
      youtube,
      chevronDown,
      slides,
      current,
    }
  },
})
</script>

<style lang="scss" scoped>
.hero-wrapper {
  --side-w: 0rem;

  @include mq(lg) {
    --side-w: 8rem;
  }

  @apply relative mb-20 overflow-hidden flex;

  height: calc(100vh - #{$header-h});

  /** ヒーロー画像スライド */
  .slider {
    @apply relative h-full overflow-hidden;

    width: calc(100% - var(--side-w));

    .slider-img {
      @apply absolute w-full h-full object-cover;
    }
  }

  /** ヒーロー画像のスライドアニメーション */
  .fade-enter-active,
  .fade-leave-active {
    @apply transition-all duration-1000 ease-in-out;
  }

  .fade-enter,
  .fade-leave-to {
    @apply opacity-0;
  }

  .side {
    @apply relative hidden lg:block h-full text-center;

    width: var(--side-w);

    .icon {
      @apply my-4 text-3xl;
    }

    .scroll {
      $self: &;
      $arrow-thickness: 2px;

      @apply absolute bottom-0 right-1/2 inline-flex items-center;

      padding: 5px;
      transform-origin: right bottom;
      transform: rotate(-90deg) translate3d(300px, 50%, 0);

      &-arrow {
        @apply inline-flex;

        span {
          @apply relative overflow-hidden z-20 bg-gray-400 rounded-sm;

          width: 14px;
          height: $arrow-thickness;

          &:nth-child(1) {
            transform-origin: left bottom;
            transform: rotate(45deg);
          }

          &::after {
            @apply block absolute left-0 w-0 bg-site-accent;

            content: '';
            height: $arrow-thickness;
            // animation: animation-arrow 1s infinite;
            // animation-delay: 5s;
          }
        }
      }

      &-line {
        @apply relative bg-gray-400 overflow-hidden z-10;

        margin-left: -14px;
        margin-right: 30px;
        width: 150px;
        height: $arrow-thickness;

        &::after {
          @apply block absolute bg-site-accent;

          content: '';
          left: 80px;
          width: 70px;
          height: $arrow-thickness;
          // animation: animation-line 5s infinite;
        }
      }

      &-text {
        @apply text-site-black text-lg;

        text-transform: uppercase;
        transform: rotate(180deg);
      }
    }
  }
}

@keyframes animation-line {
  0% {
    left: 80px;
  }

  100% {
    left: 0;
  }
}

@keyframes animation-arrow {
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
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
