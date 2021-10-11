<template>
  <aside class="root" :class="{active:drawer}">
    <div class="my-10">
      <nuxt-link class="link" @click.native="hide" to="/news">News</nuxt-link>
      <nuxt-link class="link" @click.native="hide" to="/member">Member</nuxt-link>
      <nuxt-link class="link" @click.native="hide" to="/about">About</nuxt-link>
      <nuxt-link class="link" @click.native="hide" to="/sponsor">Sponsor</nuxt-link>
    </div>
    <div class="divider" />
    <div class="mb-10">
      <p class="mb-2 text-lg text-center">Follow us.</p>
      <div class="text-center">
        <a href="https://twitter.com/Team_Jadeite" target="blank"><fa class="icon" :icon='twitter' /></a>
        <a href="https://www.youtube.com/channel/UCZnHIffwda5od9Tmliopb5Q" target="blank"><fa class="icon" :icon='youtube' /></a>
      </div>
    </div>
  </aside>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
import { twitter, youtube } from '~/utils/font-awesome'
export default defineComponent({
  props: {
    drawer: {
      type: Boolean,
      default: false,
    }
  },
  setup (_, { emit }) {
    const hide = () => emit('hideSidebar')

    return {
      hide,
      twitter,
      youtube,
    }
  }
})
</script>

<style lang="scss" scoped>
.root {
  @apply fixed top-0 -right-full w-screen h-screen block sm:hidden p-10 bg-white transition-all duration-500 ease-in-out;

  &.active {
    @apply right-0;
  }

  .link {
    @apply table mx-auto mb-6 text-3xl font-semibold;
  }

  .divider {
    @apply mx-auto my-8 w-1/2 bg-gray-200;

    height: 1px;
  }

  .icon {
    @apply mx-2 text-xl;
  }
}
</style>
