import React, { useState } from 'react'
import { getTasks } from '../api/firebase';
import AddTaskModal from '../components/AddTaskModal';
import TaskCard from '../components/TaskCard';
import { useAuthContext } from '../context/AuthContext';
import {useQuery} from '@tanstack/react-query'
import styles from '../styles/myWork.module.css'
import MonthlyTasksBox from '../components/MonthlyTasksBox';



export default function MyWork() {
  const {uid} = useAuthContext();

  const [toggleModal, setToggleModal] = useState(false);

  const openModal = () => {
    setToggleModal(true);
  };
  const closeModal = () => {
    setToggleModal(false);
  };

  const {data: tasks} = useQuery(['tasks', uid || ''], () => getTasks(uid), {
    enabled: !!uid,
    staleTime: 2000,
  })

  const activeTasks = tasks && tasks.filter(task => task.status === 'active');
  const doneTasks = tasks && tasks.filter(task => task.status === 'done')

  const achieve_rate = Math.ceil((doneTasks.length / (activeTasks.length+doneTasks.length) *100) * 10) / 10;


  const hasTasks = tasks && tasks.length >0


  return (
    <div className='page_container'>
      
      <div className={styles.top_box}>
        <h3>할 일</h3>
        <button onClick={openModal}><span>+ 할 일 추가</span></button>
      </div>
      
        <AddTaskModal
        open={toggleModal}
        close={closeModal}
        header="할 일 추가"
      />
      {hasTasks && 
        <ul className={styles.todo_container}>
          {tasks && 
            <TaskCard
              status='진행 중 🔥'
              tasks={activeTasks}     
            />
          }
          {tasks && 
            <TaskCard
              status='완료 😀'
              tasks={doneTasks}     
            />
          }
        </ul>
      }
      <div className={styles.stats_container}>
        <div className={styles.montly_tasks_box}>
          <p>월별 추가한 할 일 수</p>
          <MonthlyTasksBox tasks={tasks}/>
        </div>
        <div className={styles.total_stats}>
          <p>전체 달성률</p>
          <div className={styles.total_stats_content}>
            {achieve_rate}%
            <img className={styles.check_img} src='check.png'/>

          </div>
          
        </div>
      </div>



    </div>
  )
}
