<template>
    <div class="dialog" ref="dialog">
      <!-- ヘッダー -->
      <div class="px-8 py-4 w-full text-right" ref="header">
        <fa :icon='times' @click="$emit('close')" class="text-4xl cursor-pointer" />
      </div>
      <!-- メイン -->
      <div class="grid grid-cols-1 md:grid-cols-4 place-items-center mx-8">

        <!-- prev -->
        <div class="justify-self-start hidden md:block">
          <button
            v-show="prev"
            @click="$emit('prev', prev, index-1)"
          >
            <span class="arrow left" />
          </button>
        </div>

        <!-- image area -->
        <div class="col-span-2 w-full h-full flex items-center justify-center">
          <div>
            <div class="relative inline-block">
              <img
                :style="autoHeight"
                :src="item.image.url"
                :alt="item.title"
              />
              <div class="mask">
                <c-button @click.native='download(item.image.url, item.title)'>Download</c-button>
              </div>
            </div>
            <p class="py-4 text-center text-xl text-gray-600">{{ item.title }}</p>
          </div>
        </div>

        <!-- next -->
        <div class="justify-self-end hidden md:block">
          <button
            v-show="next"
            @click="$emit('next', next, index+1)"
          >
            <span class="arrow right" />
          </button>
        </div>
      </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted, onUnmounted, PropType, useContext, computed, watch, toRefs } from '@nuxtjs/composition-api'
import { gallery } from '~/types/cms-types'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { times } from '~/utils/font-awesome'
import CButton from '~/components/atoms/button.vue'

export default defineComponent({
  components: {
    CButton,
  },
  props: {
    item: {
      type: Object as PropType<gallery>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    prev: {
      type: Object as PropType<gallery>
    },
    next: {
      type: Object as PropType<gallery>
    }
  },
  setup (props) {
    // **********************
    // 画像表示処理
    // **********************
    const { index } = toRefs(props)
    const dialog = ref<HTMLElement>()
    const header = ref<HTMLElement>()
    const autoHeight = ref<{ height: string }>()

    /**
     * 表示画像の横幅と高さを比較して、高さの方が大きいか否か
     * 正方形の画像も考慮して、条件式を横幅と高さが同じなら制御をかけるようにする
     */
    const isHeight = computed<boolean>(() => {
      return props.item.image.width <= props.item.image.height
    })

    const getMainArea = () => {
      // 描画領域のサイズ取得
      const wrapperRect = dialog.value?.getBoundingClientRect()
      const headerRect = header.value?.getBoundingClientRect()
      const mainArea = (wrapperRect && headerRect)
        ? wrapperRect.height - headerRect.height
        : 0
      return mainArea
    }

    const controlViewArea = (maxArea: number): void => {
      if (isHeight.value) autoHeight.value = { height: `${maxArea * 0.8}px` }
      else autoHeight.value = { height: 'inherit' }
    }

    onMounted(() => {
      controlViewArea(getMainArea())
    })

    // 画像が切り替わったか判定
    watch(index, () => {
      controlViewArea(getMainArea())
    })

    // **********************
    // スクロール制御処理
    // **********************
    onMounted(() => {
      // スクロール制御開始
      if (dialog.value) disableBodyScroll(dialog.value)
    })

    onUnmounted(() => {
      // スクロール制御の解除
      clearAllBodyScrollLocks()
    })

    // **********************
    // ダウンロード処理
    // **********************
    const { $axios } = useContext()

    /**
     * 画像ダウンロード
     */
    const download = (url: string, title: string) => {
      $axios.get(url, { responseType: 'blob' })
      .then(res => {
        const blob = new Blob([res.data], { type: 'image/png' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = title
        link.click()
        URL.revokeObjectURL(link.href)
      })
      .catch(e => {
        alert('画像のダウンロードに失敗しました。')
      })
    }

    return {
      download,
      times,
      dialog,
      header,
      autoHeight,
    }
  }
})
</script>

<style lang="scss" scoped>
.dialog {
  @apply fixed top-0 left-0 grid w-screen h-screen z-40 bg-white overflow-y-auto;

  grid-template-rows: auto 1fr;

  .mask {
    @apply absolute top-0 left-0 flex items-center justify-center w-full h-full transition-opacity duration-300 ease-in-out bg-gray-500 bg-opacity-50 opacity-0 hover:opacity-100;
  }
}

.arrow {
  --arrow-width: 50px;

  @include mq(sm) {
    --arrow-width: 80px;
  }

  $arrow-head-width: 15px;
  $arrow-thickness: 2px;

  @apply flex items-center relative h-4 mx-2;

  width: var(--arrow-width);

  &::before,
  &::after {
    @apply absolute block top-1/2 bg-site-black transition-all duration-300 ease-in-out;

    content: '';
    height: $arrow-thickness;
  }

  &::before { width: 100%; }
  &::after { width: $arrow-head-width; }

  &.left {
    &::after {
      @apply left-0;

      transform-origin: left center;
      transform: rotate(-25deg);
    }
  }

  &.right {
    &::after {
      @apply right-0;

      transform-origin: right center;
      transform: rotate(25deg);
    }
  }

  &:hover {
    &::before,
    &::after {
      @apply bg-opacity-30;
    }
  }
}
</style>
