import { Input } from "antd";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface LoginProps {
  setUserName: (user: string) => void;
}

const Login = ({ setUserName }: LoginProps) => {
  const [user, setUser] = useState("");
  const typeUsernameError = () =>
    toast("Digite o nome de usuário", { type: "error" });

  const loggedIn = () => toast("Usuário logado", { type: "success" });

  return (
    <div className="w-[500px] fade-in animate-delay-500">
      <h1 className="text-title text-4xl mb-2">Olá</h1>
      <div>
        <span className="text-title">
          Digite um nome de usuário para começar salvar endereços
        </span>
        <Input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Nome de usuário"
          maxLength={15}
        />
        <button
          className="mt-4 py-4 px-8 bg-buttonBg text-buttonText rounded-lg cursor-pointer"
          onClick={() => {
            if (user) {
              setUserName(user);
              loggedIn();
            } else typeUsernameError();
          }}
        >
          Logar
        </button>
      </div>
    </div>
  );
};

export default Login;
