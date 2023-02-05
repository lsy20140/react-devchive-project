import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";
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
      getAllUsers().then((res) => {
        !res.includes(user.uid) && addUser(user.uid)}) 
      return user;

    }).catch((error) => {
      console.log(error);
    })
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

export async function addUser(userId) {
  return set(ref(db, `users/${userId}/uid`), userId);
}

export async function getAllUsers() {
  return get(ref(db, 'users'))
  .then((snapshot) => {
    if(snapshot.exists()){
      return Object.keys(snapshot.val());
    }
    return [];
  })
}

export async function addNewMemo(userId, memo) {
  const id = uuid();
  return set(ref(db, `memos/${userId}/${id}`), memo);
}

export async function getMemos(userId) {
  return get(ref(db, `memos/${userId}`))
  .then((snapshot) => {
    if(snapshot.exists()){
      console.log(snapshot.val())
      return Object.values(snapshot.val());
    }
    return [];
  })
}
