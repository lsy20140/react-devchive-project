import React from 'react'
import styles from '../styles/memoCard.module.css'

export default function MemoCard({memo:{title, category, mainText, refLink, codePack}}) {
  return (
    <div className={styles.memo_card}>
      <div className={styles.category_box}>{category}</div>
      <p className={styles.title}>{title}</p>
      <p className={styles.main_text}>{mainText}</p>
    </div>
  )
}
