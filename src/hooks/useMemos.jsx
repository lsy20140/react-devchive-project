import { useMutation, useQueryClient} from '@tanstack/react-query'
import { editMemoContents } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useMemos() {
  const {uid} = useAuthContext();
  const queryClient = useQueryClient();

  const editMemo = useMutation((memo) => editMemoContents(uid, memo), {
    onSuccess: () => {
      queryClient.invalidateQueries(['memos', uid]);
    } 
  })  

  return {editMemo }

}
