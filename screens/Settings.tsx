import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { event } from "react-native-reanimated";
import tw from "twrnc";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";


interface iSettingsScreenProps{
  session : Session,
  navigation:any

}

function SettingsScreen({session, navigation}: iSettingsScreenProps) {
  // Function that sends to Account screen and toggles a BottomSheet
  const handleSave = () => {
    navigation.navigate("ProfileScreen");
  };

  const addUserName = async (_userName:string, _userLastname: string) =>{
    const { data, error } = await supabase
      .from('USER')
      .update({ userName: _userName, userLastname: _userLastname } )
      .eq('userId', session.user.id)
    handleSave()
  }
  
  const [name,setName] = useState("")
  const [lastname,setLastame] = useState("")


  return (
    <View
      style={{
        height: 100,
        position: "relative",
        flex: 1,
        marginHorizontal: 4,
        marginTop: 30,
      }}
    >
      <Text style={tw`text-3xl font-semibold text-center mt-4`}>Ajustes</Text>
      <Text style={tw`font-bold text-[24px] mt-3`}>Nombre</Text>
      <TextInput placeholder="Jorge" style={tw`border p-1 rounded-md `} value={name} onChange={(event) => {
        setName(event.nativeEvent.text)
      }} />

      <Text style={tw`font-bold text-[24px] mt-3`}>Apellido</Text>
      <TextInput placeholder="Plasencia" style={tw`border p-1 rounded-md `} value={lastname} onChange={(event) => {
        setLastame(event.nativeEvent.text)
      }} />

      <KeyboardAvoidingView
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity
          style={tw` w-[100%] bg-[#ea2040] items-center py-3 rounded-2xl mb-9 mt-6 `}
          // onPress={  }  TODO: Send donation to database
          onPress={()=>{
            addUserName(name,lastname)
          }}
        >
          <Text style={tw`text-white text-xl font-bold`}>Guardar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

export default SettingsScreen;
