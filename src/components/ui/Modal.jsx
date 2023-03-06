import React from 'react';
import { removeError, removeMemo } from '../../api/firebase';
import { useAuthContext } from '../../context/AuthContext';
import styles from '../../styles/modal.module.css'
import {useNavigate} from 'react-router-dom'

export const Modal = ({ open, close, header, subText, postId, type }) => {
  const navigate = useNavigate();
  const {uid} = useAuthContext();
  const handleDel = () => {
    if(type==="memos"){
      removeMemo(uid, postId);
      navigate(`/${type}/`);
    }
    else if(type==="errors"){
      removeError(uid, postId);
      navigate(`/${type}/`);
    }
  }

  return (
    <div className={open && styles.modal_bg}>
      <div className={styles.modal_container}>
        {open ? (
          <section>
            <h3>
              {header}
            </h3>
            {subText}
            <footer>
              <button className={styles.close_btn} onClick={close}>
                닫기
              </button>
              <button className={styles.del_btn} onClick={handleDel}>
                삭제
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    </div>

  );
};