import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input } from "@rneui/base";

import { Session } from "@supabase/supabase-js";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DonationScreen from "./DonationScreen";
import ProfileScreen from "./ProfileScreen";
import DonationHandler from "./DonationHandler";
import ProfileHandler from "./ProfileHandle";

interface iSettingsScreenProps{
  session : Session,
  navigation:any

}

export default function AccountScreen(
{session,navigation}: iSettingsScreenProps
) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const Tab = createBottomTabNavigator();

  // const [id, setID] = useState([]);

  useEffect(() => {
    sendId(session.user.id);
    // isRegistered()
    // console.log(id)
    // console.log(id[0].userId)
  }, []);

  // async function isRegistered() {
  //   let { data: USER, error } = await supabase
  //   .from('USER')
  //   .select('userId')
  //   .eq('userId', session.user.id)
  //   setID(USER)
  // }
  
  async function sendId(id:String) {
    //console.log("insert")
  const { data, error } = await supabase
  .from('USER')
  .insert([
    { userId: id },
  ])
  //if(error) console.log(error.message)
  }


  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Tab.Navigator
    
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ea2040",
      }}
    >
      <Tab.Screen
      
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        name="Perfil"
      >
        {() => <ProfileHandler session={session} navigation={navigation}/>}
      </Tab.Screen>
      <Tab.Screen
        name="Donaciones"
        options={{
          tabBarLabel: "Donar",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="heart" size={size} color={color} />
          ),
        }}
      >
        {()=><DonationHandler session={session} navigation={navigation}/>}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
