import React from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import '../index.css'
import styles from '../styles/header.module.css'
import Button from './ui/Button';
import {IoIosArrowDown} from 'react-icons/io'

export default function Header() {
  const {user, login, logout} = useAuthContext();

  return (
    <header>
      <Link to='/' className={styles.logo}>
        <img src='logo.png'/>
        <h2>DEVCHIVE</h2>
      </Link>
      
      <nav>
        <Link to='/'>홈</Link>
        <Link to='/memos'>메모</Link>
        <Link to='/errorarchive'>오류 모음</Link>
        <Link to='/studylist'>계획</Link>
        <Link to='/music'>뮤직</Link>
      </nav>
      { !user && <Button text='로그인' onClick={login} />}
      {user && 
        <div className={styles.profile}>
          <img className={styles.profileImg} src={user.photoURL}/>
          <div>{user.displayName}</div>
          <IoIosArrowDown/>
          <ul>
            <li className={styles.subItem}>
              <p>나의 프로필</p>
            </li>
            <li className={styles.subItem} onClick={logout}>
              <p>로그아웃</p>
            </li>
          </ul>
        </div>
      }
    </header>
  )
}
