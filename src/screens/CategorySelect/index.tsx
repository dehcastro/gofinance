import { useCallback } from "react";
import { FlatList } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Button } from "../../components/Form/Button";
import { categories } from "../../utils/categories";
import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from "./styles";

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export const CategorySelect = ({
  category,
  setCategory,
  closeSelectCategory,
}: Props) => {
  const handleCategorySelect = useCallback((category: Category) => {
    setCategory(category);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Container>
        <Header>
          <Title>Categoria</Title>
        </Header>

        <FlatList
          data={categories}
          style={{ flex: 1, width: "100%" }}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <Category
              onPress={() => handleCategorySelect(item)}
              isActive={category.key === item.key}
            >
              <Icon name={item.icon} />
              <Name>{item.name}</Name>
            </Category>
          )}
          ItemSeparatorComponent={() => <Separator />}
        />

        <Footer>
          <Button title="Selecionar" onPress={closeSelectCategory} />
        </Footer>
      </Container>
    </GestureHandlerRootView>
  );
};
