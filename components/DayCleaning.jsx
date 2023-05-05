import dayjs from "dayjs";
import React, { useContext, useState, useEffect, useCallback } from "react";
import GlobalContext from "../context/GlobalContext";
import { MdDeleteOutline } from "react-icons/md";
import { useDrop, useDrag } from "react-dnd";
import { client } from "@/lib/client";
import { useRouter } from "next/router";
import DragTaskCalendar from "./DragTaskCalendar";
import { useCleaningFunction } from "@/hooks/useCleaning";
import uuid from "react-uuid";



export default function DayCleaning({ day, rowIdx }) {

 

  const { onCleaning,  setOnCleaningClient } = useContext(GlobalContext);

  const { onCleaningClient } = useCleaningFunction() 

  const [filterOnCalendarTask, setFilterOnCalendarTask] = useState([]);

  const router = useRouter();

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  const [{ isOver }, drop] = useDrop(
     () => ({
      accept: "task",
      drop: (task) =>  { 
        addTaskOnCalendar(task)
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [filterOnCalendarTask]
  );

  const addTaskOnCalendar = async (task) => {  
    console.log(task)
    task.day = day.valueOf();
    task.id = uuid()
    const duplicatedTask = filterOnCalendarTask.map(
      (item) => task.title === item.title
    );
    console.log(duplicatedTask);
    const dt = duplicatedTask.filter((dt) => dt === true);
    
    if (dt[0]) {
      const removeDupl = new Set(filterOnCalendarTask);
      setFilterOnCalendarTask([...removeDupl]);
    } else {
      if (filterOnCalendarTask.length <= 2) {
        // 
       
        const doc = {
          _type: "onCleaning",
          title: task.title,
          description: task.description,
          label: task.label,
          id: task.id,
          day: day.valueOf(),
        };
        client.create(doc);
     
        console.log("entra")
        // refreshData();
       console.log(day.valueOf())
       
      
      setFilterOnCalendarTask([...filterOnCalendarTask, task]); 
      // setOnCleaningClient([...onCleaningClient, task])
      
      }
       
    }
   
  };

  // const addTaskOnCalendar = async (task) => {
  //       await timeout(100)
  //       const doc = {
  //         _type: "onCleaning",
  //         title: task.title,
  //         description: task.description,
  //         label: task.label,
  //         id: task.id,
  //         day: day.valueOf(),
  //       };
  //       const isDuplicated = filterOnCalendarTask.filter(dayTask => dayTask.title === task.title)
  //       if(!isDuplicated[0]) {
          
  //         task.id = uuid()
  //         task.day = day.valueOf()
  //         console.log(task.id)
  //         setFilterOnCalendarTask([...filterOnCalendarTask, task])
  //         client.create(doc);
  //         setOnCleaningClient([...onCleaningClient, task])
  //       }   
  // }


 
  const deleteCalendarTask =  (task) => {
    console.log(task.day)
    const filtOn = onCleaningClient.filter(
      (dayTask) => dayTask.id !== task.id
    );
    const filt = filterOnCalendarTask.filter(
      (dayTask) => dayTask.id !== task.id
    );
    client.delete(task._id).then(console.log).catch(console.error);
    setOnCleaningClient(filtOn) 
    console.log(task._id);
  
    setFilterOnCalendarTask(filt);
    // refreshData();

    task.day = day.valueOf();
    task.id = uuid()
    const duplicatedTask = filterOnCalendarTask.map(
      (item) => task.title === item.title
    );
    console.log(duplicatedTask);
    const dt = duplicatedTask.filter((dt) => dt === true);
    
    if (dt[0]) {
      console.log("tuvieha")
      const removeDupl = new Set(filterOnCalendarTask);
      setFilterOnCalendarTask([...removeDupl]);
    } else {
      if (filterOnCalendarTask.length <= 2) {
        // 
       
        const doc = {
          _type: "onCleaning",
          title: task.title,
          description: task.description,
          label: task.label,
          id: task.id,
          day: day.valueOf(),
        };
        client.create(doc);
     
        console.log("entra")
        // refreshData();
       console.log(day.valueOf())
       
      
      setFilterOnCalendarTask([...filterOnCalendarTask, task]);
      console.log("tuvieja")
      setOnCleaningClient([...onCleaningClient, task])
      };
    }
  }
  

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const refreshData = async () => {
    await timeout(200);
    router.replace(router.asPath, undefined, { scroll: false });
  };

 

  useEffect(() => {
    
    setFilterOnCalendarTask(
      onCleaningClient.filter((task) => task.day === day.valueOf())
    );
  }, [onCleaningClient, day]);

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {/* {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )} */}
        <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div className="h-32" ref={drop}>
        {filterOnCalendarTask ? (
          filterOnCalendarTask.map((task, index) => {
            return (
              <div key={index} className="flex items-center" >
                <DragTaskCalendar
                  id={task.id}
                  title={task.title}
                  label={task.label}
                  task={task}
                  index={index}
                  deleteTask={() => deleteCalendarTask(task)}
                />
                <div className="text-gray-500">
                  <MdDeleteOutline
                    onClick={() => deleteCalendarTask(task)}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
        {/* <p className="text-center text-xs underline mt-2">Ver más</p> */}
      </div>
    </div>
  );
}
