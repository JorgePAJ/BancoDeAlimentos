import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Session } from "@supabase/supabase-js";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import BottomSheet from "../components/Test";
import AnimatedStyleUpdateExample from "../components/Test";
import { supabase } from "../lib/supabase";

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
    <BottomSheetModalProvider>
      <View>
        <Text>ProfileScreen</Text>
        <Button
          title="Log out"
          onPress={() => {
            supabase.auth.signOut();
          }}
        />
        <View>
          <Button
            onPress={handlePresentModalPress}
            title="Present Modal"
            color="black"
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <View>
              <Text>Awesome 🎉</Text>
            </View>
          </BottomSheetModal>
        </View>
      </View>
    </BottomSheetModalProvider>
  );
}

export default ProfileScreen;
