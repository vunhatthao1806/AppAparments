import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import MyStyle from "../../../styles/MyStyle";
import Styles from "../Styles";
import { Avatar, IconButton, Searchbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../../configs/APIs";
import { useEffect, useState } from "react";

const Convenient = ({ navigation }) => {

  const [user, setUser] = useState('');

  const loadCurrentUser = async () => {
      try {
          let accessToken = await AsyncStorage.getItem("access-token");
          let res = await authAPI(accessToken).get(endpoints["current_user"]);
          setUser(res.data);

      } catch(ex){
          console.error(ex);
      }
  };

  useEffect(() => {
    loadCurrentUser();
}, []);

  return (
    <View style={MyStyle.container}>
      <ScrollView>
        <ImageBackground style={Styles.image} source={require("./home.jpg")}>
          <View>
            <Avatar.Image
              style={Styles.avatarconvenient}
              source={{ uri: user.avatar } }
              size={130}
            />
          </View>
        </ImageBackground>
        <View>
          <Text style={[Styles.subject, { marginTop: 80 }, { marginLeft: 10 }]}>
            Dịch vụ & Tiện ích
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <View style={Styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
              <View style={{ alignItems: "center" }}>
                <IconButton
                  icon="receipt"
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
                  Thanh toán
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Cabinet")}>
              <View style={{ alignItems: "center" }}>
                <IconButton
                  icon="file-cabinet"
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
                  Tủ đồ điện tử
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={Styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate("Carcard")}>
              <View style={{ alignItems: "center" }}>
                <IconButton
                  icon="car"
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
                  Thẻ xe
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Convenient;