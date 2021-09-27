<template>
  <div class="grid grid-cols-2" v-if="member">
    <div>
      <h3>{{ member.name }}</h3>
      <p>{{ member.description }}</p>
    </div>
    <div>
      <nuxt-img :src="member.icon.url" :alt="member.name" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, useContext, useMeta, useFetch, ref } from '@nuxtjs/composition-api'
import { members } from '~/types/cms-types'
import { MicroResponseType } from '~/types/microcms'
export default defineComponent({
  head: {},
  watchQuery: ['name'],
  setup () {
    const { params, $microcms, error, redirect } = useContext()
    const { title } = useMeta()
    const member = ref<members>()
    useFetch(async () => {
      try {
        const { contents } = await $microcms.get<MicroResponseType<members>>({
          endpoint: 'members',
          queries: {
            limit: 1,
            filters: `name[equals]${params.value.name}`
          }
        })
        title.value = contents[0].name
        member.value = contents[0]
      } catch (e) {
        error({
          statusCode: 404
        })
        if (process.server) redirect(404, '/')
      }
    })
    return {
      member
    }
  }
})
</script>
