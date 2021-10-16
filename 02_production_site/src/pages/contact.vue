<template>
  <div>
    <h1 class="page-title">Contact us</h1>
    <p class="mb-2 text-center text-base sm:text-lg font-semibold">Team Jadeiteへのお問い合わせは<br class="block sm:hidden">こちらから入力ください。</p>
    <p class="mb-6 text-center text-sm sm:text-base text-gray-400">*内容により回答をお待たせする場合や回答しかねる場合がございます。</p>
    <validation-observer ref="obs" v-slot='{ handleSubmit, invalid }'>
      <form class="container max-w-3xl px-6 py-4 bg-gray-100 rounded-md" @submit.prevent="handleSubmit(sendMail)">
        <div class="row">
          <p class="label">お名前<span class="required">必須</span></p>
          <text-field
            v-model="name"
            class="field"
            type="text"
            name="お名前"
            rules="required"
            placeholder="Name"
          />
        </div>
        <div class="row">
          <p class="label">メール<span class="required">必須</span></p>
          <text-field
            v-model="email"
            class="field"
            type="email"
            name="メールアドレス"
            rules="required|email"
            placeholder="E-Mail"
          />
        </div>
        <div class="row">
          <p class="label">種別</p>
          <select-box
            v-model="category"
            name="お問い合わせ種別"
            :options="options"
          />
        </div>
        <div class="row">
          <p class="label">内容<span class="required">必須</span></p>
          <text-area
            v-model="content"
            class="area"
            name="問い合わせ内容"
            rules="required"
            placeholder="Content"
          />
        </div>
        <div class="text-center mt-8">
          <btn
            type="submit"
            :disabled="invalid"
            :class="{loading: loading}"
          >
            <fa v-if="loading" :icon="spinner" />
            <span v-else>送信</span>
          </btn>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref, toRefs, useContext, useRouter } from '@nuxtjs/composition-api'
import { sendContactFormNotice, DynamicContactFormNoticeData } from '~/utils/mail'
import { SelectOptionType } from '~/types'
import { spinner } from '~/utils/font-awesome'
import TextField from '~/components/atoms/text-field.vue'
import TextArea from '~/components/atoms/text-area.vue'
import SelectBox from '~/components/atoms/select.vue'
import Btn from '~/components/atoms/button.vue'

export default defineComponent({
  components: {
    TextField,
    TextArea,
    SelectBox,
    Btn,
  },
  head: {
    title: 'Contact us',
    meta: [
      { hid: 'description', name: 'description', content: 'Jadeiteお問い合わせページです。' }
    ]
  },
  setup () {
    const { $log, error, redirect } = useContext()
    const router = useRouter()

    // 問い合わせ種別選択肢
    const options: SelectOptionType[] = [
      { label: '取材/撮影/プレス', value: '取材/撮影/プレス' },
      { label: '選手、スタッフ採用', value: '選手、スタッフ採用' },
      { label: 'Web/SNS', value: 'Web/SNS' },
      { label: 'その他', value: 'その他' },
    ]

    const { name, email, category, content } = toRefs<DynamicContactFormNoticeData>(reactive({
      name: '',
      email: '',
      category: '',
      content: '',
    }))
    const loading = ref<boolean>(false)

    const sendMail = async () => {
      loading.value = true
      $log.info('name:', name.value)
      $log.info('email:', email.value)
      $log.info('category:', category.value)
      $log.info('content:', content.value)
      try {
        const res = await sendContactFormNotice({
          templateName: 'contact_form_notice',
          dynamicTemplateData: {
            name: name.value,
            email: email.value,
            category: category.value,
            content: content.value,
          }
        })
        loading.value = false
        if (res.data.status === 'success')
          router.push('/contact-complate')
      } catch (e) {
        $log.error(e)
        loading.value = false
        error({
          statusCode: 500,
        })
        if (process.server) redirect(500, '/')
      }
    }

    return {
      name,
      email,
      category,
      content,
      sendMail,
      loading,
      spinner,
      options,
    }
  }
})
</script>

<style lang="scss" scoped>
.row {
  @apply my-6 grid grid-cols-1 sm:grid-cols-4;

  .label {
    @apply py-2 font-semibold;

    .required {
      @apply ml-2 px-2 text-sm text-white bg-site-accent shadow-sm rounded;
    }
  }

  .field,
  .area {
    @apply col-span-3;
  }
}

.btn.loading {
  @apply pointer-events-none bg-opacity-50;

  .fa-spinner {
    animation: rotate 2s linear infinite;
  }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
}
</style>
