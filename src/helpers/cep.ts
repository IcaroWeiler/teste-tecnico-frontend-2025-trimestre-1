export const isValidCEP = (cep: string): boolean => {
  const regex = /^\d{5}-?\d{3}$/;
  return regex.test(cep);
};
