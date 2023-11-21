import { create } from "zustand";

type UploadModalStorage = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useUploadModal = create<UploadModalStorage>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
