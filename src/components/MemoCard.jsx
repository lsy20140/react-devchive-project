import React from 'react'
import styles from '../styles/memoCard.module.css'
import { formatAgo } from '../util/date'


export default function MemoCard({memo:{title, category, mainText, createdAt}}) {
  const date = new Date();
  return (
    <div className={styles.memo_card}>
      <div className={styles.category_box}>{category}</div>
      <p className={styles.title}>{title}</p>
      <p className={styles.main_text}>{mainText}</p>
      <p className={styles.time_ago}>{formatAgo(createdAt, 'ko')}</p>
    </div>
  )
}
