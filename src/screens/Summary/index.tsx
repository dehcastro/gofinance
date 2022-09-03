import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, SectionListRenderItemInfo } from "react-native";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import { toCurrency } from "../../utils/toCurrency";
import { Container, Header, Title, Content } from "./styles";
import { useFocusEffect } from "@react-navigation/native";

interface TransactionData {
  type: "income" | "outcome";
  title: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryCard {
  key: string;
  category: string;
  total: string;
  color: string;
}

export const Summary = () => {
  const [categoryCards, setCategoryCards] = useState<CategoryCard[]>([]);

  const loadStorage = useCallback(async () => {
    try {
      const dataKey = "@gofinance:transaction";
      const storage = await AsyncStorage.getItem(dataKey);
      const currentStorage = storage ? JSON.parse(storage) : [];

      const outcomes = currentStorage.filter(
        (outcome: TransactionData) => outcome.type === "outcome"
      );

      let categoryCardsFromStorage: CategoryCard[] = [];

      categories.forEach((category) => {
        let categoryTotal = 0;

        outcomes.forEach((outcome: TransactionData) => {
          if (outcome.category === category.key)
            categoryTotal += Number(outcome.amount);
        });

        if (categoryTotal > 0)
          categoryCardsFromStorage.push({
            key: category.key,
            category: category.name,
            color: category.color,
            total: toCurrency(categoryTotal),
          });
      });

      setCategoryCards(categoryCardsFromStorage);
    } catch (error) {
      Alert.alert("Hmmmmm", "Não foi possível carregar as transações");
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadStorage();
    }, [])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {categoryCards.map((card) => (
          <HistoryCard
            key={card.key}
            color={card.color}
            title={card.category}
            amount={card.total}
          />
        ))}
      </Content>
    </Container>
  );
};
