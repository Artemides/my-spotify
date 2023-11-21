"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

type ModalProps = {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  children,
  onChange,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className=" bg-neutral-900/50 backdrop-blur-sm  fixed inset-0" />
        <Dialog.Content className="fixed  drop-shadow-sm border border-neutral-700  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-full h-full w-full md:h-auto md:max-h-[85%] md:w-[90vw] md:max-w-[450px] rounded-md bg-neutral-800 p-[25px] focus:outline-none">
          <Dialog.Title className="text-xl text-center font-bold mb-4">
            {title}
          </Dialog.Title>
          <Dialog.Description className=" mb-5 text-sm leading-normal text-center">
            {description}
          </Dialog.Description>
          <div> {children}</div>
          <Dialog.DialogClose asChild>
            <button
              className="text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex w-[25px] h-[25px] appearance-none items-center justify-center rounded-full focus:outline-none"
              aria-label="Close"
            >
              <IoMdClose />
            </button>
          </Dialog.DialogClose>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default Modal;
