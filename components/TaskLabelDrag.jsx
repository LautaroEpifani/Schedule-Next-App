import React, { useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { useDrag } from "react-dnd";
import uuid from "react-uuid";

const TaskLabelDrag = ({ title, label, task }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "task",
      item: () => ({ ...task }),
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [task]
  );

  const test = (task) => {
    console.log(task);
  };

  return (
    <div
      onClick={() => test(task)}
      ref={drag}
      className={`bg-${label}-400 p-1 mr-3 text-white font-bold uppercase text-sm rounded mb-1 truncate cursor-pointer w-44 text-center`}
    >
      {title}
    </div>
  );
};

export default TaskLabelDrag;
