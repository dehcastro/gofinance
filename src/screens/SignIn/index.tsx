import { useCallback } from "react";
import { Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../context/auth";

import {
  Container,
  Header,
  TitleContainer,
  Title,
  SignInTitle,
  Footer,
  SignInButtons,
} from "./styles";

export const SignIn = () => {
  const { signInWithGoogle, signInWithApple } = useAuth();

  const handleSignInWithGoogle = useCallback(async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar à sua conta Google");
    }
  }, []);

  const handleSignInWithApple = useCallback(async () => {
    try {
      await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar à sua conta Apple");
    }
  }, []);

  return (
    <Container>
      <Header>
        <TitleContainer>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas{"\n"}
            finanças de forma{"\n"}
            muito simples
          </Title>
        </TitleContainer>

        <SignInTitle>
          Faça o seu login com{"\n"}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <SignInButtons>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />

          {Platform.OS === "ios" && (
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          )}
        </SignInButtons>
      </Footer>
    </Container>
  );
};
