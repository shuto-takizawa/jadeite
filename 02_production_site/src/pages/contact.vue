<template>
  <div>
    <h1 class="page-title">Contact us</h1>
    <p class="text-center">Team Jadeiteへのお問い合わせはこちらから入力ください。</p>
    <div class="container max-w-3xl">
      <div class="grid grid-cols-4">
        <span>お名前</span>
        <input type="text" class="border-2 col-span-3">
      </div>
      <div class="grid grid-cols-4">
        <span>メール</span>
        <input type="email" class="border-2 col-span-3">
      </div>
      <div class="grid grid-cols-4">
        <span>内容</span>
        <textarea class="border-2 col-span-3" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  head: {
    title: 'Contact us'
    // TODO : meta設定
  },
  setup () {

    return {

    }
  }
})
</script>
