import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Context from "../../../configs/Context";
import { useContext, useState } from "react";
import { authAPI, endpoints } from "../../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import qs from "qs";
const ChangePass = () => {
  const [user, dispatch] = useContext(Context);
  const [passwordnow, setPasswordNow] = useState("");
  const [passwordnew, setPasswordNew] = useState("");
  const [passwordnewconfirm, setPasswordNewConfirm] = useState("");
  const changepass = async () => {
    try {
      let accessToken = await AsyncStorage.getItem("access-token");
      let res = await authAPI(accessToken).patch(
        endpoints["current_user"],
        {
          password: passwordnew,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (ex) {
      console.error(ex);
    }
  };

  

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          height: "60%",
          width: "80%",
          alignSelf: "center",
          marginTop: 100,
        }}
      >
        <Text></Text>
        <TextInput
          value={passwordnow}
          onChangeText={(passwordnow) => setPasswordNow(passwordnow)}
          style={{
            marginBottom: 20,
            backgroundColor: "rgba(60,32,22,0.5)",
            width: "90%",
            alignSelf: "center",
            marginTop: 50,
          }}
          label={
            <Text style={{ color: "#CCCCCC", fontSize: 20 }}>
              Mật khẩu hiện tại
            </Text>
          }
          placeholder="Nhập mật khẩu hiện tại..."
          placeholderTextColor="white"
          textColor="black"
          cursorColor="black"
          underlineStyle={{ backgroundColor: "rgba(60,32,22,0.8)" }}
          secureTextEntry={true}
        />
        <TextInput
          value={passwordnew}
          onChangeText={(passwordnew) => setPasswordNew(passwordnew)}
          style={{
            marginBottom: 20,
            backgroundColor: "rgba(60,32,22,0.5)",
            width: "90%",
            alignSelf: "center",
          }}
          label={
            <Text style={{ color: "#CCCCCC", fontSize: 20 }}>Mật khẩu mới</Text>
          }
          placeholder="Nhập mật khẩu mới..."
          placeholderTextColor="white"
          textColor="black"
          cursorColor="black"
          underlineStyle={{ backgroundColor: "rgba(60,32,22,0.8)" }}
          secureTextEntry={true}
        />
        <TextInput
          value={passwordnewconfirm}
          onChangeText={(passwordnewconfirm) =>
            setPasswordNewConfirm(passwordnewconfirm)
          }
          style={{
            marginBottom: 20,
            backgroundColor: "rgba(60,32,22,0.5)",
            width: "90%",
            alignSelf: "center",
          }}
          label={
            <Text style={{ color: "#CCCCCC", fontSize: 20 }}>
              Xác nhận mật khẩu mới
            </Text>
          }
          placeholder="Nhập lại mật khẩu mới..."
          placeholderTextColor="white"
          textColor="black"
          cursorColor="black"
          underlineStyle={{ backgroundColor: "rgba(60,32,22,0.8)" }}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={changepass}>
          <Button
            mode="contained"
            buttonColor="rgba(60, 32, 22, 1)"
            style={{ width: "60%", alignSelf: "center" }}
          >
            Xác nhận
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ChangePass;