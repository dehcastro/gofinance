import { Container, Category, Icon } from "./styles";

interface Props {
  category: string;
  onPress: () => void;
}

export const CategorySelectButton = ({ category, onPress }: Props) => (
  <Container onPress={onPress}>
    <Category>{category}</Category>

    <Icon name="chevron-down" />
  </Container>
);
