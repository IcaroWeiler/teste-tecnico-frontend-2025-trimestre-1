import { useAddressStore } from "../../stores/addresses";
import { useShallow } from "zustand/shallow";
import FirstAccess from "../../components/first-access/firstAccess";
const AddAddress = () => {
  const { setUserName } = useAddressStore(
    useShallow((state) => ({
      userName: state.userName,
      setUserName: state.setUserName,
    }))
  );
  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw]">
      <FirstAccess setUserName={setUserName}></FirstAccess>
    </div>
  );
};

export default AddAddress;
