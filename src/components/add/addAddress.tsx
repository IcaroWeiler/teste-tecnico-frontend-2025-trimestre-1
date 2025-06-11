import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useAddressStore } from "../../stores/addresses";
import { useShallow } from "zustand/shallow";
import {
  fetchCepData,
  type CepData,
  type CepError,
} from "../../services/viaCep";
import { isValidCEP } from "../../helpers/cep";
import { toast } from "react-toastify";

type AddressFormData = {
  displayName: string;
  cep: string;
  state: string;
  city: string;
  street: string;
};

type AddAddressParams = {
  edit: boolean;
  id: string;
};

const initialFormData: AddressFormData = {
  displayName: "",
  cep: "",
  state: "",
  city: "",
  street: "",
};

const AddAddress = ({ id, edit }: AddAddressParams) => {
  const { addAddress, editAddress, userName, addresses } = useAddressStore(
    useShallow((state) => ({
      addAddress: state.addAddress,
      editAddress: state.editAddress,
      userName: state.userName,
      addresses: state.addresses,
    }))
  );

  const [formData, setFormData] = useState<AddressFormData>(initialFormData);

  const handleInputChange =
    (field: keyof AddressFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/\D/g, "");

    value = value.slice(0, 8);

    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d{0,3})/, "$1-$2");
    }

    setFormData((prev) => ({ ...prev, cep: value }));
  };

  useEffect(() => {
    fetchCepData(formData.cep)
      .then((r: CepData | CepError) => {
        if (!("error" in r)) {
          setFormData({
            ...formData,
            state: r.uf,
            street: r.logradouro,
            city: r.localidade,
          });
        } else {
          return;
        }
      })
      .catch((e) => console.log(e));
  }, [formData.cep]);

  useEffect(() => {
    if (edit) {
      const selectedAddress = addresses.find((a) => a.id == id);

      if (selectedAddress?.userName != userName) return;

      if (selectedAddress) {
        setFormData({
          cep: selectedAddress.cep,
          displayName: selectedAddress.displayName,
          state: selectedAddress.state,
          street: selectedAddress.street,
          city: selectedAddress.city,
        });
      }
    } else {
      setFormData(initialFormData);
    }
  }, [edit]);

  const hasEmptyFields = (data: AddressFormData): boolean => {
    return Object.values(data).some((value) => value.trim() === "");
  };

  const validate = () => {
    if (hasEmptyFields(formData)) {
      return {
        error: true,
        message: "Preencha todos os campos para continuar",
      };
    }

    if (!isValidCEP(formData.cep)) {
      return { error: true, message: "O CEP é inválido" };
    }

    if (edit) {
      return { error: false, message: "O endereço foi editado com sucesso" };
    }

    return { error: false, message: "O endereço foi cadastrado com sucesso" };
  };

  const handleSubmit = () => {
    const response = validate();

    if (response.error) {
      toast(response.message, { type: "error" });
    } else {
      if (!edit) {
        toast(response.message, { type: "success" });
        addAddress({
          ...formData,
          userName: userName,
          id: crypto.randomUUID(),
        });
        setFormData(initialFormData);
      } else {
        toast(response.message, { type: "success" });
        editAddress({
          ...formData,
          userName: userName,
          id: id,
        });
      }
    }
  };

  return (
    <div className="w-[500px] fade-in animate-delay-500 bg-cardBg p-15 rounded-lg">
      <div className="flex-col flex gap-4">
        <Input
          size="large"
          placeholder="Nome de exibição"
          value={formData.displayName}
          onChange={handleInputChange("displayName")}
        />
        <Input
          value={formData.cep}
          size="large"
          onChange={handleCepChange}
          placeholder="CEP"
        />
      </div>

      <div className="flex gap-2 mt-4">
        <Input
          size="large"
          placeholder="Estado"
          value={formData.state}
          onChange={handleInputChange("state")}
        />
        <Input
          size="large"
          placeholder="Cidade"
          value={formData.city}
          onChange={handleInputChange("city")}
        />
      </div>

      <div className="flex-col flex gap-4 mt-4">
        <Input
          size="large"
          placeholder="Logradouro"
          value={formData.street}
          onChange={handleInputChange("street")}
        />
      </div>

      <button
        className="mt-4 py-3 px-4 bg-buttonBg text-buttonText rounded-lg cursor-pointer"
        onClick={handleSubmit}
      >
        {edit ? "Editar" : "Adicionar"}
      </button>
    </div>
  );
};

export default AddAddress;
