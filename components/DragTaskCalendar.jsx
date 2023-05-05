import React, { useContext, useEffect } from "react";
import { useDrag } from "react-dnd";

const DragTaskCalendar = ({ title, label, task, deleteTask }) => {
  const [{ isDragging }, drag] = useDrag(
     () => ({
      type: "task",
      item: { ...task },
      end:  (task, monitor) => {
        // const dropResult = monitor.getDropResult();
        // if (task && dropResult) {
          deleteTask(task);
        // }
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [deleteTask]
  );


  return (
    <div
      ref={drag}
      className={`text-white bg-${label}-400 rounded-lg mb-1 mx-1 px-1 w-11/12 truncate cursor-pointer text-center`}
    >
      {title}
    </div>
  );
};

export default DragTaskCalendar;
