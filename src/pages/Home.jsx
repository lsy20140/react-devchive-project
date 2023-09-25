import React from 'react'
import styles from '../styles/home.module.css'
import { useAuthContext } from '../context/AuthContext'
import TaskItem from '../components/TaskItem'
import MemoCard from '../components/MemoCard'
import useMemos from '../hooks/useMemos'
import useTasks from '../hooks/useTasks'
import date from './utils/date'
import TaskCard from '../components/TaskCard'
import stats from './utils/stats'

export default function Home() {
  const {user} = useAuthContext();

  const {memosQuery:{data: memos}} = useMemos();
  const {tasksQuery: {data: tasks}} = useTasks();

  const {monthDiff} = date();
  const {achieveRate} = stats();

  const filteredMemos = memos && memos.filter((memo) => monthDiff(memo.createdAt) === 0 )

  const activeTasks = tasks && tasks.filter((task) => task.status === 'active')

  return (
  <>
    {user ?
      <div className={styles.grid_container}>
      <div className={styles.box0}>
        <p>{user && user.displayName} 님의 Github 커밋 기록</p>
        <img src="https://ghchart.rshah.org/lsy20140" />
      </div>
      <div className={styles.box1}>
          <p>전체 달성률</p>
          <div className={styles.total_stats_content}>
            {achieveRate(tasks)}%
            <img className={styles.check_img} src='check.png'/>
          </div>
          
        </div>
      <div className={styles.box2}>
        {tasks && 
          <TaskCard
            status='진행 중 🔥'
            tasks={activeTasks}     
          />
        }
      </div>
      <div className={styles.box3}>
        <p>이번달에 작성한 메모</p>
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
      

    </div> : <section><h3>로그인 후에 이용 가능합니다.</h3></section>
    }
  </>


  )
}
