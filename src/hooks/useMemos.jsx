import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { editMemoContents, getMemos, removeMemo } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useMemos() {
  const {uid} = useAuthContext();
  const queryClient = useQueryClient();

  const memosQuery = useQuery(['memos', uid || ''], () => getMemos(uid), {
    enabled: !!uid
  })

  const editMemo = useMutation((memo) => editMemoContents(uid, memo), {
    onSuccess: () => {
      queryClient.invalidateQueries(['memos', uid]);
    } 
  })  

  const deleteMemo = useMutation((id) => removeMemo(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['memos',uid]);
    }
  })

  return {memosQuery, editMemo, deleteMemo }

}
