import React, { useEffect, useState } from 'react'
import styles from '../styles/modal.module.css'
import {useNavigate} from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import { addNewTask } from '../api/firebase';

export default function AddTaskModal({ open, close, header }) {
  const {uid} = useAuthContext();
  const navigate = useNavigate();

  const [task, setTask] = useState({});
  const [success, setSuccess] = useState();
  const [error, setError] = useState(false);

  const handleChange =(e) => {
    const {name, value} = e.target;
    setTask((task) => ({...task, [name]: value}));
    let date = new Date();
    setTask((task) => ({...task, ['createdAt']: String(date), ['status']:'active'}))
  }

  const handleSubmit = (e) => {
    addNewTask(uid, task)
    .then(() => {
      setSuccess('할 일이 성공적으로 추가되었습니다');
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
      close()
    })
    .catch(e => setError('에러 발생'))
    .finally(() => {
      setTask({})
      
    })
  }


  return (
    <div className={open && styles.modal_bg}>
      <div className={styles.modal_container}>
        {open ? (
          <section>
            <h3>
              {header}
            </h3>
            <main>
              <input 
                type='text' 
                id='taskName' 
                name='taskName' 
                value={task.taskName ?? ''}
                placeholder='할 일' 
                onChange={handleChange}
                required/><br/>  
            <textarea
              name='taskInfo'
              value={task.taskInfo ?? ''}
              cols='100' rows='5' 
              placeholder='추가 내용'
              onChange={handleChange}
              required></textarea><br/>  
            </main>
            <footer>
              <button className={styles.close_btn} onClick={close}>
                닫기
              </button>
              <button onClick={handleSubmit}>
                저장
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    </div>

  );
}
