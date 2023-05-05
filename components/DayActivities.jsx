import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { MdDeleteOutline } from "react-icons/md";
import { useDrop } from "react-dnd";
import TaskOnCalendar from "./TaskOnCalendar";
import { client } from "@/lib/client";
import { useRouter } from "next/router";
import DragTaskCalendar from "./DragTaskCalendar";

export default function DayActivities({ day }) {
  const { onActivities } = useContext(GlobalContext);

  const [filterOnCalendarTask, setFilterOnCalendarTask] = useState([]);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const router = useRouter();

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "task",
      drop: (task) => addTaskOnCalendar(task),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [filterOnCalendarTask]
  );

  const addTaskOnCalendar = (task) => {
    console.log(task);
    task.day = day.valueOf();
    const duplicatedTask = filterOnCalendarTask.map(
      (item) => task.id === item.id
    );
    console.log(duplicatedTask);
    const dt = duplicatedTask.filter((dt) => dt === true);
    if (dt[0]) {
      const removeDupl = new Set(filterOnCalendarTask);
      setFilterOnCalendarTask([...removeDupl]);
    } else {
      if (filterOnCalendarTask.length <= 2) {
        setFilterOnCalendarTask([...filterOnCalendarTask, task]);
        const doc = {
          _type: "onActivities",
          title: task.title,
          description: task.description,
          label: task.label,
          id: task.id,
          day: task.day,
        };
        client.create(doc);
        refreshData();
      }
    }
  };

  const draggingTask = (task) => {
    const filt = filterOnCalendarTask.filter(
      (dayTask) => dayTask.id !== task.id
    );
    setFilterOnCalendarTask(filt);
    console.log(task._id);
    client.delete(task._id).then(console.log).catch(console.error);
  };

  const deleteCalendarTask = (task) => {
    console.log(task._id);
    client.delete(task._id).then(console.log).catch(console.error);
    refreshData();
  };

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const refreshData = async () => {
    await timeout(1000);
    router.replace(router.asPath, undefined, { scroll: false });
    setVisibleDelete(true);
  };

  useEffect(() => {
    setFilterOnCalendarTask(
      onActivities.filter((task) => task.day === day.valueOf())
    );
  }, [day, onActivities]);

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div className="h-28" ref={drop}>
        {filterOnCalendarTask ? (
          filterOnCalendarTask.map((task, index) => {
            return (
              <div key={index} className="flex items-center">
                <DragTaskCalendar
                  draggingTask={() => draggingTask(task)}
                  title={task.title}
                  label={task.label}
                  task={task}
                />
                <div className="text-gray-500">
                  {visibleDelete ? (
                    <MdDeleteOutline onClick={() => deleteCalendarTask(task)} />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
