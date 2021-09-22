<template>
  <footer class="">
    <logo />
    <div>
      <nuxt-link to="/about">About us</nuxt-link>
      <nuxt-link to="/news">News</nuxt-link>
      <nuxt-link to="/member">Member</nuxt-link>
      <nuxt-link to="/sponsor">Sponsor</nuxt-link>
      <a href="https://anvil.ne.jp" target="blank">Anvil</a>
      <nuxt-link to="/contact">Contact us</nuxt-link>
      <nuxt-link to="/privacy-policy">Privacy policy</nuxt-link>
    </div>
    <div>
      <p>Follow us.</p>
      <!-- TODO : SNS Icon 挿入 -->
    </div>
    <div>
      <small>Copyright© 2021<a href="https://anvil.ne.jp" target="blank">Anvil Co.Ltd.</a> All rights reserved.</small>
    </div>
  </footer>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
import Logo from '~/components/atoms/logo.vue'
export default defineComponent({
  components: {
    Logo,
  },
  setup () {
    return {

    }
  }
})
</script>
