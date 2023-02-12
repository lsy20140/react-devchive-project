import React, { useEffect, useState } from 'react'
import { getTasks } from '../api/firebase';
import AddTaskModal from '../components/AddTaskModal';
import TaskCard from '../components/TaskCard';
import { useAuthContext } from '../context/AuthContext';
import {useQuery} from '@tanstack/react-query'
import styles from '../styles/myWork.module.css'



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



    </div>
  )
}
