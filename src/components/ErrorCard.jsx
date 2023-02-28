import React from 'react'
import styles from '../styles/errorArchive.module.css'
import {useNavigate} from 'react-router-dom'

export default function ErrorCard({error, error:{id, cause, solution, imgUrl, createdAt}}) {

  const navigate = useNavigate();

  return (
    <div className={styles.card} onClick={() => {navigate(`/errors/${id}`, {state: {error}})} }>
      <img src={imgUrl}/>
      <div className={styles.content}>
        <p className={styles.cause}>{cause}</p>
        <p className={styles.solution}>{solution}</p>
        <p className={styles.time_ago}>{createdAt}</p>
      </div>
    </div>
  )
}
