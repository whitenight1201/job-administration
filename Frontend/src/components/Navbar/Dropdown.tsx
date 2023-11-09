import React from "react";
import { Popover, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const ProfilePopover = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center focus:outline-none">
        <img
          src="images/avatar.png"
          className="rounded-full h-10 w-10"
          alt="my avtar"
        ></img>
      </Popover.Button>
      <Transition
        leave="transition duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Panel
          className="absolute right-0 w-28 border bg-white shadow-xl rounded-lg"
          style={{ top: "calc(100% + 0.5rem)" }}
        >
          <div
            className="cursor-pointer hover:bg-gray-100 px-3 py-2 text-center"
            onClick={handleLogOut}
          >
            <span style={{ fontSize: ".9rem" }}>Logout</span>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default ProfilePopover;
