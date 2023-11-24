import { useUploadModal } from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import { useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import CustomToaster from "./CustomToaster";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isOpen, onClose } = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const handleOpenModal = (open: boolean) => !open && onClose();

  const handleFormSubmit: SubmitHandler<FieldValues> = async ({
    author,
    title,
    song,
    image,
  }) => {
    try {
      setIsLoading(true);

      const songFile = song?.[0];
      const imageFile = image?.[0];
      if (!user || !songFile || !imageFile) {
        return toast.error("Missing Fields");
      }

      const id = uniqid();

      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${title}-${id}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        return toast.error(`Failed to upload song for ${title}`);
      }

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${title}-${id}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        return toast.error(`Error uploading image for ${title}`);
      }

      const { error } = await supabaseClient.from("songs").insert({
        user_id: user.id,
        title,
        author,
        image_path: imageData.path,
        song_path: songData.path,
      });

      if (error) {
        return toast.error(`Error creating song: ${error}`);
      }

      router.refresh();
      reset();
      toast.custom((t) => (
        <CustomToaster
          t={t}
          image={URL.createObjectURL(imageFile)}
          title={`Song ${title} Created!`}
        />
      ));
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Add a song"
      description="Upload a MP3 file"
      onChange={handleOpenModal}
    >
      <form
        action=""
        className="flex flex-col gap-y-3"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="author"
        />
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="title"
        />
        <div>
          <span className="block mb-1 pl-1">Select an song</span>
          <Input
            id="song"
            type="file"
            accept=".mp3"
            disabled={isLoading}
            {...register("song", { required: true })}
            placeholder="song"
          />
        </div>
        <div>
          <span className="block mb-1 pl-1">Select an Poster</span>
          <Input
            id="image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register("image", { required: true })}
            placeholder="image"
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Upload
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
