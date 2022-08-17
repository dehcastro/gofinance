import {
  Container,
  Header,
  TopWrapper,
  UserInfo,
  UserAvatar,
  User,
  GreetingText,
  UserName,
  Icon,
} from "./styles";

export const Dashboard = () => (
  <Container>
    <Header>
      <TopWrapper>
        <UserInfo>
          <UserAvatar
            source={{
              uri: "https://avatars.githubusercontent.com/u/6754099?v=4",
            }}
          />

          <User>
            <GreetingText>Olá,</GreetingText>

            <UserName>André!</UserName>
          </User>
        </UserInfo>

        <Icon name="power" />
      </TopWrapper>
    </Header>
  </Container>
);
