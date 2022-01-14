import * as functions from 'firebase-functions'
import * as mail from '@sendgrid/mail'
import { fetchMicroCMS } from './microcms'
import { GetRequest } from 'microcms-js-sdk'
mail.setApiKey(functions.config().sendgrid.apikey)
const https = functions.region('asia-northeast1').https

exports.sendMail = https.onCall(async (data) => {
    const msg = {
      to: data.to,
      from: 'no-reply@team-jadeite.com',
      // TODO : 下記項目は必要になったときに設定する
      // cc: data.cc || '',
      // bcc: data.bcc || '',
      // replyTo: data.replyTo || '',
      templateId: data.templateId,
      dynamic_template_data: data.dynamic_template_data,
    }
    try {
      await mail.send(msg)
      return {
        status: 'success',
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

exports.fetchMicroCMS = https.onCall(async (data: GetRequest) => {
  try {
    const res = await fetchMicroCMS(data)
    return {
      status: 'success',
      res,
    }
  } catch (error) {
    console.error(error)
    throw error
  }
})
