import React from 'react'
import ErrorCard from '../../components/ErrorCard';
import useErrors from '../../hooks/useErrors';

export default function ErrorArchive() {
  const {errorsQuery:{data: errors}} = useErrors(); 

  const hasErrors = errors && errors.length > 0;
  return (
    <div className='page_container'>
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

    </div>
  )
}
