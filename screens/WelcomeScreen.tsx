import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

function WelcomeScreen({ navigation }) {
  return (
    <View
      style={tw`h-[100%] w-[100%] flex flex-col items-center justify-center`}
    >
      <Text style={tw` text-5xl font-bold mb-50`}>Hola mundo!</Text>
      <TouchableOpacity
        style={tw`w-[66%] bg-pink-400 items-center py-3 rounded-2xl mb-4`}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={tw`text-white text-xl font-bold`}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`w-[66%] bg-pink-300 items-center py-3 rounded-2xl`}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={tw`text-white text-xl font-bold`}>Registro</Text>
      </TouchableOpacity>
    </View>
  );
}

export default WelcomeScreen;
