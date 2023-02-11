import React from 'react'
import styles from '../styles/taskItem.module.css'

export default function TaskItem({id, task:{taskName, taskInfo, createdAt}}) {
  return (
    <div className={styles.task_item}>
      <br/>
      <p>{taskName}</p>
      <p>{taskInfo}</p>
      <p>{createdAt}</p>
      <br/>
    </div>
  )
}
