import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Session } from "@supabase/supabase-js";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { ProgressBar, MD3Colors } from "react-native-paper";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

import BottomSheet from "../components/Test";
import AnimatedStyleUpdateExample from "../components/Test";
import { supabase } from "../lib/supabase";
import tw from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ProfileScreen({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(0);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const completadas = [
    { lugar: "Centro de entrega #3", xp: 20 },
    { lugar: "Centro de entrega #4", xp: 20 },
    { lugar: "Centro de entrega #3", xp: 20 },
    { lugar: "Centro de entrega #4", xp: 20 },
    { lugar: "Centro de entrega #5", xp: 20 },
    { lugar: "Centro de entrega #3", xp: 20 },
    { lugar: "Centro de entrega #4", xp: 20 },
    { lugar: "Centro de entrega #5", xp: 20 },
    { lugar: "Centro de entrega #5", xp: 20 },
  ];

  const pendientes = [
    {
      lugar: "Centro de entrega #1",
    },
    {
      lugar: "Centro de entrega #2",
    },
    {
      lugar: "Centro de entrega #3",
    },
    {
      lugar: "Centro de entrega #1",
    },
    {
      lugar: "Centro de entrega #2",
    },
    {
      lugar: "Centro de entrega #3",
    },
  ];

  return (
    <View style={tw`relative`}>
      {/* View superior */}
      <View>
        {/* Div rosa, donde esta el label de perfil y el boton de logout */}
        <View style={tw` bg-[#ea2040] h-[50%]`}>
          <View style={tw`flex flex-row items-center justify-center top-12`}>
            <Text style={tw`text-center font-bold text-[24px] text-white`}>
              Perfil
            </Text>
            <TouchableOpacity
              style={tw`right-2 absolute  items-center justify-center`}
              onPress={() => {
                supabase.auth.signOut();
              }}
            >
              <Text
                style={tw`text-center font-semibold text-[16px] text-white mr-2`}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Div donde esta la foto de perfil y el nombre de usuario */}
        <View
          style={{
            position: "absolute",
            top: 70,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              borderColor: "white",
              borderWidth: 5,
            }}
            source={{
              uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            }}
          />
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>
            Victoria Robertson
          </Text>
          <View style={tw`w-[50%] `}>
            <ProgressBar
              // En progress necesitamos hacer un query a la base de datos para obtener el progreso del usuario
              progress={0.5}
              color={"#ea2040"}
              style={{ height: 20, borderRadius: 10 }}
            />
            <Text style={tw`font-thin text-center`}>
              20 puntos para el siguiente nivel
            </Text>
          </View>
        </View>
      </View>

      <View>
        <SegmentedControl
          style={tw`bg-white mx-10 text-red-500`}
          // text color to red on style
          fontStyle={tw`text-black`}
          tabStyle={tw`bg-[#f8fafc]`}
          activeFontStyle={tw`text-[#ea2040]`}
          values={["Completadas", "en revisión"]}
          selectedIndex={selectedIndex}
          onChange={(event) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />
        <ScrollView style={tw`mt-2 mx-5 rounded-md bg-gray-50  h-[20rem]`}>
          {selectedIndex === 0
            ? completadas.map((item) => (
                <View
                  style={tw`flex flex-row items-center mb-1 border-b-[0.5px] border-gray-300`}
                >
                  <View style={tw`bg-gray-200 rounded-full p-0.3 mx-1`}>
                    <MaterialCommunityIcons
                      name="check"
                      size={30}
                      color={"green"}
                    />
                  </View>
                  <View style={tw`w-[90%]`}>
                    <Text style={tw`font-bold`}>+{item.xp} xp</Text>
                    <Text style={tw`font-normal`}>
                      Donacion en {item.lugar} completada con exito!
                    </Text>
                  </View>
                </View>
              ))
            : pendientes.map((item) => (
                <View
                  style={tw`flex flex-row items-center mb-1 py-1 border-b-[0.5px] border-gray-300`}
                >
                  <View style={tw`bg-gray-200 rounded-full p-1 mx-1`}>
                    <MaterialCommunityIcons
                      name="clock"
                      size={30}
                      color={"red"}
                    />
                  </View>
                  <View style={tw`w-[90%]`}>
                    <Text>
                      Espera a que un administrador apruebe tu donación en{" "}
                      <Text style={tw`font-bold`}>{item.lugar}</Text>
                    </Text>
                  </View>
                </View>
              ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default ProfileScreen;
