import GlobalContext from "@/context/GlobalContext";
import { client } from "@/lib/client";
import React, { useContext, useState } from "react";
import CreateListButton from "./CreateListButton";
import ListItem from "./ListItem";
import ListModal from "./ListModal";

const List = ({ activeCalendarIndex, showListModal }) => {

  const { onList, setOnList } = useContext(GlobalContext)
  const [deleting, setDeleting] = useState(false)
  const [checkId, setCheckId] = useState()

  const deleteItem = async (item) => {
    setDeleting(true)
    await timeout(2000)
    const filterList = onList.filter(itemFilter => itemFilter.id !== item.id)
    setOnList(filterList)
    client.delete(item._id).then(console.log).catch(console.error);
  }

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }


  return (
    <div
      className={
        activeCalendarIndex === 4
          ? "w-5/6 border border-gray-300 h-screen ml-auto pt-6 pl-10"
          : "hidden"
      }
    >
      <div className="flex items-center gap-4">
        <p className="underline font-semibold text-gray-500">Memory</p>
        <CreateListButton />
        {showListModal && <ListModal />}
      </div>
      {onList ? (
        onList.map((item, index) => (
          <div key={item.id} className="flex items-center gap-4 mt-6 text-gray-600">
            <ListItem title={item.title} deleting={deleting} id={item.id} checkId={checkId}/> 
            <div className="">
                <input
                  onClick={() => { deleteItem(item); setCheckId(item.id) }}
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-6 h-6 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default List;
