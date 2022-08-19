import { useCallback, useState } from "react";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

export const Register = () => {
  const [transactionType, setTransactionType] = useState("");

  const transactionTypesSelection = useCallback(
    (type: "income" | "outcome") => {
      setTransactionType(type);
    },
    []
  );

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />

          <Input placeholder="Preço" />

          <TransactionTypes>
            <TransactionTypeButton
              title="Income"
              type="income"
              onPress={() => transactionTypesSelection("income")}
              isActive={transactionType === "income"}
            />

            <TransactionTypeButton
              title="Outcome"
              type="outcome"
              onPress={() => transactionTypesSelection("outcome")}
              isActive={transactionType === "outcome"}
            />
          </TransactionTypes>
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
};
