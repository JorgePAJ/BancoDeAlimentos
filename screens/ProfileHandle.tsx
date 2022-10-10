import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "./ProfileScreen";
import Settings from "./Settings";
import { Session } from "@supabase/supabase-js";

const Stack = createNativeStackNavigator();

const ProfileHandler = ({ session }: { session: Session }) => {
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
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default ProfileHandler;
