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
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
} from "./styles";

interface highlightCardsContentType {
  type: "income" | "outcome" | "total";
  [key: string]: string;
}

export interface TransactionCardDataProps extends TransactionCardData {
  id: string;
}

export const Dashboard = () => {
  const highlightCardsContent: highlightCardsContentType[] = [
    {
      type: "income",
      title: "Entrada",
      amount: "R$ 17.000,00",
      lastTransaction: "Última transação no dia 12 de Agosto",
    },
    {
      type: "outcome",
      title: "Saída",
      amount: "R$ 17.000,00",
      lastTransaction: "Última transação no dia 12 de Agosto",
    },
    {
      type: "total",
      title: "Total",
      amount: "R$ 17.000,00",
      lastTransaction: "Em 17/08/2022",
    },
  ];

  const data: TransactionCardDataProps[] = [
    {
      id: "1",
      type: "income",
      title: "Desenvolvimento de site",
      amount: "R$ 14.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "22/08/2022",
    },
    {
      id: "2",
      type: "outcome",
      title: "Restaurante",
      amount: "R$ 142,46",
      category: {
        name: "Alimentação",
        icon: "coffee",
      },
      date: "16/08/2022",
    },
    {
      id: "3",
      type: "outcome",
      title: "Financiamento",
      amount: "R$ 1.200,00",
      category: {
        name: "Habitação",
        icon: "home",
      },
      date: "22/08/2022",
    },
    {
      id: "4",
      type: "income",
      title: "Salário",
      amount: "R$ 18.000,00",
      category: {
        name: "Salário",
        icon: "dollar-sign",
      },
      date: "22/08/2022",
    },
  ];

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

          <Icon name="power" />
        </TopWrapper>
      </Header>

      <HighlightCards>
        {highlightCardsContent.map((component, index) => (
          <HighlightCard
            key={index}
            type={component.type}
            title={component.title}
            amount={component.amount}
            lastTransaction={component.lastTransaction}
            style={
              index === highlightCardsContent.length - 1 && {
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
