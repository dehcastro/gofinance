import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { Summary } from "../screens/Summary";

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          height: 88,
          paddingHorizontal: 20,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
        },
        tabBarAllowFontScaling: true,
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
              style={{ marginRight: 0 }}
            />
          ),
          tabBarLabelStyle: {
            fontFamily: theme.fonts.regular,
            fontSize: RFValue(12),
          },
        }}
      />

      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          ),
          tabBarLabelStyle: {
            fontFamily: theme.fonts.regular,
            fontSize: RFValue(12),
            marginLeft: RFValue(10),
          },
        }}
      />

      <Screen
        name="Resumo"
        component={Summary}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="pie-chart"
              size={size}
              color={color}
              style={{ marginRight: 0 }}
            />
          ),
          tabBarLabelStyle: {
            fontFamily: theme.fonts.regular,
            fontSize: RFValue(12),
          },
        }}
      />
    </Navigator>
  );
};
