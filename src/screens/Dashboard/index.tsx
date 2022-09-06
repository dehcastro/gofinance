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

  const { signOut, user } = useAuth();

  const getLastTransactionDate = useCallback(
    (collection: TransactionCardData[], type: "income" | "outcome") => {
      if (collection.length < 1) return "";

      const lastTransaction = Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      );

      if (!!lastTransaction) return "";

      return Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }).format(new Date(lastTransaction));
    },
    []
  );

  const loadTransactions = useCallback(async () => {
    const dataKey = `@gofinance:transaction_user:${user.id}`;
    const storage = await AsyncStorage.getItem(dataKey);
    const transactions = storage ? JSON.parse(storage) : [];

    let incomeTotal = 0;
    let outcomeTotal = 0;

    const formattedTransactions: TransactionCardDataProps[] = transactions.map(
      (item: TransactionCardDataProps) => {
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
      }
    );

    setTransactions(formattedTransactions);

    const lastIncomeTransaction = getLastTransactionDate(
      transactions,
      "income"
    );

    const lastOutcomeTransaction = getLastTransactionDate(
      transactions,
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
                uri: user.picture,
              }}
            />

            <User>
              <GreetingText>Olá,</GreetingText>

              <UserName>{user.name}!</UserName>
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
