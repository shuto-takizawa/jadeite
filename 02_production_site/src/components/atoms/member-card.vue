<template>
  <nuxt-link :to="`/member/${member.name}`">
    <nuxt-img :src="member.icon.url" :alt="member.name" format="webp" />
    <span>{{ member.name }}</span>
  </nuxt-link>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { members } from '~/types/cms-types'
export default defineComponent({
  props: {
    member: {
      type: Object as PropType<members>,
      required: true,
    }
  },
  setup () {

    return {

    }
  }
})
</script>
