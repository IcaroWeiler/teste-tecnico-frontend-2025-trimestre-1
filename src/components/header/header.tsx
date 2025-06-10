// src/components/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import { useAddressStore } from "../../stores/addresses";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

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
        <div className="flex gap-6">
          <Link to="/add" className="text-xl font-bold flex items-center">
            Agenda de endereços
          </Link>
          <div className="flex gap-4">
            <Link
              to="/add"
              className="px-4 py-2 bg-buttonBg rounded-lg hover:bg-buttonHover transition-colors flex items-center gap-2"
            >
              <PlusOutlined />
            </Link>

            <Link
              to="/search"
              className="px-4 py-2 bg-buttonBg rounded-lg hover:bg-buttonHover transition-colors flex items-center gap-2"
            >
              <SearchOutlined />
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex whitespace-nowrap w-full">
            <span>Olá, {userName}</span>
          </div>

          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 bg-buttonBg rounded-lg cursor-pointer hover:bg-buttonHover transition-colors"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
