import { useAddressStore } from "../../stores/addresses";
import { useShallow } from "zustand/shallow";
const SearchAddress = () => {
  const { setUserName } = useAddressStore(
    useShallow((state) => ({
      userName: state.userName,
      setUserName: state.setUserName,
    }))
  );
  return (
    <div className="fade-in animate-delay-500 bg-cardBg p-15 rounded-lg"></div>
  );
};

export default SearchAddress;
