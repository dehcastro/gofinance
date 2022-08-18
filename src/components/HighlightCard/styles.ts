import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import { Props as TypeProps } from "./index";

const iconTypes: { [key: string]: "success" | "attention" | "shape" } = {
  income: "success",
  outcome: "attention",
  total: "shape",
};

export const Container = styled.View<TypeProps>`
  background-color: ${({ theme, type }) =>
    type === "total" ? theme.colors.secondary : theme.colors.shape};

  width: ${RFValue(300)}px;
  border-radius: 6px;
  padding: ${RFValue(20)}px ${RFValue(24)}px ${RFValue(42)}px;

  margin-right: ${RFValue(16)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.title};
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;
  color: ${({ theme, type }) => theme.colors[iconTypes[type]]};
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.title};
  margin-top: ${RFValue(38)}px;
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.text};
`;
