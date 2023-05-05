import React, { useState, useReducer} from "react";
//----Reducer---------
//   const [dayTaskState, dispatchTaskEvent] = useReducer(
//     changeDayEventsReducer,
//     dbTasks
//   );
//   const [dayActivitiesState, dispatchActivityEvent] = useReducer(
//     changeDayEventsReducer,
//     []
//   );
//   const [filterOnDayEvent, setFilterOnDayEvent] = useState([])

  
  function changeDayEventsReducer(state, { type, payload }) {
   console.log(payload.task)
  switch (type) {
    case "push":
      payload.task.day = payload.day
      const duplicatedTask = state.map(item => payload.task.id === item.id)
      console.log(duplicatedTask)
      const dt = duplicatedTask.filter(dt => dt === true)
        if(dt[0]) {
            const removeDupl = new Set(state)
            return ([...removeDupl])   
          }else {
            if (state.length <= 30) {
              
                  const doc = {
                    _type: 'onActivities',
                    title: payload.task.title,
                    description: payload.task.description,
                    label: payload.task.label,
                    id: payload.id,
                    day: payload.day,
                  };  
                client.create(doc)
                refreshData()
                 return ([...state, payload.task]) 
            }
            }
   
    case "dragging":
      client
            .delete(payload._id)
            .then(console.log)
            .catch(console.error)
      const filt = state.filter(dayTask => dayTask.id !== payload.id)
          return filt
          
    case "delete":
                  client
                  .delete(payload)
                  .then(console.log)
                  .catch(console.error)
                   refreshData();
                 return state  
    default:
      throw new Error();
    }
  }
   
  


export const useCalendarEvents = () => {
    return useReducer(changeDayEventsReducer, "Initial" )
}