<template>
  <div>
    <h1 class="page-title">Gallery</h1>
    <gallery-list v-if="galleries && galleries.length" :galleries="galleries"/>
    <p v-else class="text-center text-xl font-semibold">ギャラリーがありません。</p>
    <infinite-loading
      v-if="galleries"
      @infinite="infiniteHandler"
    >
      <span slot='no-more' />
      <span slot='no-results' />
    </infinite-loading>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, useContext, useFetch } from '@nuxtjs/composition-api'
import { gallery } from '~/types/cms-types'
import { MicroResponseArrayType } from '~/types/microcms'
import { StateChanger } from 'vue-infinite-loading'
import { fetchGalleries } from '~/utils/microcms'
import GalleryList from '~/components/molecules/gallery-list.vue'
export default defineComponent({
  components: {
    GalleryList
  },
  head: {
    title: 'Gallery',
    meta: [
      { hid: 'description', name: 'description', content: 'Jadeiteのギャラリーページです。' },
    ]
  },
  setup () {
    const { $microcms, $log } = useContext()
    /** 一度に取得する件数 */
    const limit = 8

    const galleries = ref<gallery[]>()
    useFetch(async () => {
      const { contents } = await $microcms.get<MicroResponseArrayType<gallery>>({
        endpoint: 'gallery',
        queries: {
          orders: '-publishedAt',
          limit,
        }
      })
      galleries.value = contents
    })

    /**
     * 無限スクロール
     */
    const loading = ref<boolean>(false)
    const offset = ref<number>(limit)
    const infiniteHandler = async (state: StateChanger) => {
      console.log('読込開始', loading.value)
      if (loading.value) return
      if (!galleries.value) return


      console.log('offset:', offset.value)

      try {
        loading.value = true
        const { contents, totalCount } = await fetchGalleries({
          orders: '-publishedAt',
          limit,
          offset: offset.value,
        })
        galleries.value?.push(...contents)

        console.log('totalCount', totalCount)
        console.log('galleries length', galleries.value?.length)

        if (totalCount === galleries.value?.length) {
          // 全て取得した
          state.complete()
        } else {
          // まだ残ってる
          offset.value += limit
          state.loaded()
        }
      } catch (error) {
        $log.error(error)
        state.complete()
      } finally {
        loading.value = false
      }
    }

    return {
      galleries,
      infiniteHandler,
    }
  }
})
</script>
