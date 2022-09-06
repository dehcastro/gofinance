import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { useTheme } from "styled-components";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import { toCurrency } from "../../utils/toCurrency";
import { useAuth } from "../../context/auth";
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  MonthText,
  LoadingContainer,
  ActivityIndicator,
} from "./styles";

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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categoryCards, setCategoryCards] = useState<CategoryCard[]>([]);

  const theme = useTheme();
  const { user } = useAuth();

  const handleDateChange = useCallback(
    (action: "next" | "previous") => {
      if (action === "next") {
        setSelectedDate(addMonths(selectedDate, 1));
      } else {
        setSelectedDate(subMonths(selectedDate, 1));
      }
    },
    [selectedDate]
  );

  const loadStorage = useCallback(async () => {
    setIsLoading(true);

    try {
      const dataKey = `@gofinance:transaction_user:${user.id}`;
      const storage = await AsyncStorage.getItem(dataKey);
      const currentStorage = storage ? JSON.parse(storage) : [];

      const outcomes = currentStorage.filter(
        (outcome: TransactionData) =>
          outcome.type === "outcome" &&
          new Date(outcome.date).getMonth() === selectedDate.getMonth() &&
          new Date(outcome.date).getFullYear() === selectedDate.getFullYear()
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
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
      Alert.alert("Hmmmmm", "Não foi possível carregar as transações");
    }
  }, [selectedDate]);

  useFocusEffect(
    useCallback(() => {
      loadStorage();
    }, [loadStorage])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator />
        </LoadingContainer>
      ) : (
        <Content
          contentContainerStyle={{
            padding: 24,
          }}
          showsVerticalScrollIndicator={false}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange("previous")}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <MonthText>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </MonthText>

            <MonthSelectButton onPress={() => handleDateChange("next")}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={categoryCards}
              colorScale={categoryCards.map(
                (categoryCard) => categoryCard.color
              )}
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
      )}
    </Container>
  );
};
