import { useContext, useEffect, useState } from "react";
import Month from "../components/Month";
import { getMonth } from "../utils/util";
import GlobalContext from "../context/GlobalContext";
import { client } from "../lib/client";
import { useRouter } from "next/router";
import CalendarHeader from "@/components/CalendarHeader";
import Cleaning from "@/components/Cleaning";
import Activities from "@/components/Activities";
import TaskEvents from "@/components/TaskEvents";
import ActivitiesEvents from "@/components/ActivitiesEvents";
import { week } from "../utils/util";
import List from "@/components/List";
import { useCleaningFunction } from "@/hooks/useCleaning";

function Home({
  tasksDb,
  activitiesDb,
  onCalendarTaskDb,
  avatar,
  onCleaningDb,
  onActivitiesDb,
  onListDb,
}) {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const router = useRouter();
  const {
    monthIndex,
    showEventModal,
    showListModal,
    setDbTasks,
    setOnCalendarTask,
    active,
    activeCalendarIndex,
    setAvatarName,
    setOnCleaning,
    setOnActivities,
    setOnList,
    //----ClientRendering
    setOnCleaningClient
  } = useContext(GlobalContext);

  const { onCleaningClient } = useCleaningFunction()


  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
    setOnCalendarTask(onCalendarTaskDb);
    setDbTasks(tasksDb);
  }, [
    monthIndex,
    setOnCalendarTask,
    onCalendarTaskDb,
    setDbTasks,
    tasksDb,
    setAvatarName,
  ]);

  useEffect(() => {
    setOnCleaning(onCleaningDb);
    setOnActivities(onActivitiesDb);
    setOnList(onListDb)
  }, [
    setOnActivities,
    setOnCleaning,
    onCleaningDb,
    onActivitiesDb,
    setOnList,
    onListDb
  ]);

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const refreshData = async () => {
    await timeout(1000);
    router.replace(router.asPath, undefined, { scroll: false });
  };

  const deleteTask = (sanityId) => {
    client.delete(sanityId).then(console.log).catch(console.error);
    refreshData();
  };

  return (
    <div className="py-8 px-20">
      <CalendarHeader avatar={avatar} />
      <div className="flex">
        <div
          className={`${active === "bg-pink-400" ? `h-6` : `h-6 w-1/5`}`}
        ></div>
        <div className={`${active} w-full h-6 rounded-t-lg`}></div>
      </div>
      <div
        className={`${
          active === "bg-pink-400"
            ? `grid grid-rows-1 grid-cols-7 w-full border border-gray-200`
            : `grid grid-rows-1 grid-cols-7 w-5/6 ml-auto`
        }`}
      >
        {activeCalendarIndex !== 4 ? (
          week.map((dia, index) => {
            return (
              <div key={index} className="border-x">
                <p className="text-gray-500 text-center border border-gray-200 rounded-lg">
                  {dia}
                </p>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
      <div className="w-full">
        <div
          className={
            activeCalendarIndex === 1 ? "w-full flex border" : "w-full hidden"
          }
        >
          <Month month={currentMonth} />
        </div>
        <div
          className={
            activeCalendarIndex === 2
              ? "w-full flex  border border-t"
              : "w-full hidden"
          }
        >
          <TaskEvents
            tasksDb={tasksDb}
            showEventModal={showEventModal}
            deleteTask={deleteTask}
          />
          <Cleaning month={currentMonth} />
        </div>
        <div
          className={
            activeCalendarIndex === 3
              ? "w-full flex  border border-t"
              : "w-full hidden"
          }
        >
          <ActivitiesEvents
            activitiesDb={activitiesDb}
            showEventModal={showEventModal}
            deleteTask={deleteTask}
          />
          <Activities month={currentMonth} />
        </div>
        <List
          activeCalendarIndex={activeCalendarIndex}
          showListModal={showListModal}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const tasksQuery = '*[_type == "task"] | order(title asc)';
  const activitiesQuery = '*[_type == "activity"] | order(title asc)';
  const onCalendarQuery = '*[_type == "onCalendarTask"] | order(title asc)';
  const onCleaningQuery = '*[_type == "onCleaning"] | order(title asc)';
  const onActivitiesQuery = '*[_type == "onActivities"] | order(title asc)';
  const onListQuery = '*[_type == "onList"] | order(title asc)';
  const tasksDb = await client.fetch(tasksQuery);
  const activitiesDb = await client.fetch(activitiesQuery);
  const onCalendarTaskDb = await client.fetch(onCalendarQuery);
  const onCleaningDb = await client.fetch(onCleaningQuery);
  const onActivitiesDb = await client.fetch(onActivitiesQuery);
  const onListDb = await client.fetch(onListQuery);

  return {
    props: {
      tasksDb,
      onCalendarTaskDb,
      onCleaningDb,
      onActivitiesDb,
      activitiesDb,
      onListDb,
    },
  };
}

export default Home;
