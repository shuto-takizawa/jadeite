<template>
  <footer class="mt-20 sm:mt-48 p-8">
    <div class="grid grid-cols-1 lg:grid-cols-3 lg:px-16">
      <div class="mb-6">
        <nuxt-link to="/">
          <logo class="w-28 sm:w-48" />
        </nuxt-link>
      </div>
      <div class="grid grid-cols-2 mb-6">
        <div class="text-right sm:text-left">
          <nuxt-link class="link" to="/about">About us</nuxt-link>
          <nuxt-link class="link" to="/news">News</nuxt-link>
          <nuxt-link class="link" to="/member">Member</nuxt-link>
          <nuxt-link class="link" to="/gallery">Gallery</nuxt-link>
        </div>
        <div>
          <a href="https://anvil.ne.jp" target="blank" class="link">Anvil</a>
          <nuxt-link class="link" to="/sponsor">Sponsor</nuxt-link>
          <nuxt-link class="link" to="/contact">Contact us</nuxt-link>
          <nuxt-link class="link" to="/privacy-policy">Privacy policy</nuxt-link>
        </div>
      </div>
      <div>
        <p class="mb-2 text-sm sm:text-base font-semibold">Follow us.</p>
        <div>
          <a href="https://twitter.com/Team_Jadeite" target="blank"><fa class="icon" :icon='twitter' /></a>
          <a href="https://www.youtube.com/channel/UCZnHIffwda5od9Tmliopb5Q" target="blank"><fa class="icon" :icon='youtube' /></a>
        </div>
      </div>
    </div>
    <div class="divider" />
    <div class="text-center">
      <small class="text-xs sm:text-base tracking-wider">Copyright© 2021<a class="underline" href="https://anvil.ne.jp" target="blank">Anvil Co.Ltd.</a> All rights reserved.</small>
    </div>
  </footer>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
import { twitter, youtube } from '~/utils/font-awesome'
import Logo from '~/components/atoms/logo.vue'
export default defineComponent({
  components: {
    Logo,
  },
  setup () {
    return {
      twitter,
      youtube,
    }
  }
})
</script>

<style lang="scss" scoped>
.divider {
  @apply my-8 w-full bg-gray-200;

  height: 1px;
}

.link {
  @apply table mb-2 text-sm sm:text-base font-semibold;
}

.icon {
  @apply mr-4 text-xl sm:text-3xl;
}
</style>
