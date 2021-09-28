import { initializeApp } from 'firebase/app'
import { getFunctions, connectFunctionsEmulator, httpsCallable } from 'firebase/functions'

const config = {
  apiKey: 'AIzaSyBaJnaMbl_JdNpYBmAfzmGR1ScX7Oyb-J8',
  authDomain: 'jadeite-580b9.firebaseapp.com',
  projectId: 'jadeite-580b9',
  storageBucket: 'jadeite-580b9.appspot.com',
  messagingSenderId: '619691154460',
  appId: '1:619691154460:web:3be9fd69917655cb4213d9',
  measurementId: 'G-T0QMR3H1BK',
  // apiKey: process.env.FB_API_KEY,
  // authDomain: process.env.FB_AUTH_DOMAIN,
  // projectId: process.env.FB_PROJECT_ID,
  // storageBucket: process.env.FB_STORAGE_BUCKET,
  // messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  // appId: process.env.FB_APP_ID,
  // measurementId: process.env.FB_MEASUREMENT_ID,
}

const app = initializeApp(config)
export const functions = getFunctions(app, 'asia-northeast1')
// _functions.region = 'asia-northeast1'
// if (process.env.NODE_ENV !== 'production')
  // connectFunctionsEmulator(_functions, 'localhost', 5001)

export const main = () => {
  const call = httpsCallable(functions, 'sendMail')
  call({
    to: 'md.takizawa@gmail.com',
    templateId: 'd-3eb503749f98481bb4725b5e647b378b',
    dynamic_template_data: {
      name: 'テスト太郎',
      email: 'stakizawa@anvil.ne.jp',
      content: 'お問い合わせ内容が入力されます。'
    }
  })
  .then(res => console.log('main:', res))
  .catch(e => console.log('main:', e))
}


// export const hoge = _functions
// export const functions = getFunctions(app)
// export default firebase
