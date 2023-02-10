import React, { useState } from 'react'
import { addNewMemo } from '../../api/firebase';
import { useAuthContext } from '../../context/AuthContext';
import CodeEditor from '@uiw/react-textarea-code-editor';
import styles from '../../styles/newMemo.module.css'
import Button from '../../components/ui/Button'
import { useLocation } from 'react-router-dom';
import useMemos from '../../hooks/useMemos';


export default function EditMemo() {  
  const {state:{memo}} = useLocation();
  const { editMemo } = useMemos();
  const [updateMemo, setUpdateMemo] = useState({...memo});
  const [editorCnt, setEditorCnt] = useState([Object.values(updateMemo.codePack).length]);
  const [codePack, setCodePack] = useState({...memo})

  const handleChange = (e) => {
    const {name, value} = e.target;

    if(name.includes('code')){
      setCodePack({...updateMemo.codePack, [name]: value});
      setUpdateMemo((updateMemo) => ({...updateMemo, ['codePack']: codePack}))
      
      return;
    }

    setUpdateMemo({...updateMemo, [name]:value})
    console.log([name], value)
    console.log(memo )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let date = new Date();
    editMemo.mutate({...updateMemo, ['createdAt']: String(date)})
  }

  const handleEditorCount = () => {
    let countArr = [...editorCnt]
    let counter = countArr.slice(-1)[0]
    counter += 1
    countArr.push(counter)
    setEditorCnt(countArr);
    
  }

  return (
    <section>
      <h3>메모 수정하기</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <div className={styles.leftSide}>
            <label htmlFor='title'>제목<span> *</span></label><br/>  
            <input 
              type='text' 
              id='title' 
              name='title' 
              value={updateMemo.title ?? ''}
              placeholder='메모 제목을 입력하세요.' 
              onChange={handleChange}
              required/><br/>  

            <label htmlFor='category'>카테고리<span> *</span></label><br/>  
            <select defaultValue={updateMemo.category} name='category' onChange={handleChange} required>
              <option value=''>카테고리를  선택하세요 &nbsp;</option>
              <option value='React'>React</option>
              <option value='JavaScript'>JavaScript</option>
              <option value='HTML'>HTML</option>
              <option value='CSS'>CSS</option>
            </select><br/>

            <label htmlFor='text'>내용<span> *</span></label><br/>  
            <textarea
              name='mainText'
              value={updateMemo.mainText ?? ''}
              cols='100' rows='10' 
              placeholder='기억하고 싶은 내용을 기록해보세요!'
              onChange={handleChange}
              required></textarea><br/>  

            <label htmlFor='refLink'>참고링크</label><br/>  
            <input 
              type='text' 
              name='refLink'
              value={updateMemo.refLink ?? ''}
              id='refLink' 
              placeholder='참고했던 링크를 입력해주세요.'
              onChange={handleChange}/><br/> 
            <Button text={'저장하기'}/>
          </div>
          <div className={styles.rightSide}>
            <label htmlFor='code'>
              Code
              <input type='button' value='+ 코드 추가' onClick={handleEditorCount}/>
            </label><br/>  
            <div className={styles.codePack}>
              { Object.keys(updateMemo.codePack).map((item, i) => (        
                  <CodeEditor
                    className={styles.codeBox}
                    key={i}
                    name={`code${i}`}
                    value={(updateMemo.codePack)[Object.keys(updateMemo.codePack)[i]] ?? ''}
                    language="js"
                    placeholder="코드를 입력하세요"
                    onChange={handleChange}
                    padding={50}
                    style={{
                      fontSize: 12,
                      backgroundColor: "#000",
                    }}
                  />
                ))
              }
              {(editorCnt.map(x=> x-editorCnt[0])).map((item, i) => (
                  <CodeEditor
                  className={styles.codeBox}
                  key={i+editorCnt[0]}
                  name={`code${i+editorCnt[0]}`}
                  value={''}
                  language="js"
                  placeholder="코드를 입력하세요"
                  onChange={handleChange}
                  padding={50}
                  style={{
                    fontSize: 12,
                    backgroundColor: "#000",
                  }}
                />
              ))}




            </div>

          </div>
        </div>


        
      </form>
    </section>
  )
}
