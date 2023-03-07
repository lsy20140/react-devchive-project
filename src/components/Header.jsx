import React from 'react'
import styles from '../styles/header.module.css'
import {BiLogIn, BiLogOut} from 'react-icons/bi'
import { useAuthContext } from '../context/AuthContext';
import {IoIosArrowDown} from 'react-icons/io'

export default function Header() {
  const {user, login, logout} = useAuthContext();

  return (
    <div className={styles.header_container}>
      <div className={styles.profile_box}>
        {!user &&
          <div className={styles.logout} onClick={login}>
            <BiLogIn/>
            <p>로그인</p>
          </div>
        }
        {user && 
          <div className={styles.profile}>
            <img src={user.photoURL} className={styles.profileImg}/>
            <p>{user.displayName}</p>
            <IoIosArrowDown/>
            <ul>
              <li className={styles.subItem}>
                <p>설정</p>
              </li>
              <li className={styles.subItem} onClick={logout}>
                <p>로그아웃</p>
              </li>
            </ul>
          </div>
        }

      </div>

    </div>
  )
}
