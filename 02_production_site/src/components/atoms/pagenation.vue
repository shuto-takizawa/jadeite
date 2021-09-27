<template>
  <div class="root">
    <ul>
      <li v-if="1 < current">
        <nuxt-link :to="getPath(current - 1)">
          ←
        </nuxt-link>
      </li>
      <li v-if="3 < current">
        <nuxt-link :to="getPath(1)">
          1
        </nuxt-link>
      </li>
      <li v-if="4 < current">
        ...
      </li>
      <li
        v-for="page in pager"
        v-show="current - 3 <= page && page <= current + 1"
        :key="page"
      >
        <nuxt-link :to="getPath(page + 1)">
          {{ page + 1 }}
        </nuxt-link>
      </li>
      <li v-if="current + 3 < pager.length">
        ...
      </li>
      <li v-if="current + 2 < pager.length">
        <nuxt-link :to="getPath(pager.length)">
          {{ pager.length }}
        </nuxt-link>
      </li>
      <li v-if="current < pager.length">
        <nuxt-link :to="getPath(current + 1)">
          →
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
ul {
  @apply text-center;

  li {
    @apply inline-block;
  }
}
</style>
