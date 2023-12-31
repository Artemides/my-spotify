"use client";

import { useAuthModal } from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import CustomToaster from "./CustomToaster";
import { useRouter } from "next/navigation";

type LikedButtonProps = {
  songId: string;
};

const LikedButton: React.FC<LikedButtonProps> = ({ songId }) => {
  const router = useRouter();

  const { supabaseClient } = useSessionContext();
  const { user } = useUser();
  const [isSongLiked, setIsSongLiked] = useState<boolean>(false);
  const authModal = useAuthModal();

  const Icon = isSongLiked ? AiFillHeart : AiOutlineHeart;

  useEffect(() => {
    if (!user) return;

    const fetchLikedSongs = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("song_id", songId)
        .eq("user_id", user.id)
        .single();
      console.log({ error, data });
      if (error || !data) return;

      setIsSongLiked(true);
    };

    fetchLikedSongs();
  }, [user, songId, supabaseClient]);

  const handleLike = async () => {
    if (!user) return authModal.onOpen();

    if (isSongLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("song_id", songId)
        .eq("user_id", user.id);

      if (error) return toast.error("Error Dislkiking song");

      setIsSongLiked(false);
      toast.custom((t) => (
        <CustomToaster
          image="/images/liked.png"
          title="Removed from your liked songs"
          t={t}
          remove={false}
        />
      ));
      router.refresh();
      return;
    }

    const { error } = await supabaseClient
      .from("liked_songs")
      .insert({ song_id: songId, user_id: user.id });

    if (error) return toast.error("Error liking song");

    setIsSongLiked(true);
    toast.custom((t) => (
      <CustomToaster
        image="/images/liked.png"
        title="Added to you liked songs"
        t={t}
        remove={false}
      />
    ));

    router.refresh();
  };

  return (
    <button
      className="cursor-pointer hover:opacity-75 transition"
      onClick={handleLike}
    >
      <Icon color={isSongLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default LikedButton;
