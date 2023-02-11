import React from 'react'
import styles from '../styles/taskCard.module.css'
import TaskItem from './TaskItem'

export default function TaskCard({id, status, tasks}) {
  return (
    <div className={styles.task_card}>
      <h3>{status}</h3>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
          />
        ))}
      </ul>
    </div>
  )
}
