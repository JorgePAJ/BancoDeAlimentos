import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DonationScreen from "./DonationScreen";
import SendDonation from "./SendDonation";

const Stack = createNativeStackNavigator();

const DonationHandler = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DonationScreen" component={DonationScreen} />
      <Stack.Screen name="Enviar" component={SendDonation} />
    </Stack.Navigator>
  );
};

export default DonationHandler;
