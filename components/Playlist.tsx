"use client";

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import PlayButton from "./PlayButton";
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
    <div
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
      <PlayButton className="absolute" />
    </div>
  );
};

export default Playlist;
