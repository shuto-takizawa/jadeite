<template>
  <nuxt-link :to="`/news/${news.id}`" class="mb-5 flex">
    <div class="img">
      <img :src="news.thumbnail.url" :alt="news.title">
    </div>
    <div>
      <p>{{ news.publishedAt }}</p>
      <h3>{{ news.title }}</h3>
      <tag v-for="tag in news.tags" :key="tag.id" :tag="tag" />
    </div>
  </nuxt-link>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { news } from '~/types/cms-types'
import Tag from '~/components/atoms/tag.vue'
export default defineComponent({
  components: {
    Tag,
  },
  props: {
    news: {
      type: Object as PropType<news>,
      required: true,
    }
  },
  setup () {

    return {

    }
  }
})
</script>

<style lang="scss" scoped>
.img {
  flex-basis: 20%;
}
</style>
