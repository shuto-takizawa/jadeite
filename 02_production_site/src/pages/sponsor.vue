<template>
  <div v-if="sponsors">
    {{ sponsors.contents }}
  </div>
</template>

<script lang='ts'>
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { sponsors } from '~/types/cms-types'
import { MicroResponseType } from '~/types/microcms'
export default defineComponent({
  setup () {
    const { $microcms } = useContext()
    const sponsors = useAsync(() => $microcms.get<MicroResponseType<sponsors>>({
      endpoint: 'sponsors'
    }))
    return {
      sponsors,
    }
  }
})
</script>
