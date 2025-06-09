import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Address } from "../models/address";

type AddressStore = {
  addresses: Address[];
  addAddress: (address: Address) => void;
  removeAddress: (id: string | number) => void;
};

export const useAddressStore = create<AddressStore>()(
  persist(
    (set, get) => ({
      addresses: [],
      addAddress: (address: Address) =>
        set({ addresses: [...get().addresses, address] }),
      removeAddress: (id: string | number) =>
        set({
          addresses: get().addresses.filter((a: Address) => a.id !== id),
        }),
    }),
    {
      name: "addresses-register",
    }
  )
);
