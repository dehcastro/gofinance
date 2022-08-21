import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title } from "./styles";

interface Props extends RectButtonProps {
  title: string;
}

export const Button = ({ title, ...rest }: Props) => (
  <Container {...rest}>
    <Title>{title}</Title>
  </Container>
);
