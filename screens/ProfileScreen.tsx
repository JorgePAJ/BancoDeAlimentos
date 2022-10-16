import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Session } from "@supabase/supabase-js";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { ProgressBar, MD3Colors } from "react-native-paper";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import BottomSheet from "../components/Test";
import AnimatedStyleUpdateExample from "../components/Test";
import { supabase } from "../lib/supabase";
import tw from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function ProfileScreen({ session }: { session: Session }) {
  const Navigator = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [localLevel, setLocalLevel] = useState(0);
  const [localRest, setLocalRest] = useState(0);
  const [localXp, setLocalXp] = useState(0);

  const [user, setUser] = useState([]);
  const [unapproveDonations, setUnapproveDonations] = useState([]);
  const [approveDonations, setApproveDonations] = useState([]);
  const [donationXp, setDonationXp] = useState();

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

  //
  const pullMe = () => {
    setRefreshing(true);
    readUser();
    readUnapprovedDonations();
    readApprovedDonations();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const levelValues = (xp: number) => {
    let lvl = 0;
    let userXp = 0;
    let restante = 0;
    let res = 0;
    lvl = Math.round(xp / 120);
    userXp = xp / 100;
    res = userXp - Math.floor(userXp);
    restante = xp % 100;
    setLocalXp(res);
    setLocalRest(100 - restante);
    setLocalLevel(lvl);
  };

  const readUnapprovedDonations = async () => {
    let { data: DONATION, error } = await supabase
      .from("DONATION")
      .select("*")
      .match({ UserWhoDonated: session.user.id, donationStatus: false });
    setUnapproveDonations(DONATION);
  };

  const readApprovedDonations = async () => {
    let { data: DONATION, error } = await supabase
      .from("DONATION")
      .select("*")
      .match({ UserWhoDonated: session.user.id, donationStatus: true });
    setApproveDonations(DONATION);
    var xp: number;
    for (let index = 0; index < approveDonations.length; index++) {
      xp += approveDonations[index].cantExp;
      console.log(approveDonations[index].cantExp);
    }
    //setDonationXp(xp)
  };

  const readUser = async () => {
    let { data: USER, error } = await supabase
      .from("USER")
      .select("*")
      .eq("userId", session.user.id);
    setUser(USER);
    {
      !user[0]?.isAdmin && levelValues(user[0].userXp);
    }
  };

  useEffect(() => {
    readUser();
    readUnapprovedDonations();
    readApprovedDonations();
  }, []);

  const donacionesTest = [
    {
      donationId: 1,
      contentDonation:
        "Donacion de prueba y muchas coiasas divert idasdn asdas",
      cantExp: 10,
      donationStatus: false,
      UserWhoDonated: "93418ef0-6664-409c-a1e0-301381454636",
    },
    {
      donationId: 1,
      contentDonation: "Donacion de prueba",
      cantExp: 10,
      donationStatus: false,
      UserWhoDonated: "93418ef0-6664-409c-a1e0-301381454636",
    },
    {
      donationId: 1,
      contentDonation: "Donacion de prueba",
      cantExp: 10,
      donationStatus: false,
      UserWhoDonated: "93418ef0-6664-409c-a1e0-301381454636",
    },
    {
      donationId: 1,
      contentDonation: "Donacion de prueba",
      cantExp: 10,
      donationStatus: false,
      UserWhoDonated: "93418ef0-6664-409c-a1e0-301381454636",
    },
    {
      donationId: 1,
      contentDonation: "Donacion de prueba",
      cantExp: 10,
      donationStatus: false,
      UserWhoDonated: "93418ef0-6664-409c-a1e0-301381454636",
    },
    {
      donationId: 1,
      contentDonation: "Donacion de prueba",
      cantExp: 10,
      donationStatus: false,
      UserWhoDonated: "93418ef0-6664-409c-a1e0-301381454636",
    },
  ];

  return (
    <View style={tw`relative`}>
      {/* View superior */}
      <View>
        {/* Div rosa, donde esta el label de perfil y el boton de logout */}
        <View style={tw` bg-[#ea2040] h-[50%]`}>
          <View style={tw`flex flex-row items-center justify-center top-12`}>
            <TouchableOpacity
              style={tw`left-2 absolute  items-center justify-center`}
              onPress={() => {
                Navigator.navigate("Settings", { session });
              }}
            >
              <MaterialCommunityIcons name="cog" size={30} color={"white"} />
            </TouchableOpacity>
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
          {/* checar que rollo */}
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>
            {user[0]?.userName + " " + user[0]?.userLastname}
          </Text>
          {user[0]?.isAdmin ? (
            <Text>Donaciones pendientes</Text>
          ) : (
            <View style={tw`w-[50%] `}>
              <ProgressBar
                // En progress necesitamos hacer un query a la base de datos para obtener el progreso del usuario
                progress={localXp}
                color={"#ea2040"}
                style={{ height: 20, borderRadius: 10 }}
              />
              <Text style={tw`font-thin text-center`}>
                {localRest} puntos para el nivel {localLevel + 1}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View>
        {!user[0]?.isAdmin && (
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
        )}

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={pullMe} />
          }
          style={tw`mt-2 mx-5 rounded-md bg-gray-50  h-[20rem]`}
        >
          {user[0]?.isAdmin ? (
            donacionesTest.map((donation, key) => (
              <View
                key={key}
                style={tw`flex  flex-row items-center mb-1 border-b-[0.5px] border-gray-300`}
              >
                <View style={tw`w-[100%]`}>
                  <Text style={tw`ml-1 font-bold`}>
                    {donation.UserWhoDonated}
                  </Text>
                  <View
                    style={tw`flex flex flex-row justify-around  w-[100%] items-center`}
                  >
                    <Text
                      numberOfLines={3}
                      style={tw`font-normal flex w-[60%] my-1`}
                    >
                      {donation.contentDonation}
                    </Text>
                    <View style={tw`flex flex-row `}>
                      <TouchableOpacity onPress={()=>{}}>
                        <MaterialCommunityIcons
                          name="check"
                          size={30}
                          color={"green"}
                          style={tw`mr-2`}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{}}>
                        <MaterialCommunityIcons
                          name="close"
                          size={30}
                          color={"red"}
                        />
                      </TouchableOpacity >
                    </View>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <>
              {selectedIndex === 0
                ? approveDonations.map((item, key) => (
                    <View
                      key={key}
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
                        <Text style={tw`font-bold`}>+{item.cantExp} xp</Text>
                        <Text style={tw`font-normal`}>
                          Donacion en completada con exito!
                        </Text>
                        <Text> Alimentos donados: {item.contentDonation}</Text>
                      </View>
                    </View>
                  ))
                : unapproveDonations.map((item, key) => (
                    <View
                      key={key}
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
                          Espera a que un administrador apruebe tu donación
                        </Text>
                      </View>
                    </View>
                  ))}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

export default ProfileScreen;
