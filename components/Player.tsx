"use client";

import { usePlayer } from "@/hooks/usePlayer";
import { useSong } from "@/hooks/useSong";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song, songUrl } = useSong(player.activeId);

  if (!song || !songUrl) {
    return null;
  }

  return (
    <div className="fixed bottom-0 w-full h-[80px] flex items-center bg-black p-2 ">
      <PlayerContent key={song.id} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;
