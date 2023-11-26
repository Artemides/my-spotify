import { Song } from "@/types/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

export const useSong = (songId?: string) => {
  const { supabaseClient } = useSessionContext();
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | null>(null);
  const [songUrl, setSongUrl] = useState<string>("");
  useEffect(() => {
    if (!songId) return;

    const fetchSong = async () => {
      setIsLoading(true);
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", songId)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error("Error loading songs");
      }

      setIsLoading(false);
      setSong(data as Song);
    };

    fetchSong();
  }, [songId, supabaseClient]);

  useEffect(() => {
    if (!song) return;

    const {
      data: { publicUrl },
    } = supabaseClient.storage.from("songs").getPublicUrl(song.song_path);

    setSongUrl(publicUrl);
  }, [song]);

  const _song = useMemo(
    () => ({ isLoading, song, songUrl }),
    [song, isLoading, songUrl]
  );
  return _song;
};
