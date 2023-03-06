import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import {TbChevronLeft} from 'react-icons/tb'
import styles from '../../styles/errorDetail.module.css'
import moment from 'moment';
import 'moment/locale/ko'
import CodeEditor from '@uiw/react-textarea-code-editor';
import {MdOutlineEdit, MdOutlineDelete} from 'react-icons/md'
import { Modal } from '../../components/ui/Modal';
import {useNavigate} from 'react-router-dom'


export default function ErrorDetail() {
  const {state: {error, error: {id, imgUrl, cause, solution, refLink, codePackA, codePackB, createdAt }}} = useLocation()
  let date = moment(createdAt).format('YYYY년 MM월 DD일 HH:mm:ss')

  const navigate = useNavigate();
  
  const [toggleModal, setToggleModal] = useState(false);

  const openModal = () => {
    setToggleModal(true);
  };
  const closeModal = () => {
    setToggleModal(false);
  };

  return (
    <section>
      <Link to='/errors'><TbChevronLeft/><span>오류 모음 </span></Link>
      <div className={styles.top}>
        <p className={styles.date_text}>📆 {date}</p>
        <div className={styles.edit_del_btns}>
          <button className={styles.edit_btn} onClick={() => navigate(`/errors/edit/${id}`, {state: {error}})}><MdOutlineEdit/><span>수정</span></button>
          <button className={styles.del_btn} onClick={openModal}><MdOutlineDelete/><span>삭제</span></button>
        </div>
      </div>

      <div className={styles.detail_container}>
        <div className={styles.left_side}>
          <h3>오류 발생</h3>
          <p className={styles.title}>원인</p>
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
            <p className={styles.title}>참고한 링크</p>
              <a href={refLink}
                target="_blank"
                rel="noopener noreferrer">{refLink}</a>
          </div>
          <p className={styles.title}>해결 방법</p>       
          <div>{solution.split("\n").map((line, i) => 
              <span key={i}>{line}<br/></span>
            )}</div>
        </div>
      </div>
      <Modal
        open={toggleModal}
        close={closeModal}
        header="오류 포스트 삭제"
        subText={
          <main>
            <p>해당 글을 삭제하시겠습니까?</p>
            <p>삭제한 글은 복구 할 수 없습니다.</p>
          </main>
        }
        postId={id}
        type="errors"
      />
    </section>
  )
}
