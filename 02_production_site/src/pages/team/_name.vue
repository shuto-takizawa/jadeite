<template>
  <div v-if="team">
    <h1 class="page-title">{{ team.name }}</h1>
    <p class="mb-6 text-lg font-bold whitespace-pre-line">{{ team.description }}</p>
    <div v-if="team.members && team.members.length" class="grid grid-cols-2 sm:grid-cols-4">
      <card
        v-for="member in team.members"
        :key="member.id"
        :member="member"
      />
    </div>
    <p v-else class="text-base font-semibold">Memberがいません</p>
    <h3 class="page-sub-title">Team Result</h3>
    <div v-if="team.battle_record && team.battle_record.length">
      <div
        class="flex items-baseline mb-4"
        v-for="result in team.battle_record"
        :key="result.id"
      >
        <span class="text-sm sm:text-base">{{ $moment(result.result_data).format('YYYY/MM/DD') }}</span>
        <span class="px-2 text-sm sm:text-base sm:leading-4 whitespace-pre-wrap">{{ result.result_content }}</span>
      </div>
    </div>
    <p v-else class="text-base font-semibold">戦績がありません</p>
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
    const { params, $microcms, error, redirect, $truncate, $config } = useContext()
    const team = ref<teams>()
    const description = ref<string>('')
    useFetch(async () => {
      try {
        const { contents } = await $microcms.get<MicroResponseType<teams>>({
          endpoint: 'teams',
          queries: {
            limit: 1,
            filters: `name[equals]${params.value.name}`
          }
        })
        team.value = contents[0]
        description.value = $truncate(team.value.description, 60)
      } catch (e) {
        error({
          statusCode: 404,
        })
        if (process.server) redirect(404, '/')
      }
    })

    useMeta(() => ({
      title: team.value?.name,
      meta: [
        { hid: 'description', name: 'description', content: description.value },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:url', property: 'og:url', content: `${$config.BASE_URL}/team/${team.value?.name || ''}` },
        { hid: 'og:title', property: 'og:title', content: `${team.value?.name || ''} | Jadeite` },
        { hid: 'og:description', property: 'og:description', content: description.value },
      ]
    }))
    return {
      team
    }
  }
})
</script>
