import React from 'react'
import { Link } from 'react-router-dom';
import {MdMenu, MdOutlineSpaceDashboard, MdOutlineErrorOutline, MdChecklist, MdOutlineLibraryMusic, MdOutlineLogin, MdOutlineLogout} from 'react-icons/md'
import {HiOutlinePencilAlt} from 'react-icons/hi'
import { useAuthContext } from '../context/AuthContext';
import styles from '../styles/sideBar.module.css'

export default function SideBar() {
  const {user, login, logout} = useAuthContext();

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo_content}>
        <Link to='/' className={styles.logo}>
          <img src='logo.png'/>
          <p>devchive</p>
        </Link>
        <div className={styles.menu}><MdMenu/></div>
        
      </div>
      <p>Menu</p>
      <ul>
        <Link to='/'>
          <MdOutlineSpaceDashboard className={styles.icon}/>
          <p>대시보드</p>
        </Link>

        <Link to='/memos'>
          <HiOutlinePencilAlt className={styles.icon}/>
          <p>메모</p>
        </Link>
        <Link to='/errorarchive'>
          <MdOutlineErrorOutline className={styles.icon}/>
          <p>오류 모음</p>
        </Link>
        <Link to='/studylist'>
          <MdChecklist className={styles.icon}/>
          <p>계획</p>
        </Link>
        <Link to='/music'>
          <MdOutlineLibraryMusic className={styles.icon}/>
          <p>뮤직</p>
        </Link>
      </ul>
      <p>Account</p>
      <div>
        {!user &&
          <div className={styles.logout} onClick={login}>
            <MdOutlineLogin/>
            <p>로그인</p>
          </div>
        }
        {user && 
          <div className={styles.profile}>
            <img src={user.photoURL} className={styles.profileImg}/>
            <p>{user.displayName}</p>
          </div>
        }
        {user &&
          <div className={styles.logout} onClick={logout}>
            <MdOutlineLogout/>
            <p>로그아웃</p>
          </div>
        }

      </div>

    </div>
  )
}
