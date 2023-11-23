import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getSongs } from "./getSongs";
import { Song } from "@/types/types";

export const getSongsByTitle = async (title: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies });

  if (!title) {
    return await getSongs();
  }

  const { data: songsByTitle, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error();
  }

  return songsByTitle || [];
};
