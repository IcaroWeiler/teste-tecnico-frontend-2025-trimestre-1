import { useAddressStore } from "../../stores/addresses";
import { useShallow } from "zustand/shallow";
import columns from "./tableColumns";
import { ConfigProvider, Empty, Input, Table } from "antd";
import type { Address } from "../../models/address";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";

const SearchAddress = () => {
  const { addresses, userName, removeAddress } = useAddressStore(
    useShallow((state) => ({
      userName: state.userName,
      addresses: state.addresses,
      removeAddress: state.removeAddress,
    }))
  );

  const navigate = useNavigate();

  const [nameFilter, setNameFilter] = useState<string>();
  const [stateFilter, setStateFilter] = useState<string>();
  const [cityFilter, setCityFilter] = useState<string>();

  const [debouncedName] = useDebounce(nameFilter, 300);
  const [debouncedState] = useDebounce(stateFilter, 300);
  const [debouncedCity] = useDebounce(cityFilter, 300);

  const tableColumns = columns;

  const handleDelete = (record: Address) => {
    removeAddress(record.id);
  };

  const handleEdit = (record: Address) => {
    navigate(`/edit/${record.id}`);
  };

  const filteredAddresses = addresses.filter((a) => {
    const matchesUser = a.userName === userName;
    const matchesName =
      !debouncedName ||
      a.displayName?.toLowerCase().includes(debouncedName.toLowerCase());
    const matchesState =
      !debouncedState ||
      a.state?.toLowerCase().includes(debouncedState.toLowerCase());
    const matchesCity =
      !debouncedCity ||
      a.city?.toLowerCase().includes(debouncedCity.toLowerCase());
    return matchesUser && matchesName && matchesState && matchesCity;
  });

  return (
    <div className="fade-in animate-delay-500 bg-cardBg p-15 rounded-lg w-[1250px]">
      <div className="flex flex-col">
        <span className="text-title">Filtrar por:</span>
        <div className="flex gap-4 mb-4">
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNameFilter(e.target.value)
            }
            size="large"
            placeholder="Nome de exibição"
          />
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStateFilter(e.target.value)
            }
            size="large"
            placeholder="Estado"
          />
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCityFilter(e.target.value)
            }
            size="large"
            placeholder="Cidade"
          />
        </div>
      </div>

      <ConfigProvider
        renderEmpty={() => <Empty description="Não existem endereços" />}
      >
        <Table
          scroll={{ x: "calc(700px + 50%)", y: 47 * 5 }}
          pagination={false}
          dataSource={filteredAddresses}
          columns={tableColumns(handleDelete, handleEdit)}
          rowKey="id"
        />
      </ConfigProvider>
    </div>
  );
};

export default SearchAddress;
