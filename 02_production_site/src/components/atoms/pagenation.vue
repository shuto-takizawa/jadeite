<template>
  <div class="c-pagenation">
    <ul class="pager">
      <li v-if="1 < current">
        <nuxt-link :to="getPath(current - 1)">
          <span class="arrow left" />
        </nuxt-link>
      </li>
      <li v-if="3 < current" class="page">
        <nuxt-link :to="getPath(1)">
          1
        </nuxt-link>
      </li>
      <li v-if="4 < current" class="omission">
        ...
      </li>
      <li
        v-for="page in pager"
        v-show="current - 3 <= page && page <= current + 1"
        :key="page"
        class="page"
        :class="{ active: current === page + 1 }"
      >
        <nuxt-link :to="getPath(page + 1)">
          {{ page + 1 }}
        </nuxt-link>
      </li>
      <li v-if="current + 3 < pager.length" class="omission">
        ...
      </li>
      <li v-if="current + 2 < pager.length" class="page">
        <nuxt-link :to="getPath(pager.length)">
          {{ pager.length }}
        </nuxt-link>
      </li>
      <li v-if="current < pager.length" class="page arrow">
        <nuxt-link :to="getPath(current + 1)">
          <span class="arrow right" />
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    pager: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    current: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
    }
  },
  setup ({ path }) {
    const getPath = (page: number) => {
      return `/${path}/page/${page}`
    }
    return {
      getPath,
    }
  }
})
</script>

<style lang="scss" scoped>
.c-pagenation {
  @apply my-4;
}

.pager {
  @apply flex items-center justify-center;

  .page {
    @apply mx-1 px-4 py-2 text-base text-site-black font-semibold rounded-md cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-100;

    &.active {
      @apply text-gray-400 bg-gray-100 pointer-events-none cursor-default;
    }
  }
}

.arrow {
  --arrow-width: 50px;

  @include mq(sm) {
    --arrow-width: 80px;
  }

  $arrow-head-width: 15px;
  $arrow-thickness: 2px;

  @apply flex items-center relative h-4 mx-2;

  width: var(--arrow-width);

  &::before,
  &::after {
    @apply absolute block top-1/2 bg-site-black transition-all duration-300 ease-in-out;

    content: '';
    height: $arrow-thickness;
  }

  &::before { width: 100%; }
  &::after { width: $arrow-head-width; }

  &.left {
    &::after {
      @apply left-0;

      transform-origin: left center;
      transform: rotate(-25deg);
    }
  }

  &.right {
    &::after {
      @apply right-0;

      transform-origin: right center;
      transform: rotate(25deg);
    }
  }

  &:hover {
    &::before,
    &::after {
      @apply bg-opacity-30;
    }
  }
}
</style>
