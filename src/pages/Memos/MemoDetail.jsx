import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import styles from '../../styles/memoDetail.module.css'
import {TbChevronLeft} from 'react-icons/tb'
import CodeEditor from '@uiw/react-textarea-code-editor';
import moment from 'moment';
import 'moment/locale/ko'
import {MdOutlineEdit, MdOutlineDelete} from 'react-icons/md'

export default function MemoDetail() {
  const {state:{memo:{id, title, category, mainText, refLink, codePack, createdAt}}} = useLocation();
  let date = moment(createdAt).format('YYYY년 MM월 DD일 HH:mm:ss')
  return (
    <section>
      <Link to='/memos'><TbChevronLeft/><span> 나의 메모</span></Link>

      <div className={styles.detail_container}>
        <div className={styles.left_side}>
        <div className={styles.top_content}>
          <div>
            <div className={styles.category_box}>{category}</div>
            <h2>{title}</h2>
            <p className={styles.date_text}>📆 {date}</p>
          </div>
          <div className={styles.edit_del_btns}>
            <button className={styles.edit_btn}><MdOutlineEdit/><span>수정</span></button>
            <button className={styles.del_btn}><MdOutlineDelete/><span>삭제</span></button>
          </div>
        </div>
          <div className={styles.main_text}>{mainText.split("\n").map((line, i) => 
            <span key={i}>{line}<br/></span>
          )}</div>
        </div>
        <div className={styles.code_container}>
          {codePack && Object.values(codePack).map((code, i) => (
            <>
              <CodeEditor
              className={styles.codeBox}
              key={i}
              name={`code${i}`}
              value={code ?? ''}
              language="js"
              padding={50}
              style={{
                fontSize: 12,
                backgroundColor: "#000",
              }}
              disabled
              /><br/>
            </>

          ))}
        </div>
      </div>


    </section>
  )
}
