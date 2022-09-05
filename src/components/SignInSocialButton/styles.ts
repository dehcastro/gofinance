import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)`
  height: ${RFValue(56)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 6px;
  margin-bottom: 16px;

  flex-direction: row;
  align-items: center;
`;

export const ImageContainer = styled.View`
  height: 100%;
  padding: ${RFValue(16)}px;
  border-color: ${({ theme }) => theme.colors.background};
  border-right-width: 1px;

  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  flex: 1;
  text-align: center;

  color: ${({ theme }) => theme.colors.text_tertiary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
`;
