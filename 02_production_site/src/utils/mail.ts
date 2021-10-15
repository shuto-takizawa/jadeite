import { httpsCallable } from 'firebase/functions'
import { functions } from '~/plugins/firebase'

// ************************
// テンプレートID関連
// ************************
/** お問い合わせフォーム通知 */
const contactFormNotice = 'contact_form_notice'

/** テンプレート名型定義 */
type TemplateName = typeof contactFormNotice

/** テンプレート名に紐づくテンプレートID */
const templateId = {
  [contactFormNotice]: 'd-3eb503749f98481bb4725b5e647b378b'
}

// ************************************
// ダイナミックテンプレート用データの型定義
// ************************************
/**
 * 必須項目
 */
export type RequiredDynamicData = {
  name: string
  email: string
}

/**
 * お問い合わせフォーム通知用
 */
export type DynamicContactFormNoticeData = RequiredDynamicData & {
  category: string
  content: string
}

export type DynamicTemplateData = DynamicContactFormNoticeData

// ****************************
// メール送信処理の型定義
// ****************************
/**
 * お問合せフォーム通知用型定義
 */
type ContactFormNoticeData = {
  templateName: TemplateName
  dynamicTemplateData: DynamicContactFormNoticeData
}

/**
 * 送信用データの型定義
 */
type SendMailData = {
  to: string
  templateName: TemplateName
  dynamicTemplateData?: DynamicTemplateData
  cc?: string
  bcc?: string
}

/**
 * Cloud Functionリクエストデータの型定義
 */
type FunctionsRequestType = {
  to: string
  templateId: string
  dynamic_template_data?: DynamicTemplateData
  cc?: string
  bcc?: string
}

/**
 * Cloud Functionsレスポンスの型定義
 */
type FunctionsResponseType = {
  status: 'success' | 'error'
}

// ************************
// ロジック
// ************************
/**
 * お問い合わせフォームの通知処理
 * @param data
 */
export const sendContactFormNotice = async (data: ContactFormNoticeData) => {
  const to = 'info@team-jadeite.com'
  const sendData:SendMailData = { to, ...data}
  return await sendMail(sendData)
}

/**
 * メール送信処理
 * @param data SendMailData
 */
export const sendMail = async (data: SendMailData) => {
  const call = httpsCallable<FunctionsRequestType, FunctionsResponseType>(functions, 'sendMail')
  const res = await call({
    to: data.to,
    templateId: templateId[data.templateName],
    dynamic_template_data: data.dynamicTemplateData
  })
  return res
}
