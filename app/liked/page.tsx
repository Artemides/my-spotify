import Header from "@/components/Header";
import Image from "next/image";
import LikedContent from "./components/LikedContent";
import { getLikedSongs } from "@/actions/getLikedSongs";

const Liked = async () => {
  const likedSongs = await getLikedSongs();
  return (
    <div
      className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
        "
    >
      <Header className="from-[#5038a0]">
        <div className=" flex flex-col md:flex-row gap-x-4 items-center mt-12">
          <div className="relative w-32 h-32 lg:w-52 lg:h-52">
            <Image
              src="/images/liked.png"
              alt="liked-page-image"
              className="object-cover"
              fill
            />
          </div>
          <div className="flex  flex-col gap-y-2 mt-4 md:mt-0">
            <p className="hidden md:block font-semibold text-sm">Playlist</p>
            <p className="text-white text-4xl sm:text-5xl lg:text-8xl font-bold">
              Liked Songs
            </p>
          </div>
        </div>
      </Header>
      <LikedContent songs={likedSongs} />
    </div>
  );
};

export default Liked;
