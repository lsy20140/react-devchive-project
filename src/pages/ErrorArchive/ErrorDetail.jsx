import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import {TbChevronLeft} from 'react-icons/tb'
import styles from '../../styles/errorDetail.module.css'
import moment from 'moment';
import 'moment/locale/ko'
import CodeEditor from '@uiw/react-textarea-code-editor';


export default function ErrorDetail() {
  const {state: {error, error: {id, imgUrl, cause, solution, refLink, codePackA, codePackB, createdAt }}} = useLocation()
  let date = moment(createdAt).format('YYYY년 MM월 DD일 HH:mm:ss')
  return (
    <section>
      <Link to='/errors'><TbChevronLeft/><span>오류 모음 </span></Link>
      <p className={styles.date_text}>📆 {date}</p>
      <div className={styles.detail_container}>
        <div className={styles.left_side}>
          <h3>오류 발생</h3>
          <p>{cause.split("\n").map((line, i) => 
            <span key={i}>{line}<br/></span>
          )}</p>
          <img src={imgUrl} className={styles.image}/>

          <div className={styles.code_container}>
            {codePackA && Object.values(codePackA).map((code, i) => (
              <>
                <CodeEditor
                className={styles.codeBox}
                key={i}
                name={`codeA${i}`}
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
        <div className={styles.right_side}>
          <h3>해결</h3>
          <div className={styles.refLink}>
            <p>참고한 링크</p>
            <a href={refLink}
              target="_blank"
              rel="noopener noreferrer">{refLink}</a>
          </div>
          <p>해결 방법</p>       
          <div>{solution.split("\n").map((line, i) => 
              <span key={i}>{line}<br/></span>
            )}</div>
        </div>
      </div>
    </section>
  )
}
