import React, { useState } from "react";

const App = () => {
  let status = ["todo", "doing", "done"];
  let [input, setInput] = useState("");
  let [task, setTask] = useState([]);
  let [dragtask,setdragtask]=useState(null)
  let [uptask,setuptask]=useState(null)
  let handle = (e) => {
    setInput(e.target.value);
    // console.log(e.target.value)
  };
  let key = (e) => {


    if (e.key === "Enter") {
      // console.log("done");
      if(uptask) {
   const obj={
    task:input,
    status:uptask.status,
    id:uptask.id
   }
let copy =[...task]
copy=copy.filter((item)=>item.id !==uptask.id)
setTask((prev)=>[...copy,obj])
setuptask(null)
setInput("")

      }else{
        let adding = {
          task: input,
          status: status[0],
          id: Date.now(),
        };
        setTask((prev) => [...prev, adding]);
      setInput("");

      }
      

      
    }
  };
  console.log(task);
  let handledrag = (e, item) => {
    setdragtask(item.id);
  }
console.log(dragtask)

let over=(e)=>{
  e.preventDefault(

  )
}

let handledrop=(status)=>{
let copy =[...task]
 copy.map((task)=>{
  if(dragtask===task.id){
    task.status=status
  }
 })
 setTask(copy)
 setdragtask(null)
}
let drophandle = (e) => {
  const status = e.target.getAttribute("status");
  if (status) {
    handledrop(status);
  }
};

let deletetask =(item)=>{
  let copy=[...task]
  copy=copy.filter((task)=>task.id !==item.id)
  setTask(copy)
  // console.log(copy)

}

let update=(item)=>{
setInput(item.task)
setuptask(item)
}
  return (
    <div className="flex h-screen justify-start   flex-col items-center bg-gray-100">
      <div className="flex justify-center items-center mt-[100px] flex-col mb-8">
        <h1 className="text-3xl font-bold mb-2">Task Manager</h1>
        <p className="text-lg text-gray-700 mb-2">To-Do List</p>
        <p className="text-lg text-gray-700 mb-4 font-bold">With Drag and Drop Functionality</p>

        <input
          className="border w-[250px] px-3 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onKeyDown={key}
          onChange={handle}
          type="text"
          placeholder="Add a new task..."
        />
      </div>
      <div className="mt-[30px] flex gap-[32px]">
        {/* ToDo Column */}
        <div
          status={status[0]}
          onDrop={drophandle}
          onDragOver={over}
          className="flex flex-col items-center bg-white rounded-lg shadow-md px-6 py-4 min-w-[220px] transition-colors duration-200 border-2 border-transparent hover:border-blue-300"
        >
          <p className="w-full text-center text-xl font-semibold mb-4 text-blue-700">ToDo</p>
          <div className="flex flex-col gap-3 w-full">
            {task.length > 0 &&
              task.map(
                (item) =>
                  item.status === "todo" && (
                    <div
                      draggable
                      onDragStart={(e) => handledrag(e, item)}
                      key={item.id}
                      className="flex items-center justify-between w-full bg-blue-50 border border-blue-200 rounded-md px-3 py-2 shadow-sm cursor-grab hover:bg-blue-100 transition-all duration-150"
                      style={{ opacity: dragtask === item.id ? 0.5 : 1 }}
                    >
                      <p className="truncate">{item.task}</p>
                      <div className="flex gap-5">
                        <button className="hover:text-blue-600" onClick={(e)=>update(item)} > 🖊️</button>
                        <button className="hover:text-red-600 w-[30px] h-[30px] cursor-pointer rounded-[50%] hover:bg-red-500" onClick={(e)=>deletetask(item)}  >🗑️</button>
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>
        {/* Doing Column */}
        <div
          status={status[1]}
          onDrop={drophandle}
          onDragOver={over}
          className="flex flex-col items-center bg-white rounded-lg shadow-md px-6 py-4 min-w-[220px] transition-colors duration-200 border-2 border-transparent hover:border-yellow-300"
        >
          <p className="w-full text-center text-xl font-semibold mb-4 text-yellow-700">Doing</p>
          <div className="flex flex-col gap-3 w-full">
            {task.length > 0 &&
              task.map(
                (item) =>
                  item.status === "doing" && (
                    <div
                      draggable
                      onDragStart={(e) => handledrag(e, item)}
                      key={item.id}
                      className="flex items-center justify-between w-full bg-yellow-50 border border-yellow-200 rounded-md px-3 py-2 shadow-sm cursor-grab hover:bg-yellow-100 transition-all duration-150"
                      style={{ opacity: dragtask === item.id ? 0.5 : 1 }}
                    >
                      <p className="truncate">{item.task}</p>
                      <div className="flex gap-2">
                        <button className="hover:text-yellow-600" onClick={(e)=>update(item)}>🖊️</button>
                        <button className="hover:text-red-600" onClick={(e)=>deletetask(item)} >🗑️</button>
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>
        {/* Done Column */}
        <div
          status={status[2]}
          onDrop={drophandle}
          onDragOver={over}
          className="flex flex-col items-center bg-white rounded-lg shadow-md px-6 py-4 min-w-[220px] transition-colors duration-200 border-2 border-transparent hover:border-green-300"
        >
          <p className="w-full text-center text-xl font-semibold mb-4 text-green-700">Done</p>
          <div className="flex flex-col gap-3 w-full">
            {task.length > 0 &&
              task.map(
                (item) =>
                  item.status === "done" && (
                    <div
                      draggable
                      onDragStart={(e) => handledrag(e, item)}
                      key={item.id}
                      className="flex items-center justify-between w-full bg-green-50 border border-green-200 rounded-md px-3 py-2 shadow-sm cursor-grab hover:bg-green-100 transition-all duration-150"
                      style={{ opacity: dragtask === item.id ? 0.5 : 1 }}
                    >
                      <p className="truncate">{item.task}</p>
                      <div className="flex gap-2">
                        <button className="hover:text-green-600 "onClick={(e)=>update(item)} >🖊️</button>
                        <button className="hover:text-red-600" onClick={(e)=>deletetask(item)} >🗑️</button>
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
