import React from 'react'
import styles from '../styles/errorArchive.module.css'

export default function ErrorCard({error, error:{cause, solution, imgUrl, createdAt}}) {
  return (
    <div className={styles.list_item}>
      <img src={imgUrl}/>
      <div className={styles.content}>
        <p className={styles.cause}>{cause}</p>
        <p className={styles.solution}>{solution}</p>
        <p className={styles.time_ago}>{createdAt}</p>
      </div>
    </div>
  )
}
