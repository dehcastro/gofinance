interface CollectionType {
  type: string;
  date: string;
}

export const getLastTransactionDate = (
  collection: CollectionType[],
  type: "income" | "outcome"
): string => {
  if (collection.length === 0) return "";

  const lastTransaction =
    type === "income"
      ? Math.max.apply(
          Math,
          collection
            .filter(
              (transaction: CollectionType) => transaction.type === "income"
            )
            .map((transaction: CollectionType) =>
              new Date(transaction.date).getTime()
            )
        )
      : Math.min.apply(
          Math,
          collection
            .filter(
              (transaction: CollectionType) => transaction.type === "outcome"
            )
            .map((transaction: CollectionType) =>
              new Date(transaction.date).getTime()
            )
        );

  return Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(new Date(lastTransaction));
};
