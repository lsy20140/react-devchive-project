import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { getTasks, removeTask, updateTask } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useTasks() {
  const {uid} = useAuthContext();
  const queryClient = useQueryClient();

  const tasksQuery = useQuery(['tasks', uid || ''], () => getTasks(uid), {
    enabled: !!uid
  })

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

  return { tasksQuery, updateTaskStatus, deleteTask }

}
