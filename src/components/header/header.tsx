// src/components/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import { useAddressStore } from "../../stores/addresses";

const Header = () => {
  const navigate = useNavigate();
  const userName = useAddressStore((state) => state.userName);
  const setUserName = useAddressStore((state) => state.setUserName);

  const handleLogout = () => {
    setUserName("");
    navigate("/");
  };

  return (
    <header className="bg-cardBg text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/add" className="text-xl font-bold flex items-center">
          Agenda de endereços
        </Link>

        <div className="flex items-center space-x-6">
          <div className="flex whitespace-nowrap w-full">
            <span>Olá, {userName}</span>
          </div>

          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 bg-buttonBg rounded-lg cursor-pointer"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
