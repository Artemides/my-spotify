import { useUploadModal } from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, useForm } from "react-hook-form";
import Input from "./Input";
import { useState } from "react";
import Button from "./Button";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onClose } = useUploadModal();
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const handleOpenModal = (open: boolean) => !open && onClose();

  const handleFormSubmit = () => {};

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
            id="poster"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register("poster", { required: true })}
            placeholder="poster"
          />
        </div>
        <Button type="submit">Upload</Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
