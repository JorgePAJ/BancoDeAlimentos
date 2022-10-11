import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import tw from "twrnc";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { event } from "react-native-reanimated";


interface iSettingsScreenProps{
  session : Session,
  navigation:any

}

function SendDonation({session, navigation}: iSettingsScreenProps) {
  // Function that sends to Account screen and toggles a BottomSheet
  const handleDonation = () => {
    navigation.navigate("DonationScreen", { SuccessModal: true });
  };

  const addDonation = async (_contentDonation: string) =>{
    const { data, error } = await supabase
      .from('DONATION')
      .insert({ UserWhoDonated: session.user.id, contentDonation: _contentDonation } )
    handleDonation()
  }

  const [donation,setDonation] = useState("")


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
      <Text style={tw`text-3xl font-semibold text-center mt-4`}>Donación</Text>
      <TextInput
        multiline={true}
        style={tw`rounded-lg mt-4 `}
        placeholder="Escribe la lista de articulos que donaras, al igual que la cantidad de cada uno y donde realizaste la donación"
        value={donation} onChange={(event) => {
          setDonation(event.nativeEvent.text)
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity
          style={tw` w-[100%] bg-[#ea2040] items-center py-3 rounded-2xl mb-9 mt-6 `}
          // onPress={  }  TODO: Send donation to database
          onPress={() => {
            addDonation(donation)
          }}
        >
          <Text style={tw`text-white text-xl font-bold`}>Donar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

export default SendDonation;
