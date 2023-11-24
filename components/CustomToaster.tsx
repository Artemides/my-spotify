import Image from "next/image";
import React from "react";
import toast, { Toast } from "react-hot-toast";

type CustomToasterProps = {
  image: string;
  title: string;
  t: Toast;
  remove?: boolean;
};

const CustomToaster = ({
  t,
  image,
  title,
  remove = true,
}: CustomToasterProps) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full flex gap-x-4 items-center bg-neutral-800 shadow-lg rounded-lg pointer-events-auto  ring-1 ring-neutral-800 ring-opacity-5 overflow-hidden`}
    >
      <div className="relative w-[64px] h-[64px]">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <p className="flex-1 text-white font-semibold pr-2 text-center">
        {title}
      </p>
      {remove && (
        <div className="flex border-l border-neutral-800">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-neutral-400 hover:text-white focus:outline-none "
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomToaster;
