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
import Header from "./components/header/header";
import Search from "./pages/search/search";

// Componente para rotas protegidas
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const userName = useAddressStore((state) => state.userName);
  const location = useLocation();

  if (!userName) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

// Componente para rotas não autenticadas
const UnauthenticatedRoute = ({ children }: { children: JSX.Element }) => {
  const userName = useAddressStore((state) => state.userName);
  const location = useLocation();

  if (userName) {
    const redirectTo = location.state?.from?.pathname || "/add";
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

// Layout principal que contém o Header
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-[100vh]">
      <Header />
      <div className="flex-grow overflow-auto">{children}</div>
    </div>
  );
};

function App() {
  // Determina se a rota atual é o login
  const isLoginPage = location.pathname === "/";

  return (
    <BrowserRouter>
      <div className="bg-pageBg h-[100vh] w-[100vw]">
        <div className={isLoginPage ? "h-full" : "h-[calc(100vh-4rem)]"}>
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
                  <MainLayout>
                    <Add />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Add />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Search />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
