import { useEffect, useState, useCallback } from "react";
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
} from "./styles";
import { useFocusEffect } from "@react-navigation/native";

interface highlightCardsContentType {
  type: "income" | "outcome" | "total";
  [key: string]: string;
}

export interface TransactionCardDataProps extends TransactionCardData {
  id: string;
}

export const Dashboard = () => {
  const [data, setData] = useState<TransactionCardDataProps[]>([]);

  const loadTransactions = useCallback(async () => {
    const dataKey = "@gofinance:transaction";

    const storage = await AsyncStorage.getItem(dataKey);

    const transactions = storage ? JSON.parse(storage) : [];

    const formattedTransactions: TransactionCardDataProps[] = transactions.map(
      (item: TransactionCardDataProps) => {
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

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

    setData(formattedTransactions);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
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

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </TopWrapper>
      </Header>

      <HighlightCards>
        {data.map((component, index) => (
          <HighlightCard
            key={index}
            type={component.type}
            title={component.title}
            amount={component.amount}
            lastTransaction={component.lastTransaction}
            style={
              index === data.length - 1 && {
                marginRight: 0,
              }
            }
          />
        ))}
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
