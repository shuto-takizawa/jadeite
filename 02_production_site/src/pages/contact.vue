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
        <div>
          <p class="mb-2 text-center text-sm sm:text-base">
            当社
            <span
              @click="isOpen = true"
              class="cursor-pointer text-site-accent font-semibold hover:text-opacity-80">
              個人情報の取り扱いについて
            </span>
            に同意いただける場合は<br class="hidden sm:block">
            チェックを付け、送信ボタンをクリックしてください。
          </p>
          <c-dialog v-model="isOpen">
            <template #title>
              <h3>個人情報の取り扱いについて</h3>
            </template>
            <template #content>
              <p>
                株式会社アンヴィル<br>
                代表取締役社長　古藤　真治<br>
                個人情報保護管理者　総務グループ長
              </p>
              <p>
                当社は、個人情報保護マネジメントシステム(PMS)に従い、ご提供いただいた個人情報を以下のとおり取扱わせていただきます。本内容をご理解いただき、ご同意の上でお問い合わせください。
              </p>
              <ol>
                <li>
                  個人情報の取得と利用目的について<br>
                  ご登録いただきました個人情報は、お問い合わせの対応及び弊社が提供するサービスに関する情報のご案内に必 要な範囲で利用させていただきます。
                </li>
                <li>
                  個人情報の第三者への提供について<br>
                  ご本人の同意がある場合又は法令に基づく場合を除き、お預かりした個人情報を第三者に提供することはありま せん。
                </li>
                <li>
                  個人情報の取扱いの委託について<br>
                  お預かりした個人情報の取扱いの全部又は一部を委託することはありません。
                </li>
                <li>
                  開示対象個人情報の開示等について<br>
                  ご本人からの求めにより、当社が保有する開示対象個人情報の利用目的の通知・開示・内容の訂正・追加又は削 除・利用の停止・消去及び第三者への提供の停止(「開示等」といいます)に応じます。
                </li>
                <li>
                  個人情報のご提供の任意性について<br>
                  当社への個人情報のご提供は任意としております。ただし、ご登録いただいた情報が不足している場合は、第1項の目的を遂行できない場合があります。
                </li>
                <li>
                  問い合わせ先<br>
                  〒102-0073　東京都千代田区九段北1-3-1　VORT九段下9F<br>
                  株式会社アンヴィル<br>
                  電話 03-5577-3867　FAX 03-4333-7958
                </li>
              </ol>
              <div class="my-4 sm:my-8 text-center">
                <btn
                  @click.native="isOpen = false"
                >
                  閉じる
                </btn>
              </div>
            </template>
          </c-dialog>
          <toggle-box
            v-model="isAgreement"
            name="個人情報取扱への同意"
            label="「個人情報の取り扱いについて」に同意します。"
            :rules="{ required: { allowFalse: false } }"
            class="flex justify-center"
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
import { InputOptionType } from '~/types'
import { spinner } from '~/utils/font-awesome'
import TextField from '~/components/atoms/text-field.vue'
import TextArea from '~/components/atoms/text-area.vue'
import SelectBox from '~/components/atoms/select.vue'
import ToggleBox from '~/components/atoms/toggle.vue'
import Btn from '~/components/atoms/button.vue'
import CDialog from '~/components/molecules/dialog.vue'

export default defineComponent({
  components: {
    TextField,
    TextArea,
    SelectBox,
    ToggleBox,
    Btn,
    CDialog,
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
    const options: InputOptionType[] = [
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
    const isAgreement = ref<boolean>(false)
    const isOpen = ref<boolean>(false)

    const sendMail = async () => {
      loading.value = true
      $log.info('name:', name.value)
      $log.info('email:', email.value)
      $log.info('category:', category.value)
      $log.info('content:', content.value)
      $log.info('isAgreement', isAgreement.value)
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
      isAgreement,
      isOpen,
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
