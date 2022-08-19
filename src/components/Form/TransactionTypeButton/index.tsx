import { TouchableOpacityProps } from "react-native";

import { Container, Icon, Title } from "./styles";

const icons = {
  income: "arrow-up-circle",
  outcome: "arrow-down-circle",
};

interface Props extends TouchableOpacityProps {
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
  <Container {...rest} isActive={isActive} type={type}>
    <Icon name={icons[type]} type={type} />

    <Title>{title}</Title>
  </Container>
);
