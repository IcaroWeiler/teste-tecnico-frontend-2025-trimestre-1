export interface Address {
  id: string;
  userName: string;
  displayName: string;
  street: string;
  cep: string;
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
