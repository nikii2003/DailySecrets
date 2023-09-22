import React, { useEffect, useState } from "react";
import showToast from 'crunchy-toast';
import "./Home.css"
import './../../index.css';
import Task from "./../../Component/Task/Task";
import { saveListToLocalStorage } from "../../Util/Localstorage";

const Home = ((textItem) => {
    const [tasklist, setTaskList] = useState([
        {
            id: 1,
            title: "submit assignment",
            description: "not allow in lecture",
            priority: "high",
        }

    ])
    const [id ,setId]=useState(0)
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [priority, setpriority] = useState('')
    const [isEdit,setIsEdit] = useState(false)
   
   useEffect(()=>{
    const list = JSON.parse(localStorage.getItem('secrets'));
    if(list && list.length>0)
     setTaskList(list)
   },[])

   

   const clearInputFilds = ()=>{
    settitle('');
    setdescription('');
    setpriority('');
   }

   const FindTaskIndexById = (TaskId) =>{
    let index ;
    tasklist.forEach((task,i)=>{
    if(task.id === TaskId)  {
        index = i
    }
    })
    return index ;
   }

   const checkRequiredFilds = () =>{
    if(!title){
        showToast('title is required','alert',3000);
        return false;
      }
      if(!description){
        showToast('description is required','alert',3000);
        return false;
      }
      if(!priority){
        showToast('priority is required','alert',3000);
        return false;
      }
    return true;
   }

   const addtaskToList = (() => {

    if (checkRequiredFilds() === false){
        return
    };
    const randomid = Math.floor(Math.random() * 1000)
    const obj = {
        id: randomid,
        title: title,
        description: description,
        priority: priority,
    }
    
 const newTaskList = [...tasklist, obj]
 
 setTaskList(newTaskList)

 clearInputFilds();

   
    saveListToLocalStorage(newTaskList);
     showToast('List to be added successfully', 'success', 3000);
    })
    const removeTaskFromList = (id) => {
 const index = FindTaskIndexById(id)

        const tempArray = tasklist;
        tempArray.splice(index, 1);

       
        setTaskList([...tempArray])

        saveListToLocalStorage(tempArray)
        showToast('task deleted succesfully', 'alert', 3000);
        
    }

    const setTaskEditable = (id) =>{
        setIsEdit(true)
        setId(id);
       
        const index = FindTaskIndexById(id)

        const currentEditTask = tasklist[index];

        settitle(currentEditTask.title);
        setdescription(currentEditTask.description);
        setpriority(currentEditTask.priority);
     
    }

    const updateTask = ()=>{
        if (checkRequiredFilds() === false){
            return
        };

const indexToUpdate = FindTaskIndexById(id)
const tempArray = tasklist ;
tempArray[indexToUpdate]={
  id :id,
  title:title,
  description :description,
  priority:priority
}
setTaskList([...tempArray])

saveListToLocalStorage(tempArray)

clearInputFilds();
setIsEdit(false);
showToast('Task updated successfully ', 'Info', 3000);
  }
  return (
      <>
          <h1 className="heading">DailySecret 🔐</h1>
          <div className="container">
          <div>
                    <div className="tasks-container">
                    <h2 className="common-text">Show List</h2>{
                        console.log(tasklist)
                    }
                    {
                        tasklist.map((taskItem, index) => {
                            const {id,title, description, priority} = taskItem;

                            return <Task id={id}
                                title={title}
                                description={description}
                                priority={priority}
                                key={index}
                                removeTaskFromList={removeTaskFromList}
                                setTaskEditable={setTaskEditable}
                                // obj={taskItem}
                            />
                        })
                    }
                    </div>
                </div>
                <div>
                    <h2 className="common-text">
                    {isEdit ? `Update Task ${id}` : 'Add Task'}
                    </h2>
                    <div className="input-container">
                        <form>
                            <input type="text" placeholder="Enter title" className="inputBox" value={title} onChange={(e) => {
                                settitle(e.target.value)
                            }} /><br />
                              <input type="text" placeholder="Enter decription" className="inputBox" value={description} onChange={(e) => {
                                setdescription(e.target.value)
                            }} /><br />
                            <input type="text" placeholder="Enter priority" className="inputBox" value={priority} onChange={(e) => {
                                setpriority(e.target.value)
                            }} /><br />
                            {/* <div className="btn-container">
                                {
                                     isEdit ?
                                      <button type="button" className="addBtn" onClick={updateTask}>Update</button> :
                                      <button type="button" className="addBtn" onClick={addtaskToList}>Add</button>
                                } */}
                               
                               <div className="btn-container">
                               <button type="button"
                                className="addBtn" onClick={()=>{
                                isEdit ? updateTask() : addtaskToList()
                               }}>{isEdit ? 'Update' : 'Add'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
})
export default Home