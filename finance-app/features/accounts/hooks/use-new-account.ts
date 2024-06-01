import {create} from "zustand"

type NewAccountState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};


export const useNewAccount = create<NewAccountState>((set) => ({
    isOpen: true,
    onOpen: () => {
      console.log('Opening account form');
      set({ isOpen: true });
    },
    onClose: () => {
      console.log('Closing account form');
      set({ isOpen: false });
    },
  }));