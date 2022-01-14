import { httpsCallable } from 'firebase/functions'
import { functions } from '~/plugins/firebase'
import { GetRequest, MicroCMSQueries, MicroCMSListResponse } from 'microcms-js-sdk'
import { gallery } from '~/types/cms-types'

type FunctionsResponseType<T> = {
  status: 'success' | 'error'
  res: MicroCMSListResponse<T>
}

export const fetchGalleries = async (queries?: MicroCMSQueries): Promise<MicroCMSListResponse<gallery>> => {
  const requestData: GetRequest = { endpoint: 'gallery', queries }
  const res = await fetchMicroCMS<gallery>(requestData)
  return res.data.res
}


export const fetchMicroCMS = async <T> (data: GetRequest) => {
  const call = httpsCallable<GetRequest, FunctionsResponseType<T>>(functions, 'fetchMicroCMS')

  if (!data.queries) delete data.queries
  if (!data.contentId) delete data.contentId
  const res = await call(data)
  return res
}
