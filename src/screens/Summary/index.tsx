import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import { toCurrency } from "../../utils/toCurrency";
import { Container, Header, Title, Content, ChartContainer } from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

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
  totalInNumber: number;
  totalFormatted: string;
  color: string;
  percentage: string;
}

export const Summary = () => {
  const [categoryCards, setCategoryCards] = useState<CategoryCard[]>([]);

  const theme = useTheme();

  const loadStorage = useCallback(async () => {
    try {
      const dataKey = "@gofinance:transaction";
      const storage = await AsyncStorage.getItem(dataKey);
      const currentStorage = storage ? JSON.parse(storage) : [];

      const outcomes = currentStorage.filter(
        (outcome: TransactionData) => outcome.type === "outcome"
      );

      const outcomesTotal = outcomes.reduce(
        (total: number, outcome: TransactionData) => {
          return total + Number(outcome.amount);
        },
        0
      );

      let categoryCardsFromStorage: CategoryCard[] = [];

      categories.forEach((category) => {
        let categoryTotal = 0;

        outcomes.forEach((outcome: TransactionData) => {
          if (outcome.category === category.key)
            categoryTotal += Number(outcome.amount);
        });

        const percentage = `${((categoryTotal / outcomesTotal) * 100).toFixed(
          2
        )}%`;

        if (categoryTotal > 0)
          categoryCardsFromStorage.push({
            key: category.key,
            category: category.name,
            color: category.color,
            totalInNumber: categoryTotal,
            totalFormatted: toCurrency(categoryTotal),
            percentage,
          });
      });

      setCategoryCards(categoryCardsFromStorage);
    } catch (error) {
      console.log({ error });
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
        <ChartContainer>
          <VictoryPie
            data={categoryCards}
            colorScale={categoryCards.map((categoryCard) => categoryCard.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: "bold",
                fill: theme.colors.text_secondary,
              },
            }}
            labelRadius={50}
            x="percentage"
            y="totalInNumber"
          />
        </ChartContainer>

        {categoryCards.map((card) => (
          <HistoryCard
            key={card.key}
            color={card.color}
            title={card.category}
            amount={card.totalFormatted}
          />
        ))}
      </Content>
    </Container>
  );
};
