import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space } from "antd";
import type { Address } from "../../models/address";

const columns = (
  onDelete: (address: Address) => void,
  onEdit: (address: Address) => void
) => [
  {
    title: "Nome de Exibição",
    dataIndex: "displayName",
    key: "displayName",
  },
  {
    title: "Rua",
    dataIndex: "street",
    key: "street",
  },
  {
    title: "CEP",
    dataIndex: "cep",
    key: "cep",
  },
  {
    title: "Cidade",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Estado",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "Ação",
    key: "action",
    render: (record: Address) => (
      <div className="flex gap-2 justify-center items-center w-[35px]">
        <EditOutlined
          onClick={() => onEdit(record)}
          style={{ cursor: "pointer" }}
        />
        <DeleteOutlined
          onClick={() => onDelete(record)}
          style={{ color: "red", cursor: "pointer" }}
        />
      </div>
    ),
  },
];

export default columns;
