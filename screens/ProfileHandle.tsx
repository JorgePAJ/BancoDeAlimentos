import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "./ProfileScreen";
import { Session } from "@supabase/supabase-js";
import SettingsScreen from "./Settings";

const Stack = createNativeStackNavigator();
interface iSettingsScreenProps{
  session : Session,
  navigation:any

}

const ProfileHandler = ({session, navigation}: iSettingsScreenProps) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ProfileScreen"
    >
      <Stack.Screen name="ProfileScreen">
        {() => <ProfileScreen session={session} />}
      </Stack.Screen>
      <Stack.Screen name="Settings">
        {()=> <SettingsScreen session={session} navigation={navigation}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProfileHandler;
