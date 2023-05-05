import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import CreateEventButton from "./CreateEventButton";
import TaskModal from "./TaskModal";
import TaskLabelDrag from "./TaskLabelDrag";

const TaskEvents = ({ tasksDb, showEventModal, deleteTask }) => {
  return (
    <div className="flex-col gap-y-10 mt-2 w-1/6 ">
      <p className="text-center mb-4 underline text-gray-500 text-xl font-semibold">
        Tasks
      </p>
      {tasksDb.map((task, index) => (
        <div key={index} className="flex items-center justify-center">
          <TaskLabelDrag task={task} label={task.label} title={task.title} />
          <div className="text-gray-500">
            <MdDeleteOutline onClick={() => deleteTask(task._id)} />
          </div>
        </div>
      ))}
      <CreateEventButton />
      {showEventModal && <TaskModal />}
    </div>
  );
};

export default TaskEvents;
