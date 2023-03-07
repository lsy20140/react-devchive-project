import React from 'react'
import styles from '../../styles/memos.module.css'
import MemoCard from '../../components/MemoCard';
import {diffSec} from 'timeago.js/lib/utils/date'
import useMemos from '../../hooks/useMemos';
import { useAuthContext } from '../../context/AuthContext';


export default function Memos() {
  const {user} = useAuthContext();
  const {memosQuery:{data: memos}} = useMemos();
  const hasMemos = memos && memos.length >0

  const date = new Date();

  memos && memos.sort((a,b) => {
    return diffSec(a.createdAt, date) - diffSec(b.createdAt, date)
  })
  
  return (
    <section >
      {
        user ? <>
        <h3 >나의 메모</h3>
        {!hasMemos && <p>메모가 없습니다.</p>}
        {hasMemos && 
        <ul className={styles.memos}>
          {memos && memos.map((memo) => (
            <MemoCard key={memo.id} memo={memo}/>
          ))}
        </ul>
        }
        </> : <h3>로그인 후에 이용 가능합니다.</h3>
      }


    </section>
  )
}
