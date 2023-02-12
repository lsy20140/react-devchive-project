import { useMutation, useQueryClient} from '@tanstack/react-query'
import { updateTask } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useTasks() {
  const {uid} = useAuthContext();
  const queryClient = useQueryClient();
  

  const updateTaskStatus = useMutation((task) => updateTask(uid, task), {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', uid]);
    } 
  })  

  return {updateTaskStatus }

}
