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
  title: string;
  amount: string;
  lastTransaction: string;
}

const iconNames: {
  [key: string]: "arrow-up-circle" | "arrow-down-circle" | "dollar-sign";
} = {
  income: "arrow-up-circle",
  outcome: "arrow-down-circle",
  total: "dollar-sign",
};

export const HighlightCard = ({
  type,
  title,
  amount,
  lastTransaction,
}: Props) => (
  <Container type={type}>
    <Header>
      <Title type={type}>{title}</Title>

      <Icon name={iconNames[type]} type={type} size={50} />
    </Header>

    <Footer>
      <Amount type={type}>{amount}</Amount>

      <LastTransaction type={type}>{lastTransaction}</LastTransaction>
    </Footer>
  </Container>
);
