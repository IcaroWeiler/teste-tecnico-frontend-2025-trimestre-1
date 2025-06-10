import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

interface LoginProps {
  setUserName: (user: string) => void;
  userName?: string;
}

const FirstAccess = ({ setUserName, userName }: LoginProps) => {
  const [user, setUser] = useState("");
  const typeUsernameError = () =>
    toast("Digite o nome de usuário", { type: "error" });

  const loggedIn = () => toast("Usuário logado", { type: "success" });

  const navigate = useNavigate();
  return (
    <div className="w-[500px] fade-in animate-delay-500 bg-cardBg p-15 rounded-lg">
      <h1 className="text-title text-4xl mb-2">Olá</h1>
      <div>
        <span className="text-title">
          Digite um nome de usuário para começar salvar endereços
        </span>

        <div className="mt-4">
          <Input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Nome de usuário"
            size="large"
            maxLength={15}
          />
        </div>

        <button
          className="mt-4 py-3 px-4 bg-buttonBg text-buttonText rounded-lg cursor-pointer"
          onClick={() => {
            if (user) {
              setUserName(user);
              loggedIn();
              navigate("/add");
            } else typeUsernameError();
          }}
        >
          Logar
        </button>
      </div>
    </div>
  );
};

export default FirstAccess;
