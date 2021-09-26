// 参考URL
// https://qiita.com/aktkro/items/2f6a269a429a8d205868
// https://qiita.com/Peko10/items/9dbabb0f1cd100ae39bc
// https://zenn.dev/ryo_kawamata/articles/firebase-trigger-email
import * as functions from "firebase-functions";
import * as mail from '@sendgrid/mail'
mail.setApiKey(functions.config().sendgrid.apikey)

exports.sendMail = functions
  .region('asia-northeast1')
  .https.onCall(
    async (data, context) => {
      const msg = {
        to: data.to,
        from: 'no-reply@team-jadeite.com',
        cc: data.cc || '',
        bcc: data.bcc || '',
        replyTo: data.replyTo || '',
        templateId: data.templateId,
        dynamic_template_data: data.dynamic_template_data,
      }
      try {
        await mail.send(msg)
      } catch (error: any)  {
        console.error(error)
        if (error.response)
          console.error(error.response.body)
      }
    }
  )
