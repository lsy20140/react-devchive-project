import React, { useState } from 'react'
import styles from '../../styles/newMemo.module.css'
import CodeEditor from '@uiw/react-textarea-code-editor';
import Button from '../../components/ui/Button';
import { uploadImage } from '../../api/upload';
import { useAuthContext } from '../../context/AuthContext';
import { addNewError } from '../../api/firebase';


export default function NewError() {
  const {uid} = useAuthContext();
  const [error, setError] = useState({});
  const [file, setFile] = useState();
  const [editorCntA, setEditorCntA] = useState([1]);
  const [codePackA, setCodePackA] = useState({});
  const [editorCntB, setEditorCntB] = useState([1]);
  const [codePackB, setCodePackB] = useState({});
  const [success, setSuccess] = useState();
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const {name, value, files} = e.target;
    if(name === 'file'){
      setFile(files && files[0]);
      return;
    }
    if(name.includes('codeA')){
      setCodePackA({...codePackA, [name]: value});
      setError((error) => ({...error, ['codePackA']: codePackA}))
      return;
    }
    if(name.includes('codeB')){
      setCodePackB({...codePackB, [name]: value});
      setError((error) => ({...error, ['codePackB']: codePackB}))
      return;
    }
    setError((error) => ({...error, [name]: value}))
    let date = new Date();
    setError((error) => ({...error, ['createdAt']: String(date)}))

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);
    uploadImage(file)
    .then((url) => {
      addNewError(uid, error, url)
      .then(() => {
        setSuccess('글이 성공적으로 추가되었습니다.')
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setUploading(false);
        setError({});
        setFile();
        setCodePackA({})
        setCodePackB({})
      })
      
    })
    .catch(e => console.log(e))

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
      <h3>새 오류 추가하기</h3>
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
            {file && <img src={URL.createObjectURL(file)} alt='local file'/>}
            
            <label htmlFor='refLink'>참고링크</label><br/>  
            <input 
              type='text' 
              name='refLink'
              value={error.refLink ?? ''}
              id='refLink' 
              placeholder='참고했던 링크를 입력해주세요.'
              onChange={handleChange}
            /><br/> 
            <label htmlFor='cause'>오류 발생 원인<span> *</span></label><br/>  
            <textarea
              name='cause'
              value={error.cause ?? ''}
              cols='100' rows='5' 
              placeholder='오류가 발생한 원인을 기록해보세요!'
              onChange={handleChange}
              required></textarea><br/>  
            <label htmlFor='solution'>해결 방법<span> *</span></label><br/>  
            <textarea
              name='solution'
              value={error.solution ?? ''}
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
              
              {editorCntA && editorCntA.map((item, i) => (        
                <CodeEditor
                  className={styles.codeBox}
                  key={i}
                  name={`codeA${i}`}
                  value={error.codeB ?? ''}
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
              {editorCntB && editorCntB.map((item, i) => (        
                <CodeEditor
                  className={styles.codeBox}
                  key={i}
                  name={`codeB${i}`}
                  value={error.codeB ?? ''}
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
