import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { authAPI, endpoints } from "../../../../configs/APIs";
import MyStyle from "../../../../styles/MyStyle";
import { Button, Divider, Text } from "react-native-paper";

const CarCardConfirmDetail = ({ route, navigation }) => {
  const [carcardtemp, setCarcardTemp] = useState("");
  const carcardtempid = route.params?.carcardtempid;
  const loadCarcardTemp = async () => {
    try {
      let accessToken = await AsyncStorage.getItem("access-token");
      let res = await authAPI(accessToken).get(
        endpoints["carcardtemp-detail"](carcardtempid)
      );
      setCarcardTemp(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  const confirm = async () => {
    try {
      const newIsActive = carcardtemp.active ? "False" : "True";
      const formData = new FormData();
      formData.append("active", newIsActive);
      let accessToken = await AsyncStorage.getItem("access-token");
      let res = await authAPI(accessToken).patch(
        endpoints["confirm_carcard"](carcardtempid),
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setCarcardTemp((prev) => ({ ...prev, active: !prev.active }));
      Alert.alert("Duyệt thành công!!!");
      navigation.navigate("CarcardConfirm");
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    loadCarcardTemp();
  }, [carcardtempid]);
  return (
    <ScrollView style={MyStyle.container}>
      {carcardtemp && (
        <View style={[{ marginTop: 0 }]}>
          <View>
            <View style={styles.container}>
              <View style={{ marginBottom: 20 }}>
                <Image
                  source={{ uri: carcardtemp.image_mrc_m1 }}
                  style={styles.image}
                />
              </View>
              <View style={{ marginBottom: 20 }}>
                <Image
                  source={{ uri: carcardtemp.image_mrc_m2 }}
                  style={styles.image}
                />
              </View>
              <View>
                <Image
                  source={{ uri: carcardtemp.image_idcard_m1 }}
                  style={styles.image}
                />
              </View>
              <View>
                <Image
                  source={{ uri: carcardtemp.image_idcard_m2 }}
                  style={styles.image}
                />
              </View>
            </View>
            <View
              style={[
                {
                  marginTop: 20,
                  borderColor: "#ddd", // Màu viền
                  borderWidth: 1, // Độ dày viền
                  borderRadius: 5, // Góc bo tròn viền
                  padding: 10, // Khoảng cách bên trong viền
                  // marginBottom: 10,     // Khoảng cách giữa các bình luận
                  backgroundColor: "#fff", // Màu nền
                  marginLeft: 10,
                  marginRight: 15,
                },
              ]}
            >
              <Text style={{ fontSize: 17, fontWeight: "bold", margin: 10 }}>
                Biển số xe: {carcardtemp.number_plate}
              </Text>
              <Divider />
              <Text style={{ fontSize: 17, margin: 10 }}>
                Loại xe: {carcardtemp.type}
              </Text>
              <Divider />
              <Text style={{ fontSize: 17, margin: 10 }}>
                Căn hộ số: {carcardtemp.flat.apartment_number}
              </Text>
              <Divider />
              <Text style={{ fontSize: 17, margin: 10 }}>
                Người đăng ký: {carcardtemp.user.first_name}{" "}
                {carcardtemp.user.last_name}
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Button
              onPress={confirm}
              mode="contained"
              style={{ width: "70%", alignSelf: "center", margin: 10 }}
              buttonColor="#FF8F8F"
              textColor="black"
            >
              Duyệt thẻ
            </Button>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};
export default CarCardConfirmDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
  },
});
