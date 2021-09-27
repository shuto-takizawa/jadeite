<template>
  <div v-if="team">
    <h1 class="page-title">{{ team.name }}</h1>
    <div class="grid grid-cols-4">
      <card
        v-for="member in team.members"
        :key="member.id"
        :member="member"
      />
    </div>
    <h3 class="page-sub-title">Team Result</h3>
    <div
      v-for="result in team.battle_record"
      :key="result.id"
    >
      <span>{{ $moment(result.result_data).format('YYYY/MM/DD') }}</span>
      <span>{{ result.result_content }}</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, useContext, useMeta, useFetch, ref } from '@nuxtjs/composition-api'
import { teams } from '~/types/cms-types'
import { MicroResponseType } from '~/types/microcms'
import Card from '~/components/atoms/member-card.vue'
export default defineComponent({
  components: { Card },
  head: {},
  watchQuery: ['name'],
  setup () {
    const { params, $microcms, error, redirect } = useContext()
    // TODO : meta設定
    const { title } = useMeta()
    const team = ref<teams>()
    useFetch(async () => {
      try {
        const { contents } = await $microcms.get<MicroResponseType<teams>>({
          endpoint: 'teams',
          queries: {
            limit: 1,
            filters: `name[equals]${params.value.name}`
          }
        })
        title.value = contents[0].name
        team.value = contents[0]
      } catch (e) {
        error({
          statusCode: 404,
        })
        if (process.server) redirect(404, '/')
      }
    })
    return {
      team
    }
  }
})
</script>
