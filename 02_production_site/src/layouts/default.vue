<template>
  <div>
    <Header />
    <nuxt class="main" />
    <Footer />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
import Header from '~/components/organisms/header.vue'
import Footer from '~/components/organisms/footer.vue'
export default defineComponent({
  components: {
    Header,
    Footer,
  },
  setup () {
    return {

    }
  }
})
</script>

<style lang="scss" scoped>
.main {
  @apply mt-16;

  min-height: calc(100vh - #{($header-h + $footer-h)});
}
</style>
