import React, { useContext } from "react";
import { BsCalendar2Plus } from "react-icons/bs";
import GlobalContext from "../context/GlobalContext";

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="border p-2 rounded-full flex items-center gap-3 shadow-md hover:shadow-2xl text-gray-500 font-semibold mt-4 px-4 mx-auto"
    >
      <p className="">Create</p>
      <BsCalendar2Plus />
    </button>
  );
}
