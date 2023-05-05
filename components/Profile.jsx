import React, { useEffect, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "@/utils";
import useAuthStore from "../store/authStore";
import Link from "next/link";
import { AiOutlineLogout } from "react-icons/ai";
import { FaUmbrellaBeach } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";
import styles from "../styles/Profile.module.css";
import { IconContext } from "react-icons";

const Profile = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();

  const [user, setUser] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const avatar = createAvatar(lorelei, {
    seed: "John Doe",
  });
  const wan = avatar.toString();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  return (
    <div className="w-full relative mb-2">
      {!user ? (
        <div className="w-1/2">
          <GoogleLogin
            style={{ width: 10 }}
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Error")}
          />
        </div>
      ) : (
        <div className="flex">
          {isOpen ? (
            <div className={`${styles.speech}`}>
              <div className="grid grid-cols-1 gap-1">
                <Link href="/">
                  <h1 className=" font-bold">{user.username}</h1>
                </Link>
                <p className=" font-semibold">Profile</p>
                <div className="flex gap-4 items-center my-2">
                  <IconContext.Provider value={{ size: "20px" }}>
                    <MdWorkOutline />
                  </IconContext.Provider>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 mr-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-300"></div>
                    <FaUmbrellaBeach />
                  </label>
                </div>
                <button
                  type="button"
                  className=""
                  onClick={() => {
                    googleLogout();
                    removeUser();
                  }}
                >
                  <AiOutlineLogout color="white" fontSize={21} />
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
          <button onClick={() => setIsOpen(!isOpen)} className="">
            <img
              className="w-24"
              src="https://api.dicebear.com/5.x/adventurer/svg
            "
              alt=""
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
