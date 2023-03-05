import React from 'react'
import { getMemos, getTasks } from '../api/firebase'
import styles from '../styles/home.module.css'
import {useQuery} from '@tanstack/react-query'
import { useAuthContext } from '../context/AuthContext'
import TaskItem from '../components/TaskItem'
import MemoCard from '../components/MemoCard'

export default function Home() {
  const {uid, user} = useAuthContext();

  const {data: tasks} = useQuery(['tasks', uid || ''], () => getTasks(uid), {
    enabled: !!uid,
    staleTime: 2000,
  })

  const {data: memos} = useQuery(['memos', uid || ''], () => getMemos(uid), {
    enabled: !!uid
  })

  function getMonthDiff(createdAt) {
    let months;
    let d1 = new Date(createdAt);
    let d2 = new Date();

    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  const filteredMemos = memos && memos.filter((memo) => getMonthDiff(memo.createdAt) === 1 )

  const hasTasks = tasks && tasks.length >0

  const activeTasks = tasks && tasks.filter((task) => task.status === 'active')
  const doneTasks = tasks && tasks.filter(task => task.status === 'done')

  const achieve_rate = (activeTasks && doneTasks) && Math.ceil((doneTasks.length / (activeTasks.length+doneTasks.length) *100) * 10) / 10;

  return (
    <div className={styles.grid_container}>
      <div className={styles.box0}>
        <p>{user.displayName}님의 Github 커밋 기록</p>
        <img src="https://ghchart.rshah.org/lsy20140" />
      </div>
      <div className={styles.box1}>
          <p>전체 달성률</p>
          
          <div className={styles.total_stats_content}>
            {achieve_rate}%
            <img className={styles.check_img} src='check.png'/>

          </div>
          
        </div>
      <div className={styles.box2}>
        <p>진행 중 🔥</p>
        {hasTasks ? 
          <ul className={styles.task_items}>
            {activeTasks && activeTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
              />
            ))}
          </ul>
          : undefined
        }
      </div>
      <div className={styles.box3}>
        <p>지난달에 작성한 메모</p>
        {filteredMemos && 
        <ul className={styles.memos}>
          {
            filteredMemos.map((memo) => (
              <MemoCard key={memo.id} memo={memo}/>
            ))
          }
        </ul>
        }
      </div>
      

    </div>
  )
}
