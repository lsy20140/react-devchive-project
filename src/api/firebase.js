import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, remove } from "firebase/database";
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
  return set(ref(db, `memos/${userId}/${id}`), {...memo, id});
}

export async function getMemos(userId) {
  return get(ref(db, `memos/${userId}`))
  .then((snapshot) => {
    if(snapshot.exists()){
      return Object.values(snapshot.val());
    }
    return [];
  })
}

export async function editMemoContents(userId, memo) {
  return set(ref(db,`memos/${userId}/${memo.id}`), memo)
}

export async function removeMemo(userId, memoId) {
  return remove(ref(db, `memos/${userId}/${memoId}`))
}


export async function addNewTask(userId, task) {
  const id = uuid();
  return set(ref(db, `tasks/${userId}/${id}`), {...task, id});
}

export async function getTasks(userId) {
  return get(ref(db, `tasks/${userId}`))
  .then((snapshot) => {
    if(snapshot.exists()){
      return Object.values(snapshot.val());
    }
    return [];
  })
}

export async function updateTask(userId, task) {
  return set(ref(db, `tasks/${userId}/${task.id}`), task)
}

export async function removeTask(userId, taskId) {
  return remove(ref(db, `tasks/${userId}/${taskId}`))
}

export async function addNewError(userId, error, imgUrl) {
  const id = uuid();
  return set(ref(db, `errors/${userId}/${id}`), {...error, id, imgUrl});
}

export async function getErrors(userId) {
  return get(ref(db, `errors/${userId}`))
  .then((snapshot) => {
    if(snapshot.exists()){
      return Object.values(snapshot.val());
    }
    return [];
  })
}

export async function editErrorContents(userId, error) {
  return set(ref(db,`errors/${userId}/${error.id}`), error)
}

export async function removeError(userId, errorId) {
  return remove(ref(db, `errors/${userId}/${errorId}`))
}
