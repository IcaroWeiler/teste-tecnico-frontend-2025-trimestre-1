import { useParams } from "react-router-dom";
import AddAddress from "../../components/add/addAddress";

const Add = () => {
  const { id } = useParams();

  return (
    <div className="flex justify-center items-center h-full">
      <AddAddress edit={!!id} id={id || ""} />
    </div>
  );
};

export default Add;
