<template>
  <div class="px-8">
    <section class="pt-20 sm:32 grid grid-cols-1 lg:grid-cols-2 gap-8" v-if="member">
      <div class="order-2 lg:order-1">
        <div class="flex items-end justify-between">
          <h3 class="text-xl sm:text-4xl font-semibold">{{ member.name }}</h3>
          <div>
            <a
              v-show="member.twitter"
              :href="member.twitter"
              target="blank"
            >
              <fa :icon="twitter" class="icon" />
            </a>
            <a
              v-show="member.youtube"
              :href="member.youtube"
              target="blank"
            >
              <fa :icon="youtube" class="icon" />
            </a>
            <a
              v-show="member.twitch"
              :href="member.twitch"
              target="blank"
            >
              <fa :icon="twitch" class="icon" />
            </a>
          </div>
        </div>
        <div class="divider" />
        <p class="text-sm sm:text-base whitespace-pre-line">{{ member.description }}</p>
      </div>
      <figure class="order-1 lg:order-2">
        <nuxt-img
          class="mx-auto lg:w-2/3 rounded-3xl"
          v-if="member.icon"
          :src="member.icon.url"
          :alt="member.name"
          format="webp"
        />
        <nuxt-img
          class="mx-auto lg:w-2/3 rounded-3xl"
          v-else
          src="/no-image.png"
          :alt="member.name"
          format="webp"
        />
      </figure>
    </section>
  </div>
</template>

<script lang='ts'>
import { defineComponent, useContext, useMeta, useFetch, ref } from '@nuxtjs/composition-api'
import { members } from '~/types/cms-types'
import { MicroResponseType } from '~/types/microcms'
import { twitter, twitch, youtube } from '~/utils/font-awesome'
export default defineComponent({
  head: {},
  watchQuery: ['slug'],
  setup () {
    const { params, $microcms, error, redirect, $truncate, $config } = useContext()
    const member = ref<members>()
    const description = ref<string>('')
    useFetch(async () => {
      try {
        const { contents } = await $microcms.get<MicroResponseType<members>>({
          endpoint: 'members',
          queries: {
            limit: 1,
            filters: `slug[equals]${params.value.slug}`
          }
        })
        member.value = contents[0]
        description.value = $truncate(member.value.description, 60)
      } catch (e) {
        error({
          statusCode: 404
        })
        if (process.server) redirect(404, '/')
      }
    })

    useMeta(() => ({
      title: member.value?.name,
      meta: [
        { hid: 'description', name: 'description', content: description.value },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:url', property: 'og:url', content: `${$config.BASE_URL}/member/${member.value?.name || ''}` },
        { hid: 'og:title', property: 'og:title', content: `${member.value?.name || ''} | Jadeite` },
        { hid: 'og:description', property: 'og:description', content: description.value },
      ]
    }))

    return {
      member,
      twitter,
      twitch,
      youtube,
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  @apply mx-1 text-xl sm:text-3xl;
}

.divider {
  @apply mt-2 mb-5 w-full bg-gray-400;

  height: 1px;
}
</style>
