<template>
  <div>
    <Header />
    <nuxt class="main container max-w-5xl px-4 sm:px-8" />
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
})
</script>
