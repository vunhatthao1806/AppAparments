import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Icon, TextInput } from "react-native-paper";
import MyStyle from "../../../styles/MyStyle";
import Styles from "../Styles";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../../configs/APIs";

const CarcardRegister = ({ navigation }) => {
  const [type, setType] = useState(false);
  const [number_plate, setNumber_plate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [carcard, setCarcard] = useState([]);
  const [page, setPage] = useState(1);

  const [images, setImages] = useState({
    image_mrc_m1: null,
    image_mrc_m2: null,
    image_idcard_m1: null,
    image_idcard_m2: null,
  });
  const updateState = (field, value) => {
    if (field === "type") {
      setType(value);
    } else if (field === "number_plate") {
      setNumber_plate(value);
    }
  };
  const fields = [
    {
      label: "Loại xe",
      name: "type",
    },
    {
      label: "Biển số xe",
      name: "number_plate",
    },
  ];

  const Register = async () => {
    setLoading(true);
    try {
      // Tạo dữ liệu form
      const formData = new FormData();
      formData.append("type", type);
      formData.append("number_plate", number_plate);
      console.log(formData);
      for (const key in images) {
        if (images[key]) {
          const filename = images[key].uri.split("/").pop();
          const match = /\.(\w+)$/.exec(filename);
          const fileType = match ? `image/${match[1]}` : `image`;
          formData.append(key, {
            uri: images[key].uri,
            type: fileType,
            name: filename,
          });
        }
      }
      console.log(formData);

      // Gửi dữ liệu form lên server
      let accessToken = await AsyncStorage.getItem("access-token");
      let res = await authAPI(accessToken).post(
        endpoints["carcardtemp"],
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Xử lý kết quả trả về từ server
      Alert.alert(
        "Thông báo",
        "Ban quản lý đã tiếp nhận thông tin, vui lòng chờ đến khi thẻ xe đc xét duyệt!!!"
      );
      navigation.navigate("Carcard");
    } catch (error) {
      // Xử lý lỗi
      console.error(error);
      Alert.alert("Thông báo", "Đã xảy ra lỗi, vui lòng thử lại sau!!!");
    } finally {
      setLoading(false);
    }
  };
  const chooseImage = async (key) => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Từ chối quyền truy cập");
    } else {
      let res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled) {
        const image = res.assets[0];
        setImages((prevImages) => ({
          ...prevImages,
          [key]: image,
        }));
      }
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* <Image
            style={Styles.imageOnTop}
            source={require("../../users/apartment.webp")}
          /> */}
        <View style={Styles.input}>
          {fields.map((f) => (
            <TextInput
              value={f.name === "type" ? type : number_plate}
              onChangeText={(t) => updateState(f.name, t)}
              key={f.label}
              label={
                <Text style={{ color: "#CCCCCC", fontSize: 20 }}>
                  {f.label}
                </Text>
              }
              style={{ marginTop: 10, borderRadius: 50 }}
              placeholderTextColor="white"
              textColor="black"
              cursorColor="black"
              underlineStyle={{ backgroundColor: "rgba(60,32,22,0.8)" }}
              backgroundColor="rgba(60,32,22,0.5)"
            />
          ))}
          <ScrollView>
            {Object.entries(images).map(([key, value]) => (
              <View
                key={key}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 10,
                }}
              >
                <Text style={{ fontSize: 20 }}>
                  {key === "image_mrc_m1"
                    ? "Cavet mặt trước: "
                    : key === "image_mrc_m2"
                    ? "Cavet mặt sau: "
                    : key === "image_idcard_m1"
                    ? "CCCD mặt trước: "
                    : "CCCD mặt sau: "}
                </Text>
                <TouchableOpacity onPress={() => chooseImage(key)}>
                  <Icon source={"plus-box"} size={30} />
                </TouchableOpacity>
                {value && (
                  <Image
                    source={{ uri: value.uri }}
                    style={{ width: 50, height: 40, margin: 10 }}
                  />
                )}
              </View>
            ))}
          </ScrollView>

          <Button
            loading={loading}
            icon="card-account-details-outline"
            mode="contained"
            onPress={Register}
            buttonColor="rgba(60,32,22,0.8)"
            style={{ width: "80%", alignSelf: "center" }}
          >
            Đăng ký
          </Button>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
export default CarcardRegister;
