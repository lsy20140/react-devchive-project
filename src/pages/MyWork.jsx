import React, { useState } from 'react'
import AddTaskModal from '../components/AddTaskModal';
import TaskCard from '../components/TaskCard';
import styles from '../styles/myWork.module.css'
import MonthlyTasksBox from '../components/MonthlyTasksBox';
import useTasks from '../hooks/useTasks';
import stats from './utils/stats';



export default function MyWork() {
  const [toggleModal, setToggleModal] = useState(false);

  const openModal = () => {
    setToggleModal(true);
  };
  const closeModal = () => {
    setToggleModal(false);
  };


  const {tasksQuery: {data: tasks}} = useTasks();
  const {achieveRate} = stats();

  const hasTasks = tasks && tasks.length >0

  const activeTasks = tasks && tasks.filter((task) => task.status === 'active')
  const doneTasks = tasks && tasks.filter(task => task.status === 'done')

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
      <div>
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

      <div className={styles.stats_container}>
        <div className={styles.montly_tasks_box}>
          <p>Monthly Added Tasks</p>
          <MonthlyTasksBox tasks={tasks}/>
        </div>
        <div className={styles.total_stats}>
          <p>전체 달성률</p>
          <div className={styles.total_stats_content}>
            {achieveRate(tasks)}%
            <img className={styles.check_img} src='check.png'/>

          </div>
          
        </div>
      </div>



    </div>
  )
}
