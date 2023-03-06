import React from 'react'
import styles from '../../styles/memos.module.css'
import MemoCard from '../../components/MemoCard';
import {diffSec} from 'timeago.js/lib/utils/date'
import useMemos from '../../hooks/useMemos';


export default function Memos() {
  const {memosQuery:{data: memos}} = useMemos();
  const hasMemos = memos && memos.length >0

  const date = new Date();

  memos && memos.sort((a,b) => {
    return diffSec(a.createdAt, date) - diffSec(b.createdAt, date)
  })
  
  return (
    <div className='page_container'>
      <h3 >나의 메모</h3>
      {!hasMemos && <p>메모가 없습니다.</p>}
      {hasMemos && 
      <ul className={styles.memos}>
        {memos && memos.map((memo) => (
          <MemoCard key={memo.id} memo={memo}/>
        ))}
      </ul>
      }

    </div>
  )
}
