<template>
  <div>
    <h1 class="page-title">Contact us</h1>
    <p class="text-center">Team Jadeiteへのお問い合わせはこちらから入力ください。</p>
    <validation-observer ref="obs" v-slot='{ handleSubmit, invalid }'>
      <form class="container max-w-3xl" @submit.prevent="handleSubmit(sendMail)">
        <div class="grid grid-cols-4">
          <span>お名前</span>
          <text-field
            v-model="name"
            class="col-span-3"
            type="text"
            name="お名前"
            rules="required"
          />
        </div>
        <div class="grid grid-cols-4">
          <span>メール</span>
          <text-field
            v-model="email"
            class="col-span-3"
            type="email"
            name="メールアドレス"
            rules="required|email"
          />
        </div>
        <div class="grid grid-cols-4">
          <span>内容</span>
          <text-area
            v-model="content"
            name="問い合わせ内容"
            rules="required"
          />
        </div>
        <div>
          <btn
            type="submit"
            :disabled="invalid"
          >
            submit
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
