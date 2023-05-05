import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { AiOutlineCheck } from "react-icons/ai";
import uuid from "react-uuid";
import { client } from "@/lib/client";
import { useRouter } from "next/router";
import { MdTitle } from "react-icons/md";
import { MdOutlineSubtitles } from "react-icons/md";
import { HiColorSwatch } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { GrBookmark } from "react-icons/gr";
import { labelsClasses } from "@/utils/util";

export default function ActivityModal() {
  const router = useRouter();
  const { setShowEventModal, selectedEvent, dbActivities, setDbActivities } =
    useContext(GlobalContext);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const newTask = {
      title: title,
      description: description,
      label: selectedLabel,
      day: "",
      id: uuid(),
    };

    const doc = {
      _type: "activity",
      title: title,
      description: description,
      label: selectedLabel,
      id: uuid(),
    };
    const filt = dbActivities.filter(
      (activity) => activity.title.toLowerCase() === newTask.title.toLowerCase()
    );
    console.log(filt);
    if (
      filt[0]?.title.toLowerCase() !== newTask.title.toLowerCase() &&
      newTask.title !== ""
    ) {
      setDbActivities([...dbActivities, newTask]);
      client.create(doc);
      refreshData();
      setShowEventModal(false);
      console.log(dbActivities);
    } else {
      newTask.title === ""
        ? alert("Debes rellenar el campo titulo")
        : alert("Ya existe una tarea con ese nombre");
      setTitle("");
    }
  }

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const refreshData = async () => {
    await timeout(1000);
    router.replace(router.asPath, undefined, { scroll: false });
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <div className="text-gray-400">
            <GrBookmark />
          </div>
          <div>
            <button
              className="text-gray-400"
              onClick={() => setShowEventModal(false)}
            >
              <GrClose />
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div className="flex items-center gap-4 text-gray-400">
              <MdTitle />
              <input
                type="text"
                name="title"
                placeholder="Añadir título"
                value={title}
                required
                className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <MdOutlineSubtitles />
              <input
                type="text"
                name="description"
                placeholder="Añadir descripción"
                value={description}
                required
                className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-6 text-gray-400">
              <HiColorSwatch />
              <div className="flex gap-x-2 bg-white">
                {labelsClasses.map((lblClass, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedLabel(lblClass)}
                    className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer text-white`}
                  >
                    {selectedLabel === lblClass && <AiOutlineCheck />}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Sauvegarder
          </button>
        </footer>
      </form>
    </div>
  );
}
