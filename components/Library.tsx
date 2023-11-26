import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { useUser } from "@/hooks/useUser";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUploadModal } from "@/hooks/useUploadModal";
import { getSongsByUserId } from "@/actions/getSongsByUserId";
import { Song } from "@/types/types";
import LibraryItem from "./LibraryItem";
import { useOnPlay } from "@/hooks/useOnPlay";

type LibraryProps = {
  songs: Song[];
};

const Library = ({ songs }: LibraryProps) => {
  const authModal = useAuthModal();
  const { user } = useUser();
  const uploadModal = useUploadModal();
  const onPlay = useOnPlay(songs);
  const handleAddPlaylist = () => {
    if (!user) return authModal.onOpen();

    uploadModal.onOpen();
  };
  return (
    <section className="flex flex-col p-3 gap-y-3">
      <div className="flex justify-between text-neutral-400 ">
        <div className="inline-flex gap-x-2 items-center">
          <TbPlaylist className="" size={20} />
          <p className="text-sm ">Your playlist</p>
        </div>
        <button onClick={handleAddPlaylist}>
          <AiOutlinePlus
            className="cursor-pointer hover:text-white"
            size={20}
          />
        </button>
      </div>
      <div className="h-full">
        {songs.map((song) => (
          <LibraryItem key={song.id} song={song} onClick={onPlay} />
        ))}
      </div>
    </section>
  );
};

export default Library;
