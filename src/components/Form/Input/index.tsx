import { TextInputProps } from "react-native";

import { Container } from "./styles";

export const Input = ({ ...rest }: TextInputProps) => <Container {...rest} />;
