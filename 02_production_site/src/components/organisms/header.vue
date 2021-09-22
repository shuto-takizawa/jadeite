<template>
  <header class="flex items-center justify-between fixed top-0 px-8 py-4 h-16 w-full bg-white">
    <nuxt-link to="/">
      <logo :width='150' />
    </nuxt-link>
    <div class="hidden sm:block">
      <nuxt-link class="link" to="/news">News</nuxt-link>
      <nuxt-link class="link" to="/member">Member</nuxt-link>
      <nuxt-link class="link" to="/about">About</nuxt-link>
      <nuxt-link class="link" to="/sponsor">Sponsor</nuxt-link>
    </div>
  </header>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
import Logo from '~/components/atoms/logo.vue'
export default defineComponent({
  components: {
    Logo
  },
  setup () {
    return {

    }
  }
})
</script>

<style lang="scss" scoped>
.link {
  @apply ml-8 text-xl font-semibold;
}
</style>
