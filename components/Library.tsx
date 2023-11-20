import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

const Library = () => {
  return (
    <section className="flex flex-col p-3 gap-y-3">
      <div className="flex justify-between text-neutral-400 ">
        <div className="inline-flex gap-x-2 items-center">
          <TbPlaylist className="" size={20} />
          <p className="text-sm ">Your playlist</p>
        </div>
        <AiOutlinePlus className="cursor-pointer hover:text-white" size={20} />
      </div>
      <div className="h-full">Songs</div>
    </section>
  );
};

export default Library;