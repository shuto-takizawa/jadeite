<template>
  <div class="container">
    <!-- チーム一覧 -->
    <section>
      <h2 class="pt-32 text-3xl font-semibold text-center">Teams</h2>
      <div class="my-10 short-divider" />
      <div v-if="teams" class="grid grid-cols-3">
        <team-card
          v-for="team in teams.contents"
          :key="team.id"
          :team="team"
        />
      </div>
    </section>

    <div class="my-20 short-divider" />

    <!-- メンバー一覧 -->
    <section v-if="members" class="grid grid-cols-5">
      <member-card
        v-for="member in members.contents"
        :key="member.id"
        :member="member"
      />
    </section>
  </div>
</template>

<script lang='ts'>
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { teams, members } from '~/types/cms-types'
import { MicroResponseType } from '~/types/microcms'
import TeamCard from '~/components/atoms/team-card.vue'
import MemberCard from '~/components/atoms/member-card.vue'
export default defineComponent({
  components: {
    TeamCard,
    MemberCard,
  },
  head: {
    title: 'Member',
    // TODO : meta設定
  },
  setup () {
    const { $microcms } = useContext()
    const teams = useAsync(() => $microcms.get<MicroResponseType<teams>>({
      endpoint: 'teams',
    }))
    const members = useAsync(() => $microcms.get<MicroResponseType<members>>({
      endpoint: 'members'
    }))
    return {
      teams,
      members,
    }
  }
})
</script>
