<template>
  <div v-if="items && items.length" class="root" :class="type">
    <component v-for="news in items" :key="news.id" :is="type" :news="news" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { news } from '~/types/cms-types'
import Card from '~/components/atoms/news-card.vue'
import ListCard from '~/components/atoms/news-list-card.vue'
export default defineComponent({
  components:{
    card: Card,
    list: ListCard,
  },
  props: {
    items: {
      type: Array as PropType<news[]>,
      required: true,
    },
    type: {
      type: String as PropType<'card' | 'list'>,
      default: 'list'
    }
  },
})
</script>

<style lang="scss" scoped>
// 共通のスタイル
.root {
  @apply grid py-2;
}

// リストスタイル
.list {
  @apply grid-cols-1;
}

// カードスタイル
.card {
  @apply grid-cols-3;
}
</style>
