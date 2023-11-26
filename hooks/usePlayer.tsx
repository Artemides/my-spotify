import { create } from "zustand";

type UsePlayer = {
  ids: string[];
  activeId?: string;
  setActiveId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
};
export const usePlayer = create<UsePlayer>((set) => ({
  ids: [],
  activeId: undefined,
  setActiveId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  reset: () => set({ ids: [], activeId: undefined }),
}));
