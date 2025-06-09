export interface Address {
  id: number;
  userName: string;
  displayName: string;
  street: string;
  number: number;
  postalCode: number;
  city: string;
  state: string;
}

export interface AddressStore {
  userName: string;
  setUserName: (user: string) => void;
  addresses: Address[];
  addAddress: (address: Address) => void;
  removeAddress: (id: string | number) => void;
}
