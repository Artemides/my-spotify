import { Song } from "@/types/types";
import LibraryItem from "./LibraryItem";
import LikedButton from "./LikedButton";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import { Slider } from "./Slider";
import { usePlayer } from "@/hooks/usePlayer";
import useSound from "use-sound";
import { useEffect, useState } from "react";

type PlayerContentProps = {
  song: Song;
  songUrl: string;
};

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const onNext = () => {
    if (player.ids.length === 0) return;

    const activeSongIdx = player.ids.findIndex((id) => id === player.activeId);
    const nextSongIdx = player.ids[activeSongIdx + 1];
    if (!nextSongIdx) {
      player.setActiveId(player.ids[0]);
      return;
    }

    player.setActiveId(nextSongIdx);
  };

  const onPrevious = () => {
    if (player.ids.length === 0) return;

    const activeSongIdx = player.ids.findIndex((id) => id === player.activeId);
    const prevSongIdx = player.ids[activeSongIdx - 1];
    if (!prevSongIdx) {
      player.setActiveId(player.ids[player.ids.length - 1]);
      return;
    }

    player.setActiveId(prevSongIdx);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPrevious();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => sound?.unload();
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };
  const PlayerIcon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3">
      <div className="flex items-center gap-x-2">
        <LibraryItem
          song={song}
          onClick={() => {}}
          className="hover:bg-transparent w-auto"
        />
        <LikedButton songId={song.id} />
      </div>
      <div className="md:hidden self-center place-self-end">
        <div className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white text-black">
          <button onCanPlay={handlePlay}>
            <PlayerIcon size={30} />
          </button>
        </div>
      </div>
      <div className="hidden w-full md:flex justify-center items-center gap-x-4">
        <button onClick={onPrevious}>
          <AiFillStepBackward size={24} />
        </button>
        <div className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white text-black ">
          <button onClick={handlePlay}>
            <PlayerIcon size={26} />
          </button>
        </div>
        <button onClick={onNext}>
          <AiFillStepForward size={24} />
        </button>
      </div>
      <div className="hidden md:flex items-center justify-center justify-self-end p-2 w-[120px]">
        <button onClick={toggleMute}>
          <VolumeIcon size={16} />
        </button>
        <Slider value={volume} onChange={(value) => setVolume(value)} />
      </div>
    </div>
  );
};

export default PlayerContent;
