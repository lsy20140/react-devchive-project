import React, { useState } from 'react'
import styles from '../../styles/newMemo.module.css'
import CodeEditor from '@uiw/react-textarea-code-editor';
import Button from '../../components/ui/Button';


export default function NewError() {
  const [error, setError] = useState({});
  const [file, setFile] = useState();
  const [editorCnt, setEditorCnt] = useState([1]);
  const [codePack, setCodePack] = useState({});

  const handleChange = (e) => {
    const {name, value, files} = e.target;
    if(name === 'file'){
      setFile(files && files[0]);
      return;
    }
    setError((error) => ({...error, [name]: value}))
  }
  return (
    <section>
      <h3>새 오류 추가하기</h3>
      {/* 1. 오류 발생 사진 첨부 2. 오류 발생 원인 3. 해결 방법 4. 참고 링크 5. Code(해결 전/후) */}
      <form>
        <div className={styles.input_container}>
          <div className={styles.leftSide}>
            <input 
              type='file' 
              accept='image/*' 
              name='file' 
              required
              onChange={handleChange}
            />
            <label htmlFor='refLink'>참고링크</label><br/>  
            <input 
              type='text' 
              name='refLink'
              value={error.refLink ?? ''}
              id='refLink' 
              placeholder='참고했던 링크를 입력해주세요.'
              onChange={handleChange}
            /><br/> 
            <label htmlFor='text'>오류 발생 원인<span> *</span></label><br/>  
            <textarea
              name='cause'
              value={error.cause ?? ''}
              cols='100' rows='5' 
              placeholder='오류가 발생한 원인을 기록해보세요!'
              onChange={handleChange}
              required></textarea><br/>  
            <label htmlFor='text'>해결 방법<span> *</span></label><br/>  
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
            <label htmlFor='code'>
              Code
              <input type='button' value='+ 코드 추가'/>
            </label><br/>  
            <div>
              {editorCnt && editorCnt.map((item, i) => (        
                <CodeEditor
                  key={i}
                  name={`code${i}`}
                  value={error.code ?? ''}
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
