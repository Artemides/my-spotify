import { defaultImage } from "@/constants/image";
import { useLoadImage } from "@/hooks/useLoadImage";
import { Song } from "@/types/types";
import Image from "next/image";

type LibraryItemProps = {
  song: Song;
  onClick: (id: string) => void;
};
const LibraryItem: React.FC<LibraryItemProps> = ({ song, onClick }) => {
  const songImage = useLoadImage(song);
  const handleClick = () => {
    onClick && onClick(song.id);
  };
  return (
    <div
      onClick={handleClick}
      className="w-full flex items-center gap-x-3 p-2 cursor-pointer hover:bg-neutral-800/50  rounded-md"
    >
      <div className="relative min-w-[48px] min-h-[48px] overflow-hidden rounded-md">
        <Image
          src={songImage || defaultImage}
          alt={song.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1  overflow-hidden">
        <p className="text-white truncate">{song.title}</p>
        <p className="text-neutral-400 text-sm truncate">By {song.author}</p>
      </div>
    </div>
  );
};

export default LibraryItem;
