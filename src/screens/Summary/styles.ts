import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;

  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 20px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text_secondary};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const Content = styled(ScrollView)``;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const MonthSelect = styled.View`
  flex-direction: row;

  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const MonthText = styled.Text`
  color: ${({ theme }) => theme.colors.text_tertiary};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ActivityIndicator = styled.ActivityIndicator.attrs(
  ({ theme }) => ({
    color: theme.colors.primary,
    size: "large",
  })
)``;
