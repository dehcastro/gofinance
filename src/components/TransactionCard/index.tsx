import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

interface Category {
  name: string;
  icon: string;
}

export interface TransactionCardData {
  type: "income" | "outcome";
  title: string;
  amount: string;
  category: Category;
  date: string;
}

export interface TransactionCardProps {
  data: TransactionCardData;
}

export const TransactionCard = ({ data }: TransactionCardProps) => {
  return (
    <Container>
      <Title>{data.title}</Title>

      <Amount type={data.type}>
        {data.type === "outcome" && "-"} {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={data.category.icon} />

          <CategoryName>{data.category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
};