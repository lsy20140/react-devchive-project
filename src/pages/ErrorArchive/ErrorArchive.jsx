import React from 'react'
import ErrorCard from '../../components/ErrorCard';
import { useAuthContext } from '../../context/AuthContext';
import useErrors from '../../hooks/useErrors';

export default function ErrorArchive() {
  const {errorsQuery:{data: errors}} = useErrors(); 
  const {user} = useAuthContext();
  const hasErrors = errors && errors.length > 0;

  return (
    <section>
      {user ? <>
        <h3>오류 모음</h3>
        {hasErrors &&
        <ul>
          {
            errors.map((error) => (
              <ErrorCard key={error.id} error={error}/>
            ))
          }
        </ul>
        }
      </> : <h3>로그인 후에 이용 가능합니다.</h3>}


    </section>
  )
}

