import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import '../index.css'
import styles from '../styles/header.module.css'
import Button from './ui/Button';

export default function Header() {
  const {user, login, logout} = useAuthContext();

  return (
    <header>
      <Link to='/' className={styles.logo}>
        <img src='logo.png'/>
        <h2>DEVCHIVE</h2>
      </Link>

      
      <nav>
        <Link to='/memos'>메모</Link>
        <Link to='/errorarchive'>오류 모음</Link>
        <Link to='/studylist'>계획</Link>
        <Link to='/music'>뮤직</Link>
        {user && <Link to='/mypage'>마이페이지</Link>}
      </nav>
      {user && user.displayName}
      {!user && <Button text='로그인' onClick={login}/>}
      {user && <Button text='로그아웃' onClick={logout}/>}
      
    </header>
  )
}
