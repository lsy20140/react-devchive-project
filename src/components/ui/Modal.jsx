import React from 'react';
import styles from '../../styles/modal.module.css'
import {useNavigate} from 'react-router-dom'
import useMemos from '../../hooks/useMemos';
import useErrors from '../../hooks/useErrors';

export const Modal = ({ open, close, header, subText, postId, type }) => {
  const navigate = useNavigate();
  const {deleteMemo} = useMemos()
  const {deleteError} = useErrors();

  const handleDel = () => {
    if(type==="memos"){
      deleteMemo.mutate(postId);
    }
    else if(type==="errors"){
      deleteError.mutate(postId);
    }
    navigate(`/${type}/`);
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