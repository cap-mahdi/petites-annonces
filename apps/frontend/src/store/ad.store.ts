import { create } from "zustand";
import type { InternalAd } from "@my-app/types";

interface AdStore {
  selectedAd: InternalAd | null;
  setSelectedAd: (ad: InternalAd | null) => void;
  isFormOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
}

export const useAdStore = create<AdStore>((set) => ({
  selectedAd: null,
  setSelectedAd: (ad) => set({ selectedAd: ad }),
  isFormOpen: false,
  openForm: () => set({ isFormOpen: true }),
  closeForm: () => set({ isFormOpen: false, selectedAd: null }),
}));
