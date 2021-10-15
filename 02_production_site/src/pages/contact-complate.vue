<template>
  <div>
    <h1 class="page-title">Contact Complate!</h1>
    <p class="mb-5 text-center text-xl font-semibold">お問い合わせが完了しました。</p>
    <div class="text-center">
      <nuxt-link  uxt-link to="/" class="px-2 py-1 text-white text-lg font-semibold bg-site-accent rounded-md transition-colors hover:bg-opacity-80">Topへ</nuxt-link>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  head: {
    title: 'Contact Complate',
    meta: [
      { hid: 'description', name: 'description', content: 'Jadeite問い合わせ窓口に、お問い合わせが完了しました。' },
    ]
  },
})
</script>
