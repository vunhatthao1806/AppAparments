import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import MyStyle from "../../../styles/MyStyle";
// import Styles from "../Styles";
import { Avatar, IconButton, Searchbar } from "react-native-paper";
import MyStyle from "../../../styles/MyStyle";
import Styles from "../../profiles/Styles";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../../configs/APIs";

const Services = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState('');

  const loadCurrentUser = async () => {
    try {
        let accessToken = await AsyncStorage.getItem("access-token");
        let res = await authAPI(accessToken).get(endpoints["current_user"]);
        setUserInfo(res.data);
    } catch(ex){
        console.error(ex);
    }
  };

  useEffect(() => {
    loadCurrentUser();
  },[])

  return (
    <View style={MyStyle.container}>
      <ScrollView>
        <ImageBackground style={Styles.image} source={require("./home.jpg")}>
          <View>
            <Searchbar
              style={Styles.searchbar}
              placeholder="Tìm kiếm"
              iconColor="white"
              placeholderTextColor="white"
              color="white"
            />
          </View>
          <View>
            <Avatar.Image
              style={Styles.avatarconvenient}
              source={{ uri: userInfo.avatar } }
              size={130}
            />
          </View>
        </ImageBackground>
        <View>
          <Text style={[Styles.subject, { marginTop: 80 }, { marginLeft: 10 }]}>
            Dịch vụ
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <View style={Styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate("SurveyCreate")}>
              <View style={{ alignItems: "center" }}>
                <IconButton
                  icon="playlist-edit"
                  size={50}
                  iconColor="rgba(60,32,22,0.8)"
                />
                <Text
                  style={{
                    textAlign: "center",
                    color: "#212121",
                    fontSize: 20,
                  }}
                >
                  Khảo sát
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("ItemCreate")}>
              <View style={{ alignItems: "center" }}>
                <IconButton
                  icon="gift-outline"
                  size={50}
                  iconColor="rgba(60,32,22,0.8)"
                />
                <Text
                  style={{
                    textAlign: "center",
                    color: "#212121",
                    fontSize: 20,
                  }}
                >
                  Hàng đã gửi
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={Styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate("Carcard")}>
              <View style={{ alignItems: "center" }}>
                <IconButton
                  icon="account-details"
                  size={50}
                  iconColor="rgba(60,32,22,0.8)"
                />
                <Text
                  style={{
                    textAlign: "center",
                    color: "#212121",
                    fontSize: 20,
                  }}
                >
                  Cư dân
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CarCardRegister")}>
              <View style={{ alignItems: "center" }}>
                <IconButton
                  icon="account-details"
                  size={50}
                  iconColor="rgba(60,32,22,0.8)"
                />
                <Text
                  style={{
                    textAlign: "center",
                    color: "#212121",
                    fontSize: 20,
                  }}
                >
                  Card
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          
        </View>
      </ScrollView>
    </View>
  );
};
export default Services;