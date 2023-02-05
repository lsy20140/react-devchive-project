import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAllUsers, login, logout, onUserStateChange } from '../api/firebase';

const AuthContext = createContext(false);

export function AuthContextProvider({children}){
  const [user, setUser] = useState();
  const [allUsers, setAllUsers] = useState();
  useEffect(() => {
    onUserStateChange(user => {
      setUser(user);
      getAllUsers().then((res) => setAllUsers(res))
    })
  },[])
  return <AuthContext.Provider value={{user, uid: user && user.uid, login, logout, allUsers}}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  return useContext(AuthContext);
}