import React from 'react'
import { Link } from 'react-router-dom';
import '../index.css'
import styles from '../styles/header.module.css'
import Button from './ui/Button';

export default function Header() {
  return (
    <header>
      <div className={styles.logo}>
        <img src='logo.png'/>
        <Link to='/'>DEVCHIVE</Link>
      </div>
      
      <nav>
        <Link to='/memos'>메모</Link>
        <Link to='/errorarchive'>오류 모음</Link>
        <Link to='/studylist'>계획</Link>
        <Link to='/music'>뮤직</Link>
        <Link to='/mypage'>마이페이지</Link>
      </nav>
      <Button text='로그인'/>
    </header>
  )
}
