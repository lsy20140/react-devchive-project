import React, { useState } from 'react'
import { addNewMemo } from '../../api/firebase';
import Button from '../../components/ui/Button'
import { useAuthContext } from '../../context/AuthContext';
import CodeEditor from '@uiw/react-textarea-code-editor';
import styles from '../../styles/newMemo.module.css'

export default function NewMemo() {

  const {uid} = useAuthContext();
  const [memo, setMemo] = useState({});
  const [success, setSuccess] = useState();
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setMemo((memo) => ({...memo, [name]: value}));  
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // firebase에 추가
    addNewMemo(uid, memo)
    .then(() => {
      setSuccess('메모가 성공적으로 추가되었습니다')
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    })
    .catch(e => setError('에러발생!!'))
    .finally(() => {
      setMemo({})
    })
  }

  return (
    <section>
      <p>새 메모 추가하기</p>
      {success && <div>{success}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>제목</label><br/>  
        <input 
          type='text' 
          id='title' 
          name='title' 
          value={memo.title ?? ''}
          placeholder='메모 제목을 입력하세요.' 
          onChange={handleChange}/><br/>  

        <label htmlFor='category'>카테고리</label><br/>  
        <select name='category' onChange={handleChange}>
          <option value=''>카테고리를 선택해주세요</option>
          <option value='react'>react</option>
          <option value='javascript'>javascript</option>
          <option value='html/css'>html/css</option>
        </select><br/>

        <label htmlFor='text'>내용</label><br/>  
        <textarea
          name='mainText'
          value={memo.mainText ?? ''}
          cols='100' rows='10' 
          placeholder='mainText'
          onChange={handleChange}></textarea><br/>  

        <label htmlFor='refLink'>참고링크</label><br/>  
        <input 
          type='text' 
          name='refLink'
          value={memo.refLink ?? ''}
          id='refLink' 
          placeholder='참고했던 링크를 입력해주세요.'
          onChange={handleChange}/><br/>  

        <label htmlFor='code'>코드</label><br/>  
        <CodeEditor
          name='code'
          value={memo.code ?? ''}
          language="js"
          placeholder="코드를 입력하세요"
          onChange={handleChange}
          padding={50}
          style={{
            fontSize: 12,
            backgroundColor: "#000",
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />

        <Button text='저장하기'/>
      </form>
    </section>
  )
}
