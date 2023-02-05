import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import styles from '../../styles/memoDetail.module.css'
import {TbChevronLeft} from 'react-icons/tb'
import CodeEditor from '@uiw/react-textarea-code-editor';

export default function MemoDetail() {
  const {state:{memo:{id, title, category, mainText, refLink, codePack, createdAt}}} = useLocation();

  return (
    <section>
      <Link to='/memos'><TbChevronLeft/><span> 나의 메모</span></Link>
      <div className={styles.detail_container}>
        <div className={styles.left_side}>
          <div className={styles.category_box}>{category}</div>
          <h2>{title}</h2>
          <p>{createdAt}</p><br/>
          <div className={styles.main_text}>{mainText.split("\n").map((line, i) => 
            <span key={i}>{line}<br/></span>
          )}</div>
        </div>
        <div className={styles.right_side}>
          {codePack && Object.values(codePack).map((code, i) => (
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
              />
          ))}
        </div>
      </div>


    </section>
  )
}
