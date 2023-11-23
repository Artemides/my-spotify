"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Song } from "@/types/types";

export const getSongsByUserId = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies });
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) {
    console.log(sessionError);
    return [];
  }

  const { data: songs, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", session.session?.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return songs || [];
};
