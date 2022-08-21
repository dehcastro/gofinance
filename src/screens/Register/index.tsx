import { useCallback, useState } from "react";
import { Modal } from "react-native";

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";

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
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const transactionTypesSelection = useCallback(
    (type: "income" | "outcome") => {
      setTransactionType(type);
    },
    []
  );

  const handleCloseSelectCatoryModal = useCallback(() => {
    setIsCategoryModalOpen(false);
  }, []);

  const handleOpenSelectCatoryModal = useCallback(() => {
    setIsCategoryModalOpen(true);
  }, []);

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

          <CategorySelectButton
            category={category.name}
            onPress={handleOpenSelectCatoryModal}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={isCategoryModalOpen} animationType="slide">
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCatoryModal}
        />
      </Modal>
    </Container>
  );
};
