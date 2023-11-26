"use client";

import LibraryItem from "@/components/LibraryItem";
import LikedButton from "@/components/LikedButton";
import { useOnPlay } from "@/hooks/useOnPlay";
import { Song } from "@/types/types";
import { useSearchParams } from "next/navigation";

type SearchContentProps = {
  songs: Song[];
};
const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  const searchParams = useSearchParams();
  const player = useOnPlay(songs);
  const tilte = searchParams.get("title");

  if (songs.length === 0) {
    return (
      <div className="text-center w-full p-6 text-neutral-400 font-semibold">
        No Songs Found for '{tilte}'.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full px6 ">
      {songs.map((song) => (
        <div
          key={song.id}
          className="flex  items-center gap-x-4 w-full hover:bg-neutral-800/50 rounded-md pr-2"
        >
          <LibraryItem
            song={song}
            onClick={player}
            className="hover:bg-transparent"
          />
          <LikedButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
