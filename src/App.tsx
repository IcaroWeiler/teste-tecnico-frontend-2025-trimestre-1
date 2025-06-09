import "tailwindcss";
import "./styles.css";
import { useAddressStore } from "./stores/addresses";
import Login from "./components/first-access/login";
import { useShallow } from "zustand/react/shallow";

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
        <div className="flex justify-center items-center w-full h-full">
          <h1 className="text-3xl font-bold underline"> Hello world! </h1>
          <button onClick={() => setUserName("")}>Deslogar</button>
        </div>
      ) : (
        <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-pageBg">
          <Login setUserName={setUserName}></Login>
        </div>
      )}
    </>
  );
}

export default App;
