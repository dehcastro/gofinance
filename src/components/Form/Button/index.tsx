import { Container, Title } from "./styles";

interface Props {
  title: string;
  onPress: () => void;
}

export const Button = ({ title, onPress, ...rest }: Props) => (
  <Container {...rest} onPress={onPress}>
    <Title>{title}</Title>
  </Container>
);
