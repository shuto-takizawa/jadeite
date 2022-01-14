<template>
  <div>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
      <div
        v-for="(gallery, idx) in galleries"
        :key="gallery.id"
        class="transition-opacity duration-300 ease-in-out hover:opacity-50"
      >
        <img
          :src="gallery.image.url"
          :alt="gallery.title"
          class="gallery-img"
          @click="showDialog(gallery, idx)"
        />
      </div>
    </div>

    <c-dialog
      v-if="isOpen"
      :index="currentIdx"
      :item="selectedGallery"
      :prev="prevGallery"
      :next="nextGallery"
      @close='closeDialog'
      @prev="showDialog"
      @next="showDialog"
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { gallery } from '~/types/cms-types'
import CDialog from '~/components/molecules/gallery-dialog.vue'

export default defineComponent({
  components: {
    CDialog,
  },
  props: {
    galleries: {
      type: Array as PropType<gallery[]>,
      required: true,
    }
  },
  setup (props) {
    const isOpen = ref<boolean>(false)
    const currentIdx = ref<number>(0)
    const selectedGallery = ref<gallery | null>(null)
    const prevGallery = ref<gallery | null>(null)
    const nextGallery = ref<gallery | null>(null)

    const showDialog = (gallery: gallery, idx: number) => {
      currentIdx.value = idx
      selectedGallery.value = gallery
      prevGallery.value = props.galleries[idx-1]
      nextGallery.value = props.galleries[idx+1]
      isOpen.value = true
    }

    const closeDialog = () => {
      isOpen.value = false
    }

    return {
      isOpen,
      currentIdx,
      selectedGallery,
      prevGallery,
      nextGallery,
      showDialog,
      closeDialog,
    }
  }
})
</script>

<style lang='scss' scoped>
.gallery-img {
  @apply object-cover shadow-md cursor-pointer;

  aspect-ratio: 1.414/1;
}
</style>
