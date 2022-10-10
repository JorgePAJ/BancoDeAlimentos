import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
      navigation.setParams({ SuccessModal: false });
    }
  }, [route.params?.SuccessModal]);

  const noPerecederos = [
    "Atun enlatado",
    "Garbanzo",
    "Sopa enlatada",
    "Pasta enlatada",
    "Verdura",
    "Aceitunas envasadas",
    "Salsas en lata",
    "Legumbres",
    "Arroz",
    "Pasta cruda",
    "Harina",
    "Azucar",
    "Sal",
    "Cafe",
    "Leche en polvo",
    "Mermelada",
    "Miel",
  ];

  const condiciones = [
    "El origen debe ser conocido y provenga de empresas o establecimientos autorizados",
    "El envase deve estar íntegro y no deteriorado",
    "Deben estar correctamente identificados y etiquetados",
    "La fecha de caducidad no debe estar rebasada",
    "Deben haber sido conservados a lo largo de toda su vida útil a la temperatura adecuada indicada en el envase",
    "Si no están envasados y son productos refrigerados o congelados, se mantendrán a las temperaturas establecidas por la normativa vigente",
  ];

  const notRecomended = [
    "Comidas preparadas que hayan estado expuestas al público",
    "Comidas preparadas de consumo en crudo.",
    "Productos elaborados con huevo fresco y cremas no pasteurizadas",
    "Quesos frescos no pasteurizados",
    "Pescado y marisco fresco",
  ];

  const notSafe = [
    "Carne y derivados no envasados, así como despojos",
    "Comidas preparadas no envasadas",
    "Comidas preparadas elaboradas en caliente",
  ];

  const Stack = createNativeStackNavigator();
  return (
    <BottomSheetModalProvider>
      <ScrollView style={tw`mx-4 mt-10`}>
        <Image
          source={{
            uri: "https://i.ibb.co/rdQXLYR/bamx-banner.png",
          }}
          style={tw`w-[90vw] h-[10rem] rounded-lg shadow-lg mt-2`}
        />
        <Text style={tw`font-bold mt-2 text-2xl`}>¿Que puedo donar?</Text>
        <Text style={tw`font-semibold text-md mt-2 text-4.5`}>
          Donaciones en especie:
        </Text>
        <Text style={tw`mt-1 text-3.5`}>
          Entre estos alimentos se recomienda donar frutas y verduras{` `}
          <Text style={tw`font-semibold`}>
            enteras, frescas y en buen estado.
          </Text>
        </Text>
        <Text style={tw`font-semibold text-md mt-2 text-4.5`}>
          Alimentos no perecederos:
        </Text>
        <Text style={tw`mt-1 text-3.5`}>
          ¿Qué alimentos no perecederos suelen ser los más comunes?{` `}
          <Text style={tw`font-semibold`}>
            Todos aquellos que estén enlatados, en plástico o en cartón:
          </Text>
        </Text>
        <View style={tw`mt-1`}>
          {noPerecederos.map((item, index) => (
            <Text style={tw`mt-1 text-3.5 font-thin`} key={index}>
              {">"} <Text style={tw`font-semibold`}>{item}</Text>
            </Text>
          ))}
        </View>
        <Text style={tw`font-bold text-md mt-2 text-4.5`}>
          Condiciones de los alimentos:
        </Text>
        <View style={tw`mt-1`}>
          {condiciones.map((item, index) => (
            <Text style={tw`mt-1 text-3.5 font-thin`} key={index}>
              {">"} <Text style={tw`font-semibold`}>{item}</Text>
            </Text>
          ))}
        </View>
        <Text style={tw`font-bold text-md mt-2 text-4.5`}>
          No se recomienda donar:
        </Text>
        <View style={tw`mt-1`}>
          {notRecomended.map((item, index) => (
            <Text style={tw`mt-1 text-3.5 font-thin`} key={index}>
              {">"} <Text style={tw`font-semibold`}>{item}</Text>
            </Text>
          ))}
        </View>
        <Text style={tw`font-bold text-md mt-2 text-4.5`}>
          Si no es posible mantener las temperaturas recomendadas, no es seguro
          donar:
        </Text>
        <View style={tw`mt-1`}>
          {notSafe.map((item, index) => (
            <Text style={tw`mt-1 text-3.5 font-thin`} key={index}>
              {">"} <Text style={tw`font-semibold`}>{item}</Text>
            </Text>
          ))}
        </View>

        <TouchableOpacity
          style={tw`w-[100%] bg-[#ea2040] items-center py-3 rounded-2xl mb-4 mt-6`}
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
            <Text style={tw`text-center mb-5 font-bold text-2xl`}>
              ✨Gracias✨
            </Text>
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
