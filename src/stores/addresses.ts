import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Address, AddressStore } from "../models/address";

export const useAddressStore = create<AddressStore>()(
  persist(
    (set, get) => ({
      userName: "",
      setUserName: (user: string) => set({ userName: user }),

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
