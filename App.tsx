import React from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function App() {
  const [imageSwitch, setImageSwitch] = React.useState(false);
  return (
    <View
      style={tw`flex flex-col h-[100%] w-[100%] bg-blue-300 items-center text-center  justify-center`}
    >
      <Image
        source={{
          uri: `${
            imageSwitch
              ? "https://i.ibb.co/k0hKzkr/pixels.png"
              : "https://i.ibb.co/CmBkwQH/otronftqmeratie.png"
          }`,
        }}
        style={tw.style("rounded-full mb-[5rem]", { width: 200, height: 200 })}
      />
      <Text style={tw`text-white font-bold text-[40px]`}>Hola mundo!</Text>
      <Text style={tw`text-gray-900 font-thin mb-4`}>
        Puro React Native gang
      </Text>
      <TouchableOpacity
        onPress={() => setImageSwitch(!imageSwitch)}
        style={tw.style("rounded-3xl bg-blue-200 px-4 py-2 ")}
      >
        <Text style={tw.style("text-xl font-bold text-white")}>Press me!</Text>
      </TouchableOpacity>
    </View>
  );
}
