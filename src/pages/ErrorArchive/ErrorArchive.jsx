import React from 'react'
import { getErrors } from '../../api/firebase'
import { useAuthContext } from '../../context/AuthContext'
import {useQuery} from '@tanstack/react-query'
import ErrorCard from '../../components/ErrorCard';

export default function ErrorArchive() {
  const {uid} =useAuthContext();
  const {data: errors} = useQuery(['errors', uid || ''], () => getErrors(uid), {
    enabled: !!uid
  })

  const hasErrors = errors && errors.length > 0;
  return (
    <>
    {hasErrors &&
      <ul>
        {
          errors.map((error) => (
            <ErrorCard key={error.id} error={error}/>
          ))
        }
      </ul>
    }

    </>
  )
}
