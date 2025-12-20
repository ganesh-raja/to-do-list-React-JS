import { useState } from 'react'
import TodoForm from './TodoForm'
import TaskList from './TaskList'

function App() {
  
  const [task, setTask] = useState( JSON.parse(localStorage.getItem("allTask")) || [])

  const editTask = (eid) => {

    const getTask = task.find(i => i.Id === eid)

    document.getElementById("taskid").value = getTask.Id
    document.getElementById("ntask").value = getTask.Name
    document.getElementById("ptask").value = getTask.Priority
    document.getElementById("sdate").value = getTask.Date
  }

  const delTask = (did) => {

    confirm("Are you sure want to delete task?")
    if (!confirm) return

    const getTask2 = task.filter(d => d.Id !== did)
    
    const tform = document.getElementById("taskform")
    const taskId = document.getElementById("taskid")
    taskId.value = ""
    tform.reset()   
    setTask(getTask2)
    localStorage.setItem("allTask", JSON.stringify(getTask2))
  }

  const formStatus = (sid) => {

    const taskstatus = task.map(
      st => st.Id === Number(sid)
      ? {
          ...st,
          Active: !st.Active
        }
      : st
    )

    setTask(taskstatus)
    localStorage.setItem("allTask", JSON.stringify(taskstatus))
  }

  return (
    <div className="container-sm">
      <TodoForm
        task={task} 
        setTask={setTask}
      />      
      <div className="row mt-3">
        <div className="col">
          <ul className='list-group'>
          {task.map(item => 
            <TaskList 
              key={item.Id}
              item={item} 
              editTask={editTask}
              delTask={delTask}
              formStatus={formStatus}
            />            
          )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
