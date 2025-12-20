import React from 'react'

const TaskList = ({item, formStatus, editTask, delTask}) => {  
    
    const priorityColor = {
        H: "bg-danger-subtle border border-danger-subtle text-danger-emphasis",
        M: "bg-warning-subtle border border-warning-subtle text-warning-emphasis",
        L: "bg-info-subtle border border-info-subtle text-info-emphasis"
    }

  return (
    <li className='list-group-item list-group-item-action'>        
        <div className='row'>
            <div className='col-12 col-md-7 col-lg-8 mt-1'>
                <input type="checkbox" id="taskstatus" className='form-check-input me-3'
                onChange={() => formStatus(item.Id)} checked={item.Active}/>                
                <label className='form-check-label' style={item.Active ? {textDecoration : "line-through"} : null }>
                    {item.Name}</label>
            </div>
            <div className='col-6 col-md-2 col-lg-2 mt-1'><span className={`badge ${priorityColor[item.Priority.toUpperCase()] || 'bg-secondary'}`}>{item.Priority}</span></div>
            <div className='col-6 col-md-2 col-lg-2 btn-group'> 
                <button className='btn btn-warning' type='button' onClick={() => editTask(item.Id)}><i className="bi bi-pencil"></i></button>
                <button className='btn btn-danger' type='button' onClick={() => delTask(item.Id)}><i className="bi bi-trash"></i></button>
            </div>
        </div>       
    </li>
  )
}

export default TaskList
