import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import Auth from "./Auth";

function DonationScreen({ navigation }) {
  const Stack = createNativeStackNavigator();
  return (
    <ScrollView style={tw`mx-4`}>
      <Image
        source={{
          uri: "https://areajugones.sport.es/wp-content/uploads/2021/06/pikachu-pokemon.jpeg",
        }}
        style={tw`w-[90vw] h-[10rem] rounded-lg shadow-lg mt-2`}
      />
      <Text style={tw`font-semibold mt-2 text-2xl`}>¿Que puedo donar?</Text>
      <Text style={tw`mt-4 text-4`}>
        Cupidatat in aliqua cupidatat ex incididunt voluptate proident laboris.
        Esse elit irure velit nulla. Adipisicing eu laboris proident excepteur
        et occaecat duis Lorem anim consectetur. Reprehenderit anim nostrud sint
        proident esse non amet non. Nulla cupidatat pariatur tempor labore
        reprehenderit cupidatat Lorem incididunt irure. Consectetur sunt
        occaecat non irure id cupidatat. Pariatur commodo deserunt amet in
        pariatur ea. Aliqua quis qui tempor excepteur Lorem occaecat do anim.
        Nostrud ipsum officia quis ea ex cillum ipsum sint tempor. Commodo duis
        Lorem ullamco consectetur.
      </Text>
      <Text style={tw`mt-4 text-4`}>
        Voluptate consectetur sint aliqua excepteur sit. Nostrud commodo ad
        excepteur ut id ullamco nulla. Mollit fugiat non irure pariatur anim
        irure deserunt irure ut voluptate ad magna. Incididunt reprehenderit do
        proident consectetur reprehenderit Lorem ex. Non sit cillum amet quis
        magna cupidatat laborum Lorem. Aliqua id cupidatat commodo ad Lorem
        minim sit exercitation aliqua excepteur quis minim irure. Deserunt qui
        incididunt dolor consequat aute excepteur eu duis cillum tempor tempor
        consectetur.
      </Text>
      <Text style={tw`mt-4 text-4`}>
        Voluptate consectetur sint aliqua excepteur sit. Nostrud commodo ad
        excepteur ut id ullamco nulla. Mollit fugiat non irure pariatur anim
        irure deserunt irure ut voluptate ad magna. Incididunt reprehenderit do
        proident consectetur reprehenderit Lorem ex. Non sit cillum amet quis
        magna cupidatat laborum Lorem. Aliqua id cupidatat commodo ad Lorem
        minim sit exercitation aliqua excepteur quis minim irure. Deserunt qui
        incididunt dolor consequat aute excepteur eu duis cillum tempor tempor
        consectetur.
      </Text>

      <TouchableOpacity
        style={tw`w-[100%] bg-pink-400 items-center py-3 rounded-2xl mb-4 mt-6`}
        onPress={() => navigation.navigate("Enviar donación")}
        
      >
        <Text style={tw`text-white text-xl font-bold`}>Donar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default DonationScreen;
