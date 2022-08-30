import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import DonationScreen from "./DonationScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Donaciones 🍲"
        component={DonationScreen}
        options={{
          tabBarLabel: "Donar",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        name="Perfil 👤"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

export default MainScreen;
