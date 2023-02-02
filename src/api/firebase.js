import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import {v4 as uuid} from 'uuid';



const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();


export function login() {
  console.log('버튼~~')
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user;
    }).catch((error) => {
      console.log(error);
    });
}

export function logout() {
  signOut(auth)
  .catch((error) => {
    console.log(error);
  })
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    callback(user);
  })
}

export function addNewMemo(userId, memo) {
  const id = uuid();
  return set(ref(db, `memos/${userId}/${id}`), memo);
}