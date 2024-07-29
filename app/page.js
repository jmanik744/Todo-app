"use client";

import React, {useState} from 'react';
import { toast } from 'react-toastify';
import "../app/globals.css"


const page = () => {

  const[title, settitle] = useState("")
  const[description,setdescription] = useState("")
  const[status,setstatus] = useState("due")
  const[activeTask,setactiveTask] = useState(null)
  const[search,setSearch] = useState('')

  const[tasks,setTasks] = useState([])

  const submitHandler = (e) => {
    e.preventDefault();

    if(title.length < 5 || description.length < 20){
      toast.error(
        "Title and Description must be of length 5 and 20 respectively "
      );
      return;
    }


    const newTask = {
      date: new Date().toLocaleDateString(),
      title,
      description,
      status
    }
    setTasks([...tasks,newTask]);
    settitle("");
    setdescription("");
    setstatus("due");
    console.log(newTask)
  };

  const updateHandler = (index) => {
    const{title,description,status} = tasks[index];
    settitle(title);
    setdescription(description);
    setstatus(status);
    setactiveTask(index)
  };

  const updateTask = (e) => {
    e.preventDefault();
    const copyTasks = [...tasks];
    copyTasks[activeTask] = {
      ...copyTasks[activeTask],
      title,
      description,
      status
    };
    setTasks(copyTasks)
    setactiveTask(null)
    settitle("");
    setdescription("");
    setstatus("due");
  };


  const deleteHandler = (index)=> {
    setTasks(tasks.filter((t,i) => i !==index));
  }

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase())
  );


  let tasklist = <h3 style={{margin:"auto" , color:"tomato"}}>Loading....</h3>
  if (filteredTasks.length > 0) {
    tasklist = filteredTasks.map((task, index) => (
      <div key={index} className='card mb-3 me-3' style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{task.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{task.status}</h6>
          <p className="card-text">{task.description}</p>
          <button onClick={() => updateHandler(index)} className="me-2 btn btn-sm btn-dark">Update Task</button>
          <button onClick={() => deleteHandler(index)} className="btn btn-sm btn-dark">Delete Task</button>
        </div>
      </div>
    ));
  } else {
    tasklist = <h3 style={{ margin: "auto", color: "tomato" }}>No tasks found</h3>;
  }

  return (
    <div>
      <form className='container mt-5 bg-light' >
        <h2>Create Your Task</h2>
        <input
        onChange={(e)=> settitle(e.target.value)}
        value={title}
         className='w-50 form-control mb-3'
         type="text" 
         placeholder='Title'
        />
        <textarea 
        value={description}
        onChange={(e)=> setdescription(e.target.value)}
        className = 'w-50 form-control mb-3'
        placeholder='Description'
        >
        </textarea>
        <select
        value={status} 
        onChange={(e)=> setstatus(e.target.value)}
        className="w-50 form-control mb-3">
          <option value="due">Due</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        {activeTask === null ? (
          <button onClick={submitHandler} className='btn btn-primary'>Create Task</button>
        ) : (
          <button onClick={updateTask} className='btn btn-primary'>Update Task</button>
        )}
      </form>
      
      <div className="container mt-5">
        <h2>Search Tasks</h2>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search tasks by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <h2 className='container mt-5'>Pending Tasks</h2>
            <div className=" container d-flex flex-wrap">
                {tasklist}
            </div>
    </div>
  )
}

export default page