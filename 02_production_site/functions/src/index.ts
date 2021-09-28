import * as functions from 'firebase-functions'
import * as mail from '@sendgrid/mail'
mail.setApiKey(functions.config().sendgrid.apikey)
const https = functions.region('asia-northeast1').https

exports.sendMail = https.onCall(async (data) => {
    const msg = {
      to: data.to,
      from: 'no-reply@team-jadeite.com',
      // cc: data.cc || '',
      // bcc: data.bcc || '',
      // replyTo: data.replyTo || '',
      templateId: data.templateId,
      dynamic_template_data: data.dynamic_template_data,
    }
    try {
      await mail.send(msg)
    } catch (error) {
      console.error(error)
    }
  }
)
