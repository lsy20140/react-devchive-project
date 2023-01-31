import React, { useState } from 'react'
import Button from '../../components/ui/Button'
import styles from '../../styles/newMemo.module.css'

export default function NewMemo() {

  const [memo, setMemo] = useState({});

  const handleChange = (e) => {
    const {name, value} = e.target;
    setMemo((memo) => ({...memo, [name]: value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // firebase에 추가

  }

  return (
    <section>
      <p>새 메모 추가하기</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>제목</label><br/>  
        <input 
          type='text' 
          id='title' 
          name='title' 
          value={memo.title}
          placeholder='메모 제목을 입력하세요.' 
          onChange={handleChange}/><br/>  

        <label htmlFor='category'>카테고리</label><br/>  
        <select name='category' onChange={handleChange}>
          <option value='react'>react</option>
          <option value='javascript'>javascript</option>
          <option value='html/css'>html/css</option>
        </select><br/>

        <label htmlFor='text'>내용</label><br/>  
        <textarea
          name='mainText'
          value={memo.mainText}
          cols='100' rows='10' 
          placeholder='mainText'
          onChange={handleChange}></textarea><br/>  

        <label htmlFor='refLink'>참고링크</label><br/>  
        <input 
          type='text' 
          name='refLink'
          id='refLink' 
          placeholder='참고했던 링크를 입력해주세요.'
          onChange={handleChange}/><br/>  

        <label htmlFor='code'>코드</label><br/>  
        <textarea 
          id='code' 
          name='code'
          cols='100' rows='10'
          placeholder='code'
          onChange={handleChange}></textarea><br/> 
        <Button text='저장하기'/>
      </form>
    </section>
  )
}
