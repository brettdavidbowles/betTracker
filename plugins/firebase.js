import * as firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAmEJ-kURZ02C6O7Bd__ysrM4xOrTqeLoo',
  authDomain: 'bettracker-c950e.firebaseapp.com',
  projectId: 'bettracker-c950e',
  storageBucket: 'bettracker-c950e.appspot.com',
  messagingSenderId: '168688297274',
  appId: '1:168688297274:web:0da06ed4e2dc56c4a11c03',
  measurementId: 'G-TTGZS03VF6'
}

console.log(firebase.default.apps)
/* eslint-disable */
let app = null
if (!firebase.default.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}
/* eslint-enable */

export default firebase
