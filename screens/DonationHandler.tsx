import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DonationScreen from "./DonationScreen";
import SendDonation from "./SendDonation";
import { Session } from "@supabase/supabase-js";

const Stack = createNativeStackNavigator();


interface iSettingsScreenProps{
  session : Session,
  navigation:any

}

const DonationHandler = ({session,navigation}: iSettingsScreenProps) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DonationScreen" component={DonationScreen} />
      <Stack.Screen name="Enviar" >
        {()=><SendDonation session={session} navigation={navigation}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default DonationHandler;
