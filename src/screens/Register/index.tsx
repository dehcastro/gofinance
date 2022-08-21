import { useCallback, useEffect, useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
  [key: string]: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("O valor não pode ser negativo")
    .required("Preço é obrigatório"),
});

export const Register = () => {
  const [transactionType, setTransactionType] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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

  const handleRegister = useCallback(
    ({ name, amount }: FormData) => {
      if (!transactionType) return Alert.alert("Selecione o tipo da transação");

      if (category.key === "category")
        return Alert.alert("Selecione a categoria");

      const data = {
        name,
        amount,
        transactionType,
        category: category.key,
      };

      console.log(data);
    },
    [transactionType, category]
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputControlled
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="words"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputControlled
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
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
    </TouchableWithoutFeedback>
  );
};
