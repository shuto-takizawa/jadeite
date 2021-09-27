<template>
  <div>
    <h1 class="page-title">Sponsor</h1>
    <sponsor-list v-if="sponsors" :sponsors="sponsors" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, useContext, useFetch, ref } from '@nuxtjs/composition-api'
import { sponsors } from '~/types/cms-types'
import { MicroResponseType } from '~/types/microcms'
import SponsorList from '~/components/molecules/sponsor-list.vue'

export default defineComponent({
  components: { SponsorList },
  head: {
    title: 'Sponsor'
    // TODO : meta設定
  },
  setup () {
    const { $microcms } = useContext()
    const sponsors = ref<sponsors[]>()
    useFetch(async () => {
      const { contents } = await $microcms.get<MicroResponseType<sponsors>>({endpoint: 'sponsors'})
      sponsors.value = contents
    })
    return {
      sponsors,
    }
  }
})
</script>
