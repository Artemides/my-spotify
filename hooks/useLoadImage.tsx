import { Song } from "@/types/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const useLoadImage = (song: Song) => {
  const supabase = useSupabaseClient();

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return data.publicUrl;
};
