import { useCleaningFunction } from "@/hooks/useCleaning";
import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import TaskOnCalendar from "./TaskOnCalendar";

export default function Day({ day, rowIdx }) {
  const { onCleaning, onActivities } = useContext(GlobalContext);
  const { onCleaningClient } = useCleaningFunction()

  const [filterOnCalendarTask, setFilterOnCalendarTask] = useState([]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  useEffect(() => {
    const onCalendarTask = onActivities.concat(onCleaningClient);
    setFilterOnCalendarTask(
      onCalendarTask.filter((task) => task.day === day.valueOf())
    );
  }, [day, onCleaningClient, onActivities]);

  return (
    <div className="border border-gray-200 flex flex-col rounded-xl">
      <header className="flex flex-col items-center">
        <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div className="h-32">
        {filterOnCalendarTask ? (
          filterOnCalendarTask.map((task, index) => {
            return (
              <div key={index} className="flex items-center">
                <TaskOnCalendar
                  id={task.id}
                  title={task.title}
                  label={task.label}
                  task={task}
                  index={index}
                />
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
