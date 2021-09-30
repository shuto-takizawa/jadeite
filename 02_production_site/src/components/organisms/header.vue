<template>
  <div>
    <header class="flex items-center justify-between fixed top-0 px-4 sm:px-8 py-4 h-16 w-full bg-white z-10">
      <nuxt-link to="/">
        <logo class="w-24 sm:w-32" />
      </nuxt-link>
      <div class="hidden sm:block">
        <nuxt-link class="link" to="/news">News</nuxt-link>
        <nuxt-link class="link" to="/member">Member</nuxt-link>
        <nuxt-link class="link" to="/about">About</nuxt-link>
        <nuxt-link class="link" to="/sponsor">Sponsor</nuxt-link>
      </div>

      <!-- サイドバー -->
      <div class="block sm:hidden z-10">
        <hamburger-btn @click.native="toggleDrawe" :drawer="drawer" />
      </div>
      <sidebar :drawer="drawer" @hideSidebar="toggleDrawe" />
    </header>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import Logo from '~/components/atoms/logo.vue'
import Sidebar from '~/components/organisms/sidebar.vue'
import HamburgerBtn from '~/components/atoms/hamburger-btn.vue'
export default defineComponent({
  components: {
    Logo,
    Sidebar,
    HamburgerBtn,
  },
  setup () {
    const drawer = ref<boolean>(false)
    const toggleDrawe = () => {
      console.log('toggle')
      drawer.value = !drawer.value
    }

    return {
      drawer,
      toggleDrawe,
    }
  }
})
</script>

<style lang="scss" scoped>
.link {
  @apply ml-8 pb-1 text-xl font-semibold;

  background:
    linear-gradient(currentColor 0 0) left  var(--p, 50%) bottom 0 / var(--d, 30%) 2px no-repeat,
    linear-gradient(currentColor 0 0) right var(--p, 50%) bottom 0 / var(--d, 30%) 2px no-repeat;
  transition: 0.3s, background-position 0.3s 0.3s;

  &:hover {
    --d: 90%;
    --p: 50.1%;

    transition: cubic-bezier(0, 500, 1, 500) 0.3s, background-size 0.3s 0.3s;
  }
}
</style>
