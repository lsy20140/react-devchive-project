import React from 'react'
import { useAuthContext } from '../context/AuthContext';
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { editErrorContents, getErrors, removeError } from '../api/firebase';

export default function useErrors() {
  const {uid} = useAuthContext();
  const queryClient = useQueryClient();

  const errorsQuery = useQuery(['errors', uid || ''], () => getErrors(uid), {
    enabled: !!uid
  })

  const editError = useMutation((memo) => editErrorContents(uid, memo), {
    onSuccess: () => {
      queryClient.invalidateQueries(['errors', uid]);
    } 
  })  

  const deleteError = useMutation((id) => removeError(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['errors', uid]);
    }
  })

  return { errorsQuery, editError, deleteError }
}
