import React, { useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  //-----Calendar Events----------
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState();
  const [activeDrop, setActiveDrop] = useState(false);
  const [onCalendarTask, setOnCalendarTask] = useState([]);
  const [onCleaning, setOnCleaning] = useState([]);
  const [onActivities, setOnActivities] = useState([]);
  const [onList, setOnList] = useState([]);
  const [dayTasks, setDayTasks] = useState([]);
  const [dynamicTasks, setDynamicTasks] = useState([]);
  const [dbTasks, setDbTasks] = useState([]);
  const [dbActivities, setDbActivities] = useState([]);
  //-------Client Rendering-------------------
  const [onCleaningClient, setOnCleaningClient] = useState([])
  //-----------------------------
  const [active, setActive] = useState("bg-pink-400");
  const [activeCalendarIndex, setActiveCalendarIndex] = useState(1);
  const [avatarName, setAvatarName] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        showEventModal,
        setShowEventModal,
        showListModal,
        setShowListModal,
        selectedEvent,
        setSelectedEvent,
        daySelected,
        setDaySelected,
        tasks,
        setTasks,
        newTask,
        setNewTask,
        activeDrop,
        setActiveDrop,
        onCalendarTask,
        setOnCalendarTask,
        onCleaning,
        setOnCleaning,
        onActivities,
        setOnActivities,
        onList,
        setOnList,
        dayTasks,
        setDayTasks,
        dynamicTasks,
        setDynamicTasks,
        dbTasks,
        setDbTasks,
        dbActivities,
        setDbActivities,
        active,
        setActive,
        activeCalendarIndex,
        setActiveCalendarIndex,
        avatarName,
        setAvatarName,
        //paraClientRendering
        onCleaningClient,
        setOnCleaningClient
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
