<template>
  <nuxt-link :to="`/news/${news.id}`">
    <div class="mb-4 p-2 rounded-md overflow-hidden">
      <nuxt-img :src="news.thumbnail.url" :alt="news.title" />
      <h3>{{ news.title }}</h3>
      <p>{{ $moment(news.publishedAt).format('YYYY/MM/DD') }}</p>
      <tag v-for="tag in news.tags" :key="tag.id" :tag="tag" small />
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
})
</script>
