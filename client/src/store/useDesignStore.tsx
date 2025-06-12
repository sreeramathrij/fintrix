import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DesignStore {
  selectedPage: string;
  open: boolean;
  setSelectedPage: (selected: string) => void;
  setOpen: (open: boolean) => void;
}

export const useDesignStore = create<DesignStore>()(
  persist(
    (set) => ({
      selectedPage: "",
      open: true,

      setSelectedPage: (selected) => set({ selectedPage: selected }),
      setOpen: (open: boolean) => set({ open }),
    }),
    {
      name: "design-storage", // name of item in storage (must be unique)
      partialize: (state) => ({
        selectedPage: state.selectedPage,
        open: state.open,
      }),
    }
  )
);