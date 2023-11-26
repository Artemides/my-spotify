"use client";

import { Song } from "@/types/types";
import Image from "next/image";
import PlayButton from "./PlayButton";
import { useLoadImage } from "@/hooks/useLoadImage";

type SongItemProps = {
  song: Song;
  onClick: (id: string) => void;
};

const SongItem = ({ song, onClick }: SongItemProps) => {
  const imageUrl = useLoadImage(song);

  return (
    <div className="relative group flex flex-col justify-center items-center  gap-x-4  rounded-md  overflow-hidden bg-neutral-400/5  cursor-pointer hover:bg-neutral-400/10 transition p-3">
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image src={imageUrl || "/"} alt="" className="object-cover" fill />
        <div className="absolute bottom-0 right-0 -translate-x-[10px] -translate-y-[10px]">
          <PlayButton onClick={() => onClick(song.id)} />
        </div>
      </div>
      <div className="w-full py-2">
        <p className="font-semibold  pb-1 truncate">{song.title}</p>
        <p className="text-neutral-400  text-sm truncate">{song.author}</p>
      </div>
    </div>
  );
};

export default SongItem;
