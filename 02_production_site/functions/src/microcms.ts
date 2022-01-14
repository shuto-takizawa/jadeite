import * as functions from 'firebase-functions'
import { createClient, GetRequest } from 'microcms-js-sdk'
const client = createClient({
  serviceDomain: functions.config().microcms.domain,
  apiKey: functions.config().microcms.apikey,
})

export const fetchMicroCMS = async (data: GetRequest) => {
  return await client.get(data)
}
