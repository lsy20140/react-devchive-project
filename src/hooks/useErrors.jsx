import React from 'react'
import { useAuthContext } from '../context/AuthContext';
import { useMutation, useQueryClient} from '@tanstack/react-query'
import { editErrorContents } from '../api/firebase';

export default function useErrors() {
  const {uid} = useAuthContext();
  const queryClient = useQueryClient();

  const editError = useMutation((memo) => editErrorContents(uid, memo), {
    onSuccess: () => {
      queryClient.invalidateQueries(['errors', uid]);
    } 
  })  

  return {editError }
}
