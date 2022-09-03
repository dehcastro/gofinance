import { categories } from "../../utils/categories";
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

export interface TransactionCardData {
  type: "income" | "outcome";
  title: string;
  amount: string;
  category: string;
  date: string;
}

export interface TransactionCardProps {
  data: TransactionCardData;
}

export const TransactionCard = ({ data }: TransactionCardProps) => {
  const [category] = categories.filter((item) => item.key === data.category);

  return (
    <Container>
      <Title>{data.title}</Title>

      <Amount type={data.type}>
        {data.type === "outcome" && "- "}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />

          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
};
