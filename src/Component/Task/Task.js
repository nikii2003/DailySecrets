import './Task.css';
const Task = ({id,title,description,priority,removeTaskFromList,setTaskEditable}) =>
{
    return(
        <div className='task-container' >
            
            <h1 className=''>{title}</h1>
            <p className=''>{description}</p>
            <span className='taskpriority'>{priority}</span>
            <span className='task-delet-icon'
             onClick={()=>{
              removeTaskFromList(id);
            }}>🗑</span>
            <span className='task-edit-icon'
             onClick={()=>{
                setTaskEditable(id);
            }}>🖊</span>
            
        </div>
         
    )
}
export default Task