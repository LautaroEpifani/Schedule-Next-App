import React, { useContext } from "react";
import { BsCalendar2Plus } from "react-icons/bs";
import GlobalContext from "../context/GlobalContext";

const CreateListButton = () => {
  const { setShowListModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowListModal(true)}
      className="border p-2 rounded-full flex items-center gap-3 shadow-md hover:shadow-2xl text-gray-500 font-semibold px-4 mr-auto"
    >
      <p className="">Create</p>
      <BsCalendar2Plus />
    </button>
  );
};

export default CreateListButton;
