import { create } from "zustand";

interface DesignStore {
  selectedPage: string;
  open: boolean;
  setSelectedPage: (selected: string) => void;
  setOpen: (open: boolean) => void;
}

export const useDesignStore = create<DesignStore>((set) => ({
  selectedPage: "",
  open: true,

  setSelectedPage: (selected) => {set({ selectedPage: selected })},
  setOpen: (open:boolean) => { set({ open })},
}))