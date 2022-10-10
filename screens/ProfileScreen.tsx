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
} from "react-native";
import { ProgressBar, MD3Colors } from "react-native-paper";

import BottomSheet from "../components/Test";
import AnimatedStyleUpdateExample from "../components/Test";
import { supabase } from "../lib/supabase";
import tw from "twrnc";

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

  return (
    <View style={tw`relative`}>
      {/* View superior */}
      <View style={tw`h-[70%]`}>
        {/* Div rosa, donde esta el label de perfil y el boton de logout */}
        <View style={tw` bg-[#ea2040] h-[60%]`}>
          <View style={tw`flex flex-row items-center justify-center top-15`}>
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
            top:70,
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
            <Text style={tw`font-thin text-center`}>20 puntos para el siguiente nivel</Text>
          </View>
        </View>
      </View>

      <View>
        <Text> HGola</Text>
      </View>
    </View>
  );
}

export default ProfileScreen;
