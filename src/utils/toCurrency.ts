export const toCurrency = (amount: number) =>
  amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
