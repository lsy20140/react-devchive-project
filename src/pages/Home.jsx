import React from 'react'
import { getTasks } from '../api/firebase'
import TaskCard from '../components/TaskCard'
import styles from '../styles/home.module.css'
import {useQuery} from '@tanstack/react-query'
import { useAuthContext } from '../context/AuthContext'

export default function Home() {
  const {uid} = useAuthContext();

  const {data: tasks} = useQuery(['tasks', uid || ''], () => getTasks(uid), {
    enabled: !!uid,
    staleTime: 2000,
  })

  const hasTasks = tasks && tasks.length >0

  const activeTasks = tasks && tasks.filter((task) => task.status === 'active')
  const doneTasks = tasks && tasks.filter(task => task.status === 'done')

  const achieve_rate = (activeTasks && doneTasks) && Math.ceil((doneTasks.length / (activeTasks.length+doneTasks.length) *100) * 10) / 10;

  return (
    <section>
      <div className={styles.box}>
        <p>Github 커밋 기록</p>
        <img src="https://ghchart.rshah.org/lsy20140" />
      </div>
      <div className={styles.box}>
          <p>전체 달성률</p>
          
          <div className={styles.total_stats_content}>
            {achieve_rate}%
            <img className={styles.check_img} src='check.png'/>

          </div>
          
        </div>
      
      {hasTasks && 
        <div className={styles.todo_container}>
          {tasks && 
            <TaskCard
              status='진행 중 🔥'
              tasks={activeTasks}     
            />
          }
        </div>
      }
      

    </section>
  )
}
