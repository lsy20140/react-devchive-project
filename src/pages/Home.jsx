import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function Home() {
  const navigate = useNavigate();
  const handleClick = (e) => {
     e.target.value === 'newMemo' ? navigate('/memos/new') : navigate('/errorarchive/new');
  }

  return (
    <>
      <p>Home</p>
      <Button text='+ 새 메모 추가' onClick={handleClick} value='newMemo'/>
      <Button text='+ 새 오류 추가' onClick={handleClick} value='newError'/>
    </>
  )
}
