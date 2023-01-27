import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header>
      <Link to='/'>
        <h1>DEVCHIVE</h1>
      </Link>
      <nav>
        <Link to='/memos'>메모</Link>
        <Link to='/errorarchive'>오류 모음</Link>
        <Link to='/studylist'>계획</Link>
        <Link to='/music'>뮤직</Link>
        <Link to='/mypage'>마이페이지</Link>
      </nav>
    </header>
  )
}
