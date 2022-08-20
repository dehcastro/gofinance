import { Container, Category, Icon } from "./styles";

interface Props {
  category: string;
}

export const CategorySelect = ({ category }: Props) => (
  <Container>
    <Category>{category}</Category>

    <Icon name="chevron-down" />
  </Container>
);
