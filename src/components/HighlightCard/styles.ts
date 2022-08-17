import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import { Props } from "./index";

// const iconTypes: { income: "success"; outcome: "attention"; total: "shape" } = {
const iconTypes: { [key: string]: "success" | "attention" | "shape" } = {
  income: "success",
  outcome: "attention",
  total: "shape",
};

export const Container = styled.View<Props>`
  background-color: ${({ theme, type }) =>
    type === "total" ? theme.colors.secondary : theme.colors.shape};

  width: ${RFValue(300)}px;
  border-radius: 6px;
  padding: ${RFValue(20)}px ${RFValue(24)}px ${RFValue(42)}px;
`;

export const Header = styled.View`
  flex-direction: row;
`;

export const Title = styled.Text``;

export const Icon = styled(Feather)<Props>`
  font-size: ${RFValue(40)}px;
  color: ${({ theme, type }) => theme.colors[iconTypes[type]]};
`;

export const Footer = styled.View``;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme }) => theme.colors.title};
  margin-top: ${RFValue(38)}px;
`;

export const LastTransaction = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
`;
