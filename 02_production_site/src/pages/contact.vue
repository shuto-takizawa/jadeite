<template>
  <div>
    <h1 class="page-title">Contact us</h1>
    <p class="text-center">Team Jadeiteへのお問い合わせはこちらから入力ください。</p>
    <validation-observer ref="obs" v-slot='{ handleSubmit, invalid }'>
      <form class="container max-w-3xl" @submit.prevent="handleSubmit(send)">
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
    <button @click='test'>test</button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, useContext, } from '@nuxtjs/composition-api'
import { main } from '~/plugins/firebase'
import { sendMail, TemplateId } from '~/utils/mail'
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
    const { $log, } = useContext()
    const { name, email, content } = toRefs<SendData>(reactive({
      name: '',
      email: '',
      content: '',
    }))

    const send = () => {
      $log.info('name:', name.value)
      $log.info('email:', email.value)
      $log.info('content:', content.value)
      sendMail({
        to: email.value,
        templateId: TemplateId.contact_form_notice,
        dynamic_template_data: {
          name: name.value,
          email: email.value,
          content: content.value
        }
      })
    }

    const test = () => {
      main()
      // const send = $fire.functions.httpsCallable('sendMail')
      // send({
      //   to: "md.takizawa@gmail.com",
      //   templateId: 'd-3eb503749f98481bb4725b5e647b378b',
      //   dynamic_template_data: {
      //     name: 'テスト太郎',
      //     email: 'stakizawa@anvil.ne.jp',
      //     content: 'お問い合わせ内容が入力されます。'
      //   }
      // })
      // .then((res: any) => console.log(res))
      // .catch((e: any) => console.log(e))
    }
    return {
      name,
      email,
      content,
      send,
      test,
    }
  }
})
</script>
