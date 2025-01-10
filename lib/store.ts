import { create } from "zustand";

interface Store {
  isEn: boolean;
}

const useStore = create<Store>((set) => ({
  isEn: false,
  setIsEn: () => set((state) => ({ isEn: !state.isEn })),
}));

export default useStore;
