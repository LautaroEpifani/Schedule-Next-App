import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import uuid from "react-uuid";
import { client } from "@/lib/client";
import { MdTitle } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { GrBookmark } from "react-icons/gr";
import { useRouter } from "next/router";

export default function ListModal() {
  const { onList, setOnList, setShowListModal } = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const newList = {
      title,
    };
    const doc = {
      _type: "onList",
      title,
      id: uuid(),
    };
    setOnList([...onList, newList]);
    client.create(doc);
    refreshData();
    setShowListModal(false);
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
              onClick={() => setShowListModal(false)}
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
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
