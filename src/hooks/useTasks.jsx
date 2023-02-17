import { useMutation, useQueryClient} from '@tanstack/react-query'
import { removeTask, updateTask } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useTasks() {
  const {uid} = useAuthContext();
  const queryClient = useQueryClient();
  

  const updateTaskStatus = useMutation((task) => updateTask(uid, task), {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', uid]);
    } 
  })  

  const deleteTask = useMutation((id) => removeTask(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks',uid]);
    }
  })

  return {updateTaskStatus, deleteTask }

}
