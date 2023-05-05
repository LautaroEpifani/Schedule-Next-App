import React from "react";
import { Dancing_Script } from "@next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

const ListItem = ({ title, id, checkId }) => {

  return (
    <>
      {id === checkId ? (
        <div
          className={`${dancingScript.className} text-xl transition ease-in-out delay-150 duration-300 line-through text-gray-300`}
        >
          {title}
        </div>
      ) : (
        <div
          className={`${dancingScript.className} text-xl`}
        >
          {title}
        </div>
      )}
    </>
  );
};

export default ListItem;
