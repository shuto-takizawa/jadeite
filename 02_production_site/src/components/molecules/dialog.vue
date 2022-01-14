<template>
  <transition name='dialog' appear>
    <div class="dialog" v-show="value">
      <div class="dialog__overlay" @click.self="close">
        <div class="dialog__body">
          <div class="dialog__title">
            <slot name="title" />
          </div>
          <div class="dialog__content">
            <slot name="content" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props:{
    value: {
      type: Boolean
    }
  },
  setup (_, { emit }) {
    const close = () => emit('input', false)
    return {
      close
    }
  }
})
</script>

<style lang='scss' scoped>
.dialog {
  @apply fixed z-10 top-0 left-0 w-full h-full;

  &__overlay {
    @apply flex items-center justify-center fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-70;
  }

  &__body {
    @apply w-4/5 sm:w-1/2 h-2/3 overflow-hidden bg-white rounded-2xl shadow-xl;
  }

  &__title {
    @apply py-4 sm:py-8 text-center text-lg sm:text-xl font-semibold;
  }

  &__content ::v-deep {
    @apply mb-4 px-8 py-4 text-sm sm:text-base overflow-y-auto;

    max-height: calc(100% - 5.75rem);

    & > p {
      @apply mb-4;
    }

    & > ol {
      @apply mb-4 pl-4 list-decimal;

      & > li {
        @apply mb-4;
      }
    }
  }
}

.dialog-enter-active,
.dialog-leave-active {
  @apply transition-opacity duration-300 ease-in;

  .dialog__body {
    @apply transition-all duration-300 ease-in;
  }
}

.dialog-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.dialog-enter,
.dialog-leave-to {
  @apply opacity-0;

  .dialog__body {
    @apply opacity-0 transform -translate-y-4;
  }
}
</style>
