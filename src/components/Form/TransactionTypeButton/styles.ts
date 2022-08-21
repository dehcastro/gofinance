import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps {
  type: "income" | "outcome";
}

interface ContainerProps {
  isActive: boolean;
  type: "income" | "outcome";
}

export const Container = styled.View<ContainerProps>`
  width: 49%;
  border: 1.2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 8px;

  ${({ isActive, type }) =>
    isActive &&
    type === "income" &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
      border-color: ${({ theme }) => theme.colors.success_light};
    `}

  ${({ isActive, type }) =>
    isActive &&
    type === "outcome" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
      border-color: ${({ theme }) => theme.colors.attention_light};
    `}
`;

export const Button = styled(RectButton)`
  padding: 16px 0;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === "income" ? theme.colors.success : theme.colors.attention};

  color: ${({ theme, type }) =>
    type === "income" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
