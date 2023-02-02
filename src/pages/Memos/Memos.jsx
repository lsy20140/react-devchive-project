import React, { useEffect } from 'react'
import { getMemos } from '../../api/firebase';
import { useAuthContext } from '../../context/AuthContext'
import {useQuery} from '@tanstack/react-query'


export default function Memos() {
  const {uid} = useAuthContext();
  const {data: memos} = useQuery(['memos', uid || ''], () => getMemos(uid), {
    enabled: !!uid
  })
  const hasMemos = memos && memos.length >0
  
  return (
    <div>
      {!hasMemos && <p>메모가 없습니다.</p>}
      {hasMemos && 
      <ul>
        {memos && memos.map((memo) => (
          <li key={memo.id}>{memo.title} {memo.refLink}</li>
        ))}
      </ul>
      }

    </div>
  )
}
