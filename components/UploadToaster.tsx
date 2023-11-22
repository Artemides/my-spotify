import Image from "next/image";
import React from "react";
import toast, { Toast } from "react-hot-toast";

type UploadToasterProps = {
  image: string;
  path: string;
  title: string;
  t: Toast;
};

const UploadToaster = ({ t, image, path, title }: UploadToasterProps) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full flex gap-x-4 items-center bg-neutral-900 shadow-lg rounded-lg pointer-events-auto  ring-1 ring-neutral-800 ring-opacity-5 overflow-hidden`}
    >
      <div className="relative w-[64px] h-[64px]">
        <Image src={image} alt={path} fill className="object-cover" />
      </div>
      <p className="flex-1 text-white font-semibold pr-2">{title}</p>
      <div className="flex border-l border-neutral-800">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-neutral-400 hover:text-white focus:outline-none "
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UploadToaster;
