import { useCallback, useState } from "react";
import { Modal } from "react-native";
import { useForm } from "react-hook-form";

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputControlled } from "../../components/Form/InputControlled";
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

interface FormData {
  name: string;
  amount: string;
}

export const Register = () => {
  const [transactionType, setTransactionType] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const { control, handleSubmit } = useForm();

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

  const handleRegister = useCallback(({ name, amount }: FormData) => {
    const data = {
      name,
      amount,
      transactionType,
      category: category.key,
    };
    console.log(data);
  }, []);

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputControlled name="name" control={control} placeholder="Nome" />

          <InputControlled
            name="amount"
            control={control}
            placeholder="Preço"
          />

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

        <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
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
