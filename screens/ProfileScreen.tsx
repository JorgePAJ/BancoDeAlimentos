import { Session } from "@supabase/supabase-js";
import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { supabase } from "../lib/supabase";

function ProfileScreen({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);

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
    <View>
      <Text>ProfileScreen</Text>
      <Button
        title="Log out"
        onPress={() => {
          supabase.auth.signOut();
        }}
      />
    </View>
  );
}

export default ProfileScreen;
