import dayjs from "dayjs";
import localeEn from "dayjs/locale/en";
dayjs.locale(localeEn);
import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { FcCalendar } from "react-icons/fc";
import { BsCaretLeftSquare, BsCaretRightSquare } from "react-icons/bs";
import { IconContext } from "react-icons";
import Profile from "./Profile";

export default function CalendarHeader() {
  const {
    monthIndex,
    setMonthIndex,
    active,
    setActive,
    setActiveCalendarIndex,
  } = useContext(GlobalContext);

  function handlePrevMonth() {
    if (monthIndex >= 1) {
      setMonthIndex(monthIndex - 1);
    }
  }
  function handleNextMonth() {
    if (monthIndex <= 12) {
      setMonthIndex(monthIndex + 1);
    }
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <header className="px-4 pt-2 flex gap-16 justify-between">
      <div className="flex items-center mb-4 ">
        <IconContext.Provider value={{ size: "50px" }}>
          <div>
            <FcCalendar />
          </div>
        </IconContext.Provider>
        <h1 className="mr-10 ml-2 text-xl text-gray-500 fond-bold">
          Schedule
        </h1>
        <button
          onClick={handleReset}
          className="border rounded py-2 px-4 mr-5 text-gray-500 font-semibold"
        >
          Today
        </button>
        <button onClick={handlePrevMonth}>
          <IconContext.Provider value={{ color: "grey" }}>
            <div>
              <BsCaretLeftSquare />
            </div>
          </IconContext.Provider>
        </button>
        <h2 className="mx-4 text-xl text-gray-500 font-bold capitalize">
          {dayjs(new Date(dayjs().locale("en").year(), monthIndex)).format(
            "MMMM YYYY"
          )}
        </h2>
        <button onClick={handleNextMonth}>
          <IconContext.Provider value={{ color: "grey" }}>
            <div>
              <BsCaretRightSquare />
            </div>
          </IconContext.Provider>
        </button>
      </div>
      <div className=" flex items-end">
        <ul className="flex text-xl text-white font-bold">
          <li
            onClick={() => {
              setActive("bg-pink-400");
              setActiveCalendarIndex(1);
            }}
            className="bg-pink-400 rounded-t  py-1 px-4 cursor-pointer"
          >
            Calendar
          </li>
          <li
            onClick={() => {
              setActive("bg-yellow-300");
              setActiveCalendarIndex(2);
            }}
            className="bg-yellow-300 rounded-t py-1 px-4 cursor-pointer"
          >
            Cleaning
          </li>
          <li
            onClick={() => {
              setActive("bg-green-400");
              setActiveCalendarIndex(3);
            }}
            className="bg-green-400 rounded-t py-1 px-4 cursor-pointer"
          >
            Activities
          </li>
          <li
            onClick={() => {
              setActive("bg-red-400");
              setActiveCalendarIndex(4);
            }}
            className="bg-red-400 rounded-t py-1 px-4 cursor-pointer"
          >
            List
          </li>
        </ul>
      </div>
      <div className="">
        <Profile />
      </div>
    </header>
  );
}
