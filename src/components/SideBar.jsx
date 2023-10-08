import React from 'react'
import { Link } from 'react-router-dom';
import {MdOutlineSpaceDashboard, MdOutlineErrorOutline, MdChecklist, MdOutlineLibraryMusic, MdAddCircle} from 'react-icons/md'
import {HiOutlinePencilAlt} from 'react-icons/hi'
import styles from '../styles/sideBar.module.css'

export default function SideBar() {

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo_content}>
        <Link to='/' className={styles.logo}>
          <img width={'28px'} height={'28px'} src='logo.png'/>
          <p>devchive</p>
        </Link>
        
      </div>
      <p>Menu</p>
      <ul>
        <Link to='/'>
          <MdOutlineSpaceDashboard className={styles.icon}/>
          <p>홈</p>
        </Link>

        <Link to='/memos'>
          <HiOutlinePencilAlt className={styles.icon}/>
          <p>메모</p>
        </Link>
        <Link to='/errors'>
          <MdOutlineErrorOutline className={styles.icon}/>
          <p>오류 모음</p>
        </Link>
        <Link to='/mywork'>
          <MdChecklist className={styles.icon}/>
          <p>할 일</p>
        </Link>
        <Link to='/music'>
          <MdOutlineLibraryMusic className={styles.icon}/>
          <p>뮤직</p>
        </Link>
      </ul>
      <p>Create</p>
      <div className={styles.add_btns}>
        <Link to ='/memos/new'>
          <div>
            <HiOutlinePencilAlt/>
            <span>새 메모</span>
          </div>
          <MdAddCircle className={styles.add_icon}/>
        </Link>
        <hr/>
        <Link to ='/errors/new'>
          <div>
            <MdOutlineErrorOutline/>
            <span>새 오류</span>
          </div>
          <MdAddCircle className={styles.add_icon}/>
        </Link>
      </div>
    </div>
  )
}
