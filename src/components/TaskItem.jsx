import React, { useEffect, useState } from 'react'
import moment from 'moment';
import 'moment/locale/ko'
import styles from '../styles/taskItem.module.css'
import useTasks from '../hooks/useTasks';

export default function TaskItem({id, task, task:{status, taskName, taskInfo, createdAt}}) {
  const [checked, setChecked] = useState(status === 'active' ? false : true );

  const { updateTaskStatus } = useTasks();

  const ended_at = moment(new Date()).format('YYYY년 MM월 DD일')

  const handleCheck = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked)
    updateTaskStatus.mutate({...task, ['status']: isChecked ? 'done' : 'active', ['ended_at']: isChecked ? ended_at : ''})
  }

  let date = moment(createdAt).format('YYYY년 MM월 DD일')

  return (
    <div className={styles.task_item}>
      <input type='checkbox' checked={checked} onChange={handleCheck}/>
      <div className={styles.task_content}>
        <p className={styles.task_name}>{taskName}</p>
        <p className={styles.task_info}>{taskInfo}</p>
        <p className={styles.created_at}>{date}</p>
      </div>

    </div>
  )
}
