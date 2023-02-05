import React from 'react'
import styles from '../styles/memoCard.module.css'
import { formatAgo } from '../util/date'
import {useNavigate} from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';



export default function MemoCard({memo, memo:{id, title, category, mainText, createdAt}}) {
  const date = new Date();
  const navigate = useNavigate();

  return (
    <li className={styles.memo_card} onClick={() => {navigate(`/memos/${id}`, {state: {memo}})} }>
      <div className={styles.category_box}>{category}</div>
      <p className={styles.title}>{title}</p>
      <p className={styles.main_text}>{mainText}</p>
      <p className={styles.time_ago}>{formatAgo(createdAt, 'ko')}</p>
    </li>
  )
}
