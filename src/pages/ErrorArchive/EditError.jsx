import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { useAuthContext } from '../../context/AuthContext';
import useErrors from '../../hooks/useErrors';
import styles from '../../styles/newMemo.module.css'
import CodeEditor from '@uiw/react-textarea-code-editor';
import { uploadImage } from '../../api/upload';

export default function EditError() {
  const {uid} = useAuthContext();
  const {state:{error}} = useLocation();
  const {editError} = useErrors();
  const [updateError, setUpdateError] = useState({...error});
  const [file, setFile] = useState();
  const [editorCntA, setEditorCntA] = useState([updateError.codePackA ? (Object.keys(updateError.codePackA)).length : ''])
  const [editorCntB, setEditorCntB] = useState([updateError.codePackB ? (Object.keys(updateError.codePackB)).length : ''])
  const [codePackA, setCodePackA] = useState({...error.codePackA})
  const [codePackB, setCodePackB] = useState({...error.codePackB})
  const [success, setSuccess] = useState(false);


  const handleChange = (e) => {
    const {name, value, files} = e.target;
    if(name === 'file'){
      console.log(files)
      setFile(files && files[0]);
      return;
    }
    if(name.includes('codeA')){
      setCodePackA({...updateError.codePackA, [name]: value});
      setUpdateError((updateError) => ({...updateError, ['codePackA']: codePackA}))
      return;
    }
    if(name.includes('codeB')){
      setCodePackB({...updateError.codePackB, [name]: value});
      setUpdateError((updateError) => ({...updateError, ['codePackB']: codePackB}))
      return;
    }
    setUpdateError((updateError) => ({...updateError, [name]: value}))
    let date = new Date();
    setUpdateError((updateError) => ({...updateError, ['createdAt']: String(date)}))

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let date = new Date();
    editError.mutate({...updateError, ['createdAt']: String(date)})

  }

  const handleEditorCount = (e) => {
    const{name} = e.target

    if(name === 'editorA'){
      let countArr = [...editorCntA]
      let counter = countArr.slice(-1)[0]
      counter += 1
      countArr.push(counter)
      setEditorCntA(countArr);
    }
    else{
      let countArr = [...editorCntB]
      let counter = countArr.slice(-1)[0]
      counter += 1
      countArr.push(counter)
      setEditorCntB(countArr);
    }


  }

  return (
    <section>
      <h3>오류 수정하기</h3>
      {success && <p>✅{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <div className={styles.leftSide}>
            <label htmlFor='file'>캡처 이미지</label><br/>  
            <input 
              type='file' 
              accept='image/*' 
              name='file' 
              required
              onChange={handleChange}
            />
            {<img src={updateError.imgUrl} alt='local file'/>}
            
            <label htmlFor='refLink'>참고링크</label><br/>  
            <input 
              type='text' 
              name='refLink'
              value={updateError.refLink ?? ''}
              id='refLink' 
              placeholder='참고했던 링크를 입력해주세요.'
              onChange={handleChange}
            /><br/> 
            <label htmlFor='cause'>오류 발생 원인<span> *</span></label><br/>  
            <textarea
              name='cause'
              value={updateError.cause ?? ''}
              cols='100' rows='5' 
              placeholder='오류가 발생한 원인을 기록해보세요!'
              onChange={handleChange}
              required></textarea><br/>  
            <label htmlFor='solution'>해결 방법<span> *</span></label><br/>  
            <textarea
              name='solution'
              value={updateError.solution ?? ''}
              cols='100' rows='5' 
              placeholder='어떻게 오류를 해결했는지 기록해보세요!'
              onChange={handleChange}
              required></textarea><br/>  
              <Button text={'저장하기'}/>
          </div>
          
          <div className={styles.rightSide}>
            <label htmlFor='code' >
              오류 발생 코드
              <input type='button' name='editorA' value='+ 코드 추가' onClick={handleEditorCount}/>
            </label>
            <div className={styles.codePack}>
              
              {error.codePackA && Object.keys(error.codePackA).map((item, i) => (        
                <CodeEditor
                  className={styles.codeBox}
                  key={i}
                  name={`codeA${i}`}
                  value={codePackA[Object.keys(codePackA)[i]]?? ''}
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
            <label htmlFor='code' >
              해결된 코드
              <input type='button' name='editorB' value='+ 코드 추가' onClick={handleEditorCount}/>
            </label>
            <div className={styles.codePack}>
              {error.codePackB && Object.keys(error.codePackB).map((item, i) => (        
                <CodeEditor
                  className={styles.codeBox}
                  key={i}
                  name={`codeB${i}`}
                  value={codePackB[Object.keys(codePackB)[i]]?? ''}
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
