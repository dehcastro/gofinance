import { Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface CategoryProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${Platform.OS === "ios" ? RFValue(114) : RFValue(80)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding-bottom: 20px;

  align-items: center;
  justify-content: flex-end;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text_secondary};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const Category = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<CategoryProps>`
  width: 100%;
  padding: ${RFValue(15)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.secondary_light : theme.colors.background};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.text_tertiary};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;
