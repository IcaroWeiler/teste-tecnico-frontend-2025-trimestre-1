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
    <div className="w-[500px] fade-in animate-delay-500 bg-cardBg p-15 rounded-lg">
      <Input placeholder="Nome de usuário" />
      <Input placeholder="Nome de exibição" />
      <button onClick={() => setUserName("")}>Deslogar</button>
    </div>
  );
};

export default AddAddress;
