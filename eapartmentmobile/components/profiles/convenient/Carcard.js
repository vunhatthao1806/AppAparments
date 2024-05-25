import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { authAPI, endpoints } from "../../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Styles from "../Styles";
import Style from "../../profiles/convenient/Style";
import { Icon, List } from "react-native-paper";
import moment from "moment";

const Carcard = ({ navigation }) => {
  const [carcard, setCarcard] = useState([]);
  const loadCarcard = async () => {
    try {
      accessToken = await AsyncStorage.getItem("access-token");
      let res = await authAPI(accessToken).get(endpoints["carcards"]);
      setCarcard(res.data);
    } catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    loadCarcard();
  }, []);

  return (
    <ScrollView>
      {carcard.map((c) => (
        <View style={Style.ecabinetStyle}>
          <TouchableOpacity key={c.id} onPress={() => navigation.navigate('CarCardDetail', {'carCardId': c.id})} >
            <List.Item
              key={c.id}
              title={c.number_plate}
              description={c.type}
              left={() => (
                <Image
                  style={Styles.imageEca}
                  source={{ uri: c.image_mrc_m1 }}
                />
              )}
            />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={() => navigation.navigate("CarcardRegister")}>
        <View style={Style.ecabinetStyle}>
          <List.Item
            title="Đăng ký thẻ xe mới"
            left={() => <Icon source={"plus-circle"} size={70} />}
          />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default Carcard;
