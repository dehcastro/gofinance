import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardData,
} from "../../components/TransactionCard";
import {
  Container,
  Header,
  TopWrapper,
  UserInfo,
  UserAvatar,
  User,
  GreetingText,
  UserName,
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LoadingContainer,
  ActivityIndicator,
} from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { toCurrency } from "../../utils/toCurrency";
import { getLastTransactionDate } from "../../utils/getLastTransactionDate";
import { useAuth } from "../../context/auth";

export interface TransactionCardDataProps extends TransactionCardData {
  id: string;
}

interface TransactionsInfo {
  amount: string;
  lastTransaction: string;
}

interface HighlightCardData {
  income: TransactionsInfo;
  outcome: TransactionsInfo;
  total: TransactionsInfo;
}

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionCardDataProps[]>(
    []
  );
  const [highlightData, setHighlightData] = useState<HighlightCardData>(
    {} as HighlightCardData
  );

  const { signOut } = useAuth();

  const loadTransactions = useCallback(async () => {
    const dataKey = "@gofinance:transaction";
    const storage = await AsyncStorage.getItem(dataKey);
    const transactionsStorage = storage ? JSON.parse(storage) : [];

    let incomeTotal = 0;
    let outcomeTotal = 0;

    const formattedTransactions: TransactionCardDataProps[] =
      transactionsStorage.map((item: TransactionCardDataProps) => {
        if (item.type === "income") {
          incomeTotal += Number(item.amount);
        } else {
          outcomeTotal += Number(item.amount);
        }

        const amount = toCurrency(Number(item.amount));

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          title: item.title,
          type: item.type,
          category: item.category,
          amount,
          date,
        };
      });

    const lastIncomeTransaction = getLastTransactionDate(
      transactionsStorage,
      "income"
    );

    const lastOutcomeTransaction = getLastTransactionDate(
      transactionsStorage,
      "outcome"
    );

    setHighlightData({
      income: {
        amount: toCurrency(incomeTotal),
        lastTransaction: `Última entrada dia ${lastIncomeTransaction}`,
      },
      outcome: {
        amount: toCurrency(outcomeTotal),
        lastTransaction: `Última saída dia ${lastOutcomeTransaction}`,
      },
      total: {
        amount: toCurrency(incomeTotal - outcomeTotal),
        lastTransaction: `${lastOutcomeTransaction} a ${lastIncomeTransaction}`,
      },
    });
    setTransactions(formattedTransactions);
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [loadTransactions])
  );

  return isLoading ? (
    <LoadingContainer>
      <ActivityIndicator />
    </LoadingContainer>
  ) : (
    <Container>
      <Header>
        <TopWrapper>
          <UserInfo>
            <UserAvatar
              source={{
                uri: "https://avatars.githubusercontent.com/u/6754099?v=4",
              }}
            />

            <User>
              <GreetingText>Olá,</GreetingText>

              <UserName>André!</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={signOut}>
            <Icon name="power" />
          </LogoutButton>
        </TopWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="income"
          title="Entradas"
          amount={highlightData.income.amount}
          lastTransaction={highlightData.income.lastTransaction}
        />

        <HighlightCard
          type="outcome"
          title="Saídas"
          amount={highlightData.outcome.amount}
          lastTransaction={highlightData.outcome.lastTransaction}
        />

        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData.total.amount}
          lastTransaction={highlightData.total.lastTransaction}
          style={{ marginRight: 0 }}
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
