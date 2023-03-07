export default function stats() {
  const achieveRate = (tasks) => {
    const activeTasks = tasks && tasks.filter((task) => task.status === 'active')
    const doneTasks = tasks && tasks.filter(task => task.status === 'done')
  
    const achieveRate = (activeTasks && doneTasks) && Math.ceil((doneTasks.length / (activeTasks.length+doneTasks.length) *100) * 10) / 10;
    
    return achieveRate;
  }

  return { achieveRate }
}