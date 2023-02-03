import React from 'react'
import { getMemos } from '../../api/firebase';
import { useAuthContext } from '../../context/AuthContext'
import {useQuery} from '@tanstack/react-query'
import styles from '../../styles/memos.module.css'
import MemoCard from '../../components/MemoCard';
import {diffSec} from 'timeago.js/lib/utils/date'


export default function Memos() {
  const {uid} = useAuthContext();
  const {data: memos} = useQuery(['memos', uid || ''], () => getMemos(uid), {
    enabled: !!uid
  })
  const hasMemos = memos && memos.length >0

  const date = new Date();
  
  memos.sort((a,b) => {
    return diffSec(a.createdAt, date) - diffSec(b.createdAt, date)
  })
  
  return (
    <section>
      <h3 >메모 목록</h3>
      {!hasMemos && <p>메모가 없습니다.</p>}
      {hasMemos && 
      <ul>
        {memos && memos.map((memo) => (
          <MemoCard key={memo.id} memo={memo}/>
        ))}
      </ul>
      }

    </section>
  )
}
