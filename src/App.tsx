import "tailwindcss";
import "./styles.css";
import { useAddressStore } from "./stores/addresses";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { type JSX } from "react";
import Add from "./pages/add/Add";
import Login from "./pages/login/Login";

// Componente para rotas protegidas (requer autenticação)
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const userName = useAddressStore((state) => state.userName);
  const location = useLocation();

  if (!userName) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

// Componente para rotas não autenticadas (redireciona se já estiver logado)
const UnauthenticatedRoute = ({ children }: { children: JSX.Element }) => {
  const userName = useAddressStore((state) => state.userName);
  const location = useLocation();

  if (userName) {
    // Redireciona para a página que tentou acessar antes ou para /add
    const redirectTo = location.state?.from?.pathname || "/add";
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <div className="bg-pageBg h-[100vh] w-[100vw]">
        <Routes>
          <Route
            path="/"
            element={
              <UnauthenticatedRoute>
                <Login />
              </UnauthenticatedRoute>
            }
          />

          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <Add />
              </ProtectedRoute>
            }
          />

          {/* Redireciona qualquer rota desconhecida */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
