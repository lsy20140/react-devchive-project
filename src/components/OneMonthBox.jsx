import React from 'react'
import styles from '../styles/oneMonthBox.module.css'

export default function OneMonthBox({month, cnt}) {
  
  // 월별로 등록한 tasks 수 각각 구해서
  // 색 5개로 나눠놓기(1(투명),2,3,4)
  // 0개 -> 1번 색 
  // 1개~3개 -> 2번 색
  // 4개~6개 -> 3번 색
  // 7개~9개 -> 4번 색

  return (
    <div className={styles.one_month}>
      <div className={styles.one_month_box} style={{ backgroundColor: `rgba(71, 84, 202, ${cnt/10})`}}>
        <span>{cnt}</span>
      </div>
      <p>{month === 0 ? '이번 달' :month+ '달 전'}</p>
    </div>

  )
}
