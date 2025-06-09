import React from "react";
import { Input } from "antd";
import { useAddressStore } from "../../stores/addresses";
import { useShallow } from "zustand/shallow";
const AddAddress = () => {
  const { userName, setUserName } = useAddressStore(
    useShallow((state) => ({
      userName: state.userName,
      setUserName: state.setUserName,
    }))
  );
  return (
    <div>
      <Input placeholder="Nome de usuário" />
      <Input placeholder="Nome de exibição" />
      <button onClick={() => setUserName("")}>Deslogar</button>
    </div>
  );
};

export default AddAddress;
