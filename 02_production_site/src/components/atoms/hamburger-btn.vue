<template>
  <div class="root" :class="{active:drawer}">
    <!-- １本目の線 -->
    <span />
    <!-- ２本目の線 -->
    <span />
    <!-- ３本目の線 -->
    <span />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    drawer: {
      type: Boolean,
      default: false,
    }
  },
  setup () {

    return {

    }
  }
})
</script>

<style lang="scss" scoped>
.root {
  @apply relative cursor-pointer;

  width: 50px;
  height: 50px;

  span {
    @apply absolute inline-block bg-site-black rounded-md  transition-all duration-500 ease-in-out;

    width: 45%;
    height: 2px;
    left: 14px;

    &:nth-of-type(1) { top: 13px; }
    &:nth-of-type(2) { top: 19px; }

    &:nth-of-type(3) {
      top: 25px;

      &::after {
        @apply absolute text-site-black text-xs;

        content: 'Menu';
        top: 5px;
        left: -4px;
      }
    }
  }

  &.active {
    span {
      &:nth-of-type(1) {
        top: 14px;
        left: 18px;
        transform: translateY(6px) rotate(-45deg);
        width: 30%;
      }

      &:nth-of-type(2) { opacity: 0; }

      &:nth-of-type(3) {
        top: 26px;
        left: 18px;
        transform: translateY(-6px) rotate(45deg);
        width: 30%;

        &::after {
          @apply absolute;

          content: 'Close';
          transform: translateY(0) rotate(-45deg);
          top: 5px;
          left: 4px;
        }
      }
    }
  }
}
</style>
