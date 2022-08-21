import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Icon, Title, Button } from "./styles";

const icons = {
  income: "arrow-up-circle",
  outcome: "arrow-down-circle",
};

interface Props extends RectButtonProps {
  title: string;
  type: "income" | "outcome";
  isActive: boolean;
}

export const TransactionTypeButton = ({
  title,
  type,
  isActive,
  ...rest
}: Props) => (
  <Container isActive={isActive} type={type}>
    <Button {...rest}>
      <Icon name={icons[type]} type={type} />

      <Title>{title}</Title>
    </Button>
  </Container>
);
