<template>
  <footer class="mt-48 p-8">
    <div class="grid grid-cols-3 px-16">
      <logo :width="200" />
      <div class="grid grid-cols-2">
        <div>
          <nuxt-link class="link" to="/about">About us</nuxt-link>
          <nuxt-link class="link" to="/news">News</nuxt-link>
          <nuxt-link class="link" to="/member">Member</nuxt-link>
          <nuxt-link class="link" to="/sponsor">Sponsor</nuxt-link>
        </div>
        <div>
          <a href="https://anvil.ne.jp" target="blank" class="link">Anvil</a>
          <nuxt-link class="link" to="/contact">Contact us</nuxt-link>
          <nuxt-link class="link" to="/privacy-policy">Privacy policy</nuxt-link>
        </div>
      </div>
      <div>
        <p class="mb-2 font-semibold">Follow us.</p>
        <div>
          <a href="https://twitter.com/Team_Jadeite" target="blank"><fa class="icon" :icon='twitter' /></a>
          <a href="https://www.youtube.com/channel/UCZnHIffwda5od9Tmliopb5Q" target="blank"><fa class="icon" :icon='youtube' /></a>
          <a href="" target="blank"><fa class="icon" :icon='twitch' /></a>
        </div>
      </div>
    </div>
    <div class="divider" />
    <div class="text-center">
      <small class="tracking-wider">Copyright© 2021<a class="underline" href="https://anvil.ne.jp" target="blank">Anvil Co.Ltd.</a> All rights reserved.</small>
    </div>
  </footer>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
import { twitter, twitch, youtube } from '~/utils/font-awesome'
import Logo from '~/components/atoms/logo.vue'
export default defineComponent({
  components: {
    Logo,
  },
  setup () {
    return {
      twitter,
      twitch,
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
  @apply table mb-2 font-semibold;
}

.icon {
  @apply mr-4 text-3xl;
}
</style>
