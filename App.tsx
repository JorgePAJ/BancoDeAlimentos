import React from "react";
import { Text, View } from "react-native";
import tw from "twrnc";

export default function App() {
  return (
    <View style={tw`flex-1 bg-white items-center justify-center items-center`}>
      <View
        style={tw`bg-blue-300 flex items-center py-[8px] rounded-md w-[90%] hover:bg-pink-400`}
      >
        <Text style={tw`text-pink-400 font-bold text-2xl`}>
          Que pedo perros
        </Text>
      </View>
    </View>
  );
}
