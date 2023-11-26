"use client";

import LibraryItem from "@/components/LibraryItem";
import LikedButton from "@/components/LikedButton";
import { useOnPlay } from "@/hooks/useOnPlay";
import { usePlayer } from "@/hooks/usePlayer";
import { Song } from "@/types/types";

type LikedContentProps = {
  songs: Song[];
};
const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const player = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div
        className="
            flex 
            flex-col 
            gap-y-2 
            w-full px-6 
            text-neutral-400
          "
      >
        No liked songs.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
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

export default LikedContent;
