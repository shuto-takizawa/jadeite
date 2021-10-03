<template>
  <div>
    <h1 class="page-title">Contact us</h1>
    <p class="mb-4 text-center text-base sm:text-lg font-semibold">Team Jadeiteへのお問い合わせはこちらから入力ください。</p>
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
          >
            送信
          </btn>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, useContext, useRouter } from '@nuxtjs/composition-api'
import { sendContactFormNotice } from '~/utils/mail'
import TextField from '~/components/atoms/text-field.vue'
import TextArea from '~/components/atoms/text-area.vue'
import Btn from '~/components/atoms/button.vue'

type SendData = {
  name: string
  email: string
  content: string
}

export default defineComponent({
  components: {
    TextField,
    TextArea,
    Btn,
  },
  head: {
    title: 'Contact us'
    // TODO : meta設定
  },
  setup () {
    const { $log, error, redirect } = useContext()
    const router = useRouter()
    const { name, email, content } = toRefs<SendData>(reactive({
      name: '',
      email: '',
      content: '',
    }))

    const sendMail = async () => {
      $log.info('name:', name.value)
      $log.info('email:', email.value)
      $log.info('content:', content.value)
      try {
        const res = await sendContactFormNotice({
          templateName: 'contact_form_notice',
          dynamicTemplateData: {
            name: name.value,
            email: email.value,
            content: content.value,
          }
        })
        if (res.data.status === 'success')
          router.push('/contact-complate')
      } catch (e) {
        $log.error(e)
        error({
          statusCode: 500,
        })
        if (process.server) redirect(500, '/')
      }
    }

    return {
      name,
      email,
      content,
      sendMail,
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

</style>
