import { httpsCallable } from 'firebase/functions'
import { functions } from '~/plugins/firebase'

type TemplateId = 'contact_form_notice' | 'normal'
export const TemplateId = {
  'contact_form_notice': 'd-3eb503749f98481bb4725b5e647b378b'
}
type DynamicTemplateData = {
  name: string
  email: string
  content: string
}

export type SendMailData = {
  to: string
  templateId: string
  dynamic_template_data: DynamicTemplateData
}

export const sendMail = (data: SendMailData) => {
  const call = httpsCallable<SendMailData>(functions, 'sendMail')
  call({
    to: data.to,
    templateId: data.templateId,
    dynamic_template_data: data.dynamic_template_data
  })
  .then(res => console.log(res))
  .catch(e => console.log(e))
}
