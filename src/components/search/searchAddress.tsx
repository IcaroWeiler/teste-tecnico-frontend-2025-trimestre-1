import { useAddressStore } from "../../stores/addresses";
import { useShallow } from "zustand/shallow";
import columns from "./tableColumns";
import { Table } from "antd";
import type { Address } from "../../models/address";
const SearchAddress = () => {
  const { addresses, userName, removeAddress } = useAddressStore(
    useShallow((state) => ({
      userName: state.userName,
      addresses: state.addresses,
      removeAddress: state.removeAddress,
    }))
  );

  const tableColumns = columns;

  const handleDelete = (record: Address) => {
    removeAddress(record.id);
  };

  return (
    <div className="fade-in animate-delay-500 bg-cardBg p-15 rounded-lg w-[1250px]">
      <Table
        scroll={{ x: "calc(700px + 50%)", y: 47 * 5 }}
        pagination={false}
        dataSource={addresses.filter((a) => a.userName == userName)}
        columns={tableColumns(handleDelete)}
      />
    </div>
  );
};

export default SearchAddress;
