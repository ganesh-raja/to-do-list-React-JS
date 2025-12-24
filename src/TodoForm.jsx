import React from 'react'

const TodoForm = ({task, setTask}) => {

    const taskSumbit = (e) => {
        e.preventDefault();

        const tform = document.getElementById("taskform")
        const taskId = document.getElementById("taskid")
        const taskName = document.getElementById("ntask")
        const taskPrior = document.getElementById("ptask")
        const taskDate = document.getElementById("sdate")

        if (taskName.value === "") {
            alert("Please enter task name.")
            taskName.focus()
            return
        }
        if (taskPrior.value === "") {
            alert("Please select task priority.")
            taskPrior.focus()
            return
        }
        if (taskDate.value === "") {
            alert("Please set task date")
            taskDate.focus()
            return
        }

        const tmethod = taskId.value === "" ? "ADD" : "EDIT" 
        
        const cDate = new Date(taskDate.value)
        const indDate = cDate.toLocaleDateString("en-CA")

        if (tmethod === "ADD") {

            const idVal = task.length > 0 ? task[task.length-1].Id + 1 : 1

            const addtask = {
                Id: idVal,
                Name: taskName.value,
                Priority: taskPrior.value,
                Date: indDate,
                Active: false
            }
            
            const taskList = [...task, addtask]
            setTask(taskList)
            localStorage.setItem("allTask", JSON.stringify(taskList))
            alert("New task added successfully.") 
            tform.reset()           
        }

        if (tmethod === "EDIT") {       

            const updateTask = task.map(
                t => t.Id === Number(taskId.value)
                ? {
                    ...t,
                    Name: taskName.value,
                    Priority: taskPrior.value,
                    Date: indDate
                 } 
                : t
            )

            setTask(updateTask)
            localStorage.setItem("allTask", JSON.stringify(updateTask))
            alert("Task updated successfully.") 
            tform.reset() 
        }
        
        return
    }

    const formreset = () => {
        const tform = document.getElementById("taskform")
        const taskId = document.getElementById("taskid")
        taskId.value = ""
        tform.reset()
    }   

  return (
    <>
        <div className="row">
            <div className="col-12">
            <h1 className='text-center mb-3'>                
                <span className='bg-primary-subtle border border-primary-subtle text-primary-emphasis rounded px-1'>To</span>-
                <span className='bg-success-subtle border border-success-subtle text-success-emphasis rounded px-1'>Do</span>-
                <span className='bg-secondary-subtle border border-secondary-subtle text-secondary-emphasis rounded px-1'>List</span>                
            </h1>
            </div>
            <hr />
        </div>
        <form action="" id="taskform" onSubmit={taskSumbit}>
        <div className="row mt-3">
            <div className="col-12 col-md-4">
                <div className="form-group">
                <label htmlFor="ntask" className='form-label'>Task Name</label>
                <input type="text" className='form-control' id='ntask' placeholder='Enter task name'/>
                <input type="hidden" id="taskid" value=""/>
                </div>
            </div>
            <div className="col-12 col-md-4">
                <div className="form-group">
                <label htmlFor="ptask" className='form-label'>Priority</label>
                <select id="ptask" className='form-select'>
                    <option value="L">Low</option>
                    <option value="M">Medium</option>
                    <option value="H">High</option>
                </select>
                </div>
            </div>
            <div className="col-12 col-md-4">
                <div className="form-group">
                <label htmlFor="sdate" className='form-label'>Set Date</label>
                <input type="date" id='sdate' className='form-control'/>
                </div>
            </div>
            <div className="col-12 mt-2">
                <div className="form-group d-flex justify-content-center mt-3">
                <button type="submit" className='btn btn-success me-3'>Save</button>
                <button type="button" className='btn btn-secondary' onClick={() => formreset()}>Reset</button>
                </div>
            </div>
        </div>
        </form>
    </>
  )
}

export default TodoForm
