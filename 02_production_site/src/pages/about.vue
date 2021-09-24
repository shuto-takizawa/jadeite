<template>
  <div>
    <h1 class="page-title">About us</h1>
    <h2 class="mb-40 text-center text-3xl font-black">Believe in your glory.</h2>
    <section>
      <h3 class="page-sub-title">Jadeite Concept</h3>
      <ol class="px-8">
        <li>e-Sports業界のみならず、他業界でも通用する「社会性・人間性」を持った人材に育成します。</li>
        <li>e-Sports普及のため、全力で選手、関係者の生活をサポートします。</li>
        <li>人種、宗教、性別に関わらず幅広い人材を登用します。</li>
        <li>強くなる為に全力を尽くし、チーム一丸となって最大限の結果を得る為に努力します。</li>
      </ol>
    </section>
    <h3></h3>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  layout: 'simple',
  head: {
    title: 'About us',
    meta: [
      { name: 'description', content: 'Jadeiteについての詳細です。' }
    ]
  }
})
</script>

<style lang="scss" scoped>
ol {
  li {
    @apply mb-2 text-lg list-decimal list-inside;
  }
}
</style>
