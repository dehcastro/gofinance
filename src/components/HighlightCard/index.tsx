import { Text } from "react-native";

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from "./styles";

export interface Props {
  type: "income" | "outcome" | "total";
}

export const HighlightCard = ({ type }: Props) => (
  <Container type={type}>
    <Header>
      <Title>Entrada</Title>

      <Icon name="arrow-up-circle" type={type} />
    </Header>

    <Footer>
      <Amount>R$ 17.000,00</Amount>

      <LastTransaction>Última transação dia 09 de Julho</LastTransaction>
    </Footer>
  </Container>
);
