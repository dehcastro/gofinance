import { HighlightCard } from "../../components/HighlightCard";
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
} from "./styles";

export const Dashboard = () => (
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
      <HighlightCard
        type="income"
        title="Entrada"
        amount="R$ 17.000,00"
        lastTransaction="Última transação no dia 12 de Agosto"
      />
      <HighlightCard
        type="outcome"
        title="Saída"
        amount="R$ 17.000,00"
        lastTransaction="Última transação no dia 12 de Agosto"
      />
      <HighlightCard
        type="total"
        title="Total"
        amount="R$ 17.000,00"
        lastTransaction="Última transação no dia 12 de Agosto"
      />
    </HighlightCards>
  </Container>
);
