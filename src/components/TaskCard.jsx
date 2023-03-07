import React from 'react'
import styles from '../styles/taskCard.module.css'
import TaskItem from './TaskItem'

export default function TaskCard({id, status, tasks}) {
  return (
    <div className={styles.task_card}>
      <p>{status}</p>
      <ul className={styles.task_items}>
        {tasks.length > 0 ? tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
          />
        )) : <p>진행 중인 할 일이 없습니다.~</p>}
      </ul>
    </div>
  )
}
