<template>
  <div>
    <h1 class="page-title">Contact Complate!</h1>
    <p>お問い合わせが完了しました。</p>
    <nuxt-link to="/">Topへ</nuxt-link>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  head: {
    title: 'Contact Complate'
    // TODO : meta設定
  },
  setup () {

    return {

    }
  }
})
</script>
