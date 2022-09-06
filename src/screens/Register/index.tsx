import { useCallback, useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputControlled } from "../../components/Form/InputControlled";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { useAuth } from "../../context/auth";

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
  title: Yup.string().required("Título é obrigatório"),
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

  const { user } = useAuth();

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
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
    async ({ title, amount }: FormData) => {
      if (!transactionType) return Alert.alert("Selecione o tipo da transação");

      if (category.key === "category")
        return Alert.alert("Selecione a categoria");

      const newTransaction = {
        id: String(uuid.v4()),
        title,
        amount,
        type: transactionType,
        category: category.key,
        date: new Date(),
      };

      try {
        const dataKey = `@gofinance:transaction_user:${user.id}`;
        const storage = await AsyncStorage.getItem(dataKey);
        const currentStorage = storage ? JSON.parse(storage) : [];
        const formattedData = [...currentStorage, newTransaction];
        await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData));

        setTransactionType("");
        setCategory({
          key: "category",
          name: "Categoria",
        });
        reset();

        navigation.navigate("Listagem" as never);
      } catch (error) {
        Alert.alert("Não foi possível salvar");
      }
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
              name="title"
              control={control}
              placeholder="Título"
              autoCapitalize="words"
              autoCorrect={false}
              error={errors.title && errors.title.message}
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
