import React from 'react';
import styles from '../../styles/modal.module.css'

export const Modal = ({ open, close, header, subText }) => {

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
              <button className={styles.del_btn}>
                삭제
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    </div>

  );
};