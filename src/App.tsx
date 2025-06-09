import "tailwindcss";
import "./styles.css";
import { useAddressStore } from "./stores/addresses";
import Login from "./components/first-access/login";
import { useShallow } from "zustand/react/shallow";
import { ToastContainer } from "react-toastify";
import AddAddress from "./components/add/AddAddress";

function App() {
  const { userName, setUserName } = useAddressStore(
    useShallow((state) => ({
      userName: state.userName,
      setUserName: state.setUserName,
    }))
  );
  return (
    <>
      {userName ? (
        <AddAddress />
      ) : (
        <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-pageBg">
          <Login setUserName={setUserName} />
        </div>
      )}

      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
