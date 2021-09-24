<template>
  <div>
    <!-- チーム一覧 -->
    <section>
      <h2 class="pt-32 text-3xl font-semibold text-center">Teams</h2>
      <div class="my-10 short-divider" />
    </section>

    <div class="my-20 short-divider" />

    <!-- メンバー一覧 -->
    <section>

    </section>
  </div>
</template>

<script lang='ts'>
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { teams, members } from '~/types/cms-types'
import { MicroResponseType } from '~/types/microcms'
export default defineComponent({
  setup () {
    const { $microcms } = useContext()
    const temas = useAsync(() => $microcms.get<MicroResponseType<teams>>({
      endpoint: 'teams',
    }))
    const members = useAsync(() => $microcms.get<MicroResponseType<members>>({
      endpoint: 'members'
    }))
    return {
      temas,
      members,
    }
  }
})
</script>
