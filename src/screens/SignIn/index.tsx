import { RFValue } from "react-native-responsive-fontsize";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";

import {
  Container,
  Header,
  TitleContainer,
  Title,
  SignInTitle,
  Footer,
} from "./styles";

export const SignIn = () => {
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

      <Footer></Footer>
    </Container>
  );
};
