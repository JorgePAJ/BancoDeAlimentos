import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";

function SendDonation({ navigation }) {
  // Function that sends to Account screen and toggles a BottomSheet
  const handleDonation = () => {
    navigation.navigate("DonationScreen", { SuccessModal: true });
  };

  return (
    <View style={tw`mx-4 h-[100%]`}>
      <Text style={tw`text-3xl font-semibold text-center mt-4`}>Donación</Text>
      <TextInput
        multiline={true}
        style={tw`rounded-lg mt-4 mb-60`}
        placeholder="Escribe la lista de articulos que donaras, al igual que la cantidad de cada uno"
      />
      <TouchableOpacity
        style={tw`absolute bottom-0 w-[100%] bg-pink-400 items-center py-3 rounded-2xl mb-4 mt-6 `}
        // onPress={  }  TODO: Send donation to database
        onPress={handleDonation}
      >
        <Text style={tw`text-white text-xl font-bold`}>Donar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SendDonation;
