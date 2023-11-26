import { Song } from "@/types/types";
import { useAuthModal } from "./useAuthModal";
import { usePlayer } from "./usePlayer";
import { useUser } from "./useUser";
import toast from "react-hot-toast";

export const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();
  const onPlay = (id: string) => {
    if (!user) {
      authModal.onOpen();
      return;
    }

    const songIds = songs.map((song) => song.id);
    if (!songIds.includes(id)) {
      toast.error("Something went wrong");
      return;
    }

    player.setActiveId(id);
    player.setIds(songIds);
  };

  return onPlay;
};
