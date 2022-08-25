import React from "react";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig.js";

function RegisterScreen({ navigation: { goBack } }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert("User created");
        const user = userCredential.user;
        goBack();
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  return (
    <View style={tw.style("w-100% h-100% flex justify-center items-center")}>
      <TextInput
        placeholder="ejemplo@email.com"
        placeholderTextColor="gray"
        style={tw`border border-gray-500 text-black w-[80%] text-center py-3 rounded-md mb-2`}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <TextInput
        placeholderTextColor="gray"
        style={tw`border border-gray-500 mb-[32px] text-black w-[80%] text-center py-3 rounded-md`}
        onChangeText={(text) => {
          setPassword(text);
        }}
        placeholder="Contraseña"
      />
      <TouchableOpacity
        onPress={handleRegister}
        style={tw`bg-blue-300 w-[80%] items-center py-3 rounded-lg`}
      >
        <Text style={tw`text-white font-bold text-xl`}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RegisterScreen;
