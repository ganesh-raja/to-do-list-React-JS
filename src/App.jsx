import { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import TaskList from './TaskList'

function App() {  

  const [task, setTask] = useState([])  

  useEffect(() => {
    const stored = localStorage.getItem("allTask");
    if (!stored) return;

    const allTasks = JSON.parse(stored);

    const today = new Date();

    // yesterday
    const prev = new Date(today);
    prev.setDate(prev.getDate() - 1);
    const pdayfinal = prev.toLocaleDateString("en-CA")

    // today
    const todayfinal = today.toLocaleDateString("en-CA")

    // tomorrow
    const next = new Date(today);
    next.setDate(next.getDate() + 1);
    const ndayfinal = next.toLocaleDateString("en-CA")

    const reAsignTask = allTasks.map(all =>
      all.Active === false && all.Date < todayfinal
      ? {
          ...all,
          Priority : all.Priority === "L" ? "M" : all.Priority === "M" ? "H" : "H",
          Date : todayfinal
        }
      : all
    )

    const tdaytask = reAsignTask.filter(item => item.Date >= pdayfinal)

    setTask(tdaytask)
    localStorage.setItem("allTask", JSON.stringify(tdaytask))
  }, []);


  const [dayTask, setDayTask] = useState(new Date());

  const [tTask, setTTask] = useState([])  

  const [activeBtn, setActiveBtn] = useState("today");

  useEffect(() => {
    const selectDate = dayTask.toLocaleDateString("en-CA")
    const filtertask = task.filter(item => item.Date === selectDate)

    setTTask(filtertask)
    
  }, [task, dayTask]) 
  

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

  const prevDate = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    setDayTask(d);
    setActiveBtn("yesterday");
  };

  const nextDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    setDayTask(d);
    setActiveBtn("tomorrow");
  };

  const toDate = () => {    
    setDayTask(new Date())
    setActiveBtn("today")
  }

  return (
    <div className="container-sm">
      <TodoForm
        task={task} 
        setTask={setTask}
      />
      <div className="row mt-5">
        <div className="col">
          <ul className="pagination">
            <li className="page-item"><button type='button' className={`page-link ${activeBtn === 'yesterday' ? 'active' : '' }`} 
            disabled={activeBtn === 'yesterday' ? true : null } onClick={() => prevDate()}>Yesterday</button></li>
            <li className="page-item"><button type='button' className={`page-link ${activeBtn === 'today' ? 'active' : '' }`} 
            disabled={activeBtn === 'today' ? true : null } onClick={() => toDate()}>Today</button></li>
            <li className="page-item"><button type='button' className={`page-link ${activeBtn === 'tomorrow' ? 'active' : '' }`} 
            disabled={activeBtn === 'tomorrow' ? true : null } onClick={() => nextDate()}>Tomorrow</button></li>
          </ul>      
        </div>        
      </div>
      <div className="row mt-3">
        <div className="col">
          <ul className='list-group'>
          {tTask.length > 0 && 
            tTask.map(item => 
            <TaskList 
              key={item.Id}
              item={item} 
              editTask={editTask}
              delTask={delTask}
              formStatus={formStatus}
            />            
          )}
          {tTask.length === 0 &&
            <li className='list-group-item list-group-item-action'>              
              <p className='text-danger text-center mt-3'>No record found.</p>               
            </li>
          }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
