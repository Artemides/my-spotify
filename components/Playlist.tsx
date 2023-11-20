"use client";

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
type PlaylistProps = {
  image: string;
  title: string;
  href: string;
  children?: React.ReactNode;
};
const Playlist: React.FC<PlaylistProps> = ({ image, title, href }) => {
  const router = useRouter();

  const handlePlay = () => [router.push(href)];

  return (
    <button
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition duration-300 pr-4"
      onClick={handlePlay}
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image
          src={image}
          alt={`playlist-image-${title}`}
          fill
          className="object-cover"
        />
      </div>
      <p className="font-semibold truncate">{title}</p>
      <div className="absolute transition opacity-0  rounded-full bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110 text-black">
        <FaPlay />
      </div>
    </button>
  );
};

export default Playlist;
