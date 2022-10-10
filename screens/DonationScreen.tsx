import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

interface iDonationScreenProps {
  SuccessModal?: boolean;
}

function DonationScreen(
  { navigation, route },
  { SuccessModal }: iDonationScreenProps
) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "25%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    if (route.params?.SuccessModal) {
      handlePresentModalPress();
    }
  }, [route.params?.SuccessModal]);

  const Stack = createNativeStackNavigator();
  return (
    <BottomSheetModalProvider>
      <ScrollView style={tw`mx-4`}>
        <Image
          source={{
            uri: "https://areajugones.sport.es/wp-content/uploads/2021/06/pikachu-pokemon.jpeg",
          }}
          style={tw`w-[90vw] h-[10rem] rounded-lg shadow-lg mt-2`}
        />
        <Text style={tw`font-semibold mt-2 text-2xl`}>
          ¿Que puedo donar?{route.params?.SuccessModal ? "true" : "false"}
        </Text>
        <Text style={tw`mt-4 text-4`}>
          Cupidatat in aliqua cupidatat ex incididunt voluptate proident
          laboris. Esse elit irure velit nulla. Adipisicing eu laboris proident
          excepteur et occaecat duis Lorem anim consectetur. Reprehenderit anim
          nostrud sint proident esse non amet non. Nulla cupidatat pariatur
          tempor labore reprehenderit cupidatat Lorem incididunt irure.
          Consectetur sunt occaecat non irure id cupidatat. Pariatur commodo
          deserunt amet in pariatur ea. Aliqua quis qui tempor excepteur Lorem
          occaecat do anim. Nostrud ipsum officia quis ea ex cillum ipsum sint
          tempor. Commodo duis Lorem ullamco consectetur.
        </Text>
        <Text style={tw`mt-4 text-4`}>
          Voluptate consectetur sint aliqua excepteur sit. Nostrud commodo ad
          excepteur ut id ullamco nulla. Mollit fugiat non irure pariatur anim
          irure deserunt irure ut voluptate ad magna. Incididunt reprehenderit
          do proident consectetur reprehenderit Lorem ex. Non sit cillum amet
          quis magna cupidatat laborum Lorem. Aliqua id cupidatat commodo ad
          Lorem minim sit exercitation aliqua excepteur quis minim irure.
          Deserunt qui incididunt dolor consequat aute excepteur eu duis cillum
          tempor tempor consectetur.
        </Text>
        <Text style={tw`mt-4 text-4`}>
          Voluptate consectetur sint aliqua excepteur sit. Nostrud commodo ad
          excepteur ut id ullamco nulla. Mollit fugiat non irure pariatur anim
          irure deserunt irure ut voluptate ad magna. Incididunt reprehenderit
          do proident consectetur reprehenderit Lorem ex. Non sit cillum amet
          quis magna cupidatat laborum Lorem. Aliqua id cupidatat commodo ad
          Lorem minim sit exercitation aliqua excepteur quis minim irure.
          Deserunt qui incididunt dolor consequat aute excepteur eu duis cillum
          tempor tempor consectetur.
        </Text>

        <TouchableOpacity
          style={tw`w-[100%] bg-pink-400 items-center py-3 rounded-2xl mb-4 mt-6`}
          onPress={() => navigation.push("Enviar")}
        >
          <Text style={tw`text-white text-xl font-bold`}>Donar</Text>
        </TouchableOpacity>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          style={tw`shadow-2xl`}
        >
          <View style={tw`flex justify-center items-center`}>
            <Text style={tw`text-center mb-5 font-bold text-2xl`}>✨Gracias✨</Text>
            <Text style={tw`text-center max-w-[60%] font-light`}>
              Tu donación ha sido enviada, en unos momentos tu solicitud sera
              aprovada por un administrador y recibiras tu xp
            </Text>
          </View>
        </BottomSheetModal>
      </ScrollView>
    </BottomSheetModalProvider>
  );
}

export default DonationScreen;
