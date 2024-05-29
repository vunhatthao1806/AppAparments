import { Image, ScrollView, Text, View } from "react-native";
import { authAPI, endpoints } from "../../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "react-native-paper";
import { useEffect, useState } from "react";
import Style from "./Style";
import MyStyle from "../../../styles/MyStyle";
import moment from "moment";

const CarcardDetail = ({ route }) => {
  const [carcard, setCarcard] = useState([]);
  const carCardId = route.params?.carCardId;
  const loadCarcard = async () => {
    try {
      let accessToken = await AsyncStorage.getItem("access-token");
      let res = await authAPI(accessToken).get(
        endpoints["carcard-detail"](carCardId)
      );
      setCarcard(res.data);
    } catch (ex) {
      console.error(ex);
    }
  };
  useEffect(() => {
    loadCarcard();
  }, [carCardId]);
  
  return (
    <ScrollView>
      <View style={MyStyle.container}>
        <Text style={Style.titlecarcard}>THÔNG TIN THẺ XE</Text>
        <View>
          <Text style={Style.itemcarcard}>
            Ảnh cavet xe mặt trước, mặt sau:
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Image
              source={{ uri: carcard.image_mrc_m1 }}
              style={Style.imagecarcard}
            />
            <Image
              source={{ uri: carcard.image_mrc_m2 }}
              style={Style.imagecarcard}
            />
          </View>
        </View>
        <View>
          <Text style={Style.itemcarcard}>Ảnh CCCD mặt trước, mặt sau:</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Image
              source={{ uri: carcard.image_idcard_m1 }}
              style={Style.imagecarcard}
            />
            <Image
              source={{ uri: carcard.image_idcard_m2 }}
              style={Style.imagecarcard}
            />
          </View>
        </View>
        <View>
          <Text style={[Style.itemcarcard, { borderBottomWidth: 1 }]}>
            Biển số xe: {carcard.number_plate}
          </Text>
          <Text style={[Style.itemcarcard, { borderBottomWidth: 1 }]}>
            Loại xe: {carcard.type}
          </Text>
          <Text style={[Style.itemcarcard, { borderBottomWidth: 1 }]}>
            Ngày đăng ký thẻ:{" "}
            {moment(carcard.created_date).format("DD/MM/YYYY")}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default CarcardDetail;