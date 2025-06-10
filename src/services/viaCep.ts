import axios from "axios";

export interface CepData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface CepError {
  error: boolean;
  message: string;
}

export const fetchCepData = async (
  cep: string
): Promise<CepData | CepError> => {
  try {
    const cleanedCep = cep.replace(/\D/g, "");

    if (cleanedCep.length !== 8) {
      throw new Error("CEP deve conter 8 dígitos");
    }

    const response = await axios.get(
      `https://viacep.com.br/ws/${cleanedCep}/json/`
    );

    if (response.data.erro) {
      return {
        error: true,
        message: "CEP não encontrado",
      };
    }

    return response.data as CepData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        error: true,
        message: "Erro na comunicação com o serviço de CEP",
      };
    }

    return {
      error: true,
      message: (err as Error).message || "Erro desconhecido ao buscar CEP",
    };
  }
};
