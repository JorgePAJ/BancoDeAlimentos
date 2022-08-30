import React from "react";
import { View, Text, Button } from "react-native";
import { supabase } from "../lib/supabase";

function ProfileScreen() {
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
