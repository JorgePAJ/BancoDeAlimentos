import "react-native-url-polyfill/auto";
import "react-native-get-random-values";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { supabase } from "./lib/supabase";
import { Session } from "@supabase/supabase-js";
import Auth from "./screens/Auth";
import AccountScreen from "./screens/Account";

export default function App() {
  const [imageSwitch, setImageSwitch] = React.useState(false);
  const Stack = createNativeStackNavigator();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NavigationContainer>
      {session && session.user ? (
        <AccountScreen key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </NavigationContainer>
  );
}
