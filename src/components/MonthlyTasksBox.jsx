import React, { useEffect, useState } from 'react'
import OneMonthBox from './OneMonthBox'
import styles from '../styles/monthlyTasksBox.module.css'

export default function MonthlyTasksBox({tasks}) {

  const [monthlyCnt, setMonthlyCnt] = useState([]);
  const arrayLen = Array.from({length: 12}, () => 0);


  function getMonthDiff(createdAt) {
    let months;
    let d1 = new Date(createdAt);
    let d2 = new Date();

    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  useEffect(() => {
    arrayLen.map((item, i) => {
      const filteredTasks = tasks && tasks.filter((task) => getMonthDiff(task.createdAt) === i)
      monthlyCnt[i] = filteredTasks && filteredTasks.length;
      setMonthlyCnt([...monthlyCnt])
    })
  },[tasks])


  return (
    <div className={styles.monthly_tasks_box}>
      {
        monthlyCnt && monthlyCnt.map((cnt, i) => (
          <OneMonthBox key={i} cnt={cnt} month={i}/>
        ))
      }
    </div>
  )
}
