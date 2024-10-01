import { Image, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import MyStyle from "../../styles/MyStyle";
import { useState } from "react";
import Style from "./Style";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  return (
    <View style={MyStyle.container}>
      <View>
        <Image source={require("./apartment.webp")} style={Style.imageOnTop} />
      </View>
      <View style={Style.containerLogin}>
        <Text style={Style.titleLogin}>Đăng ký cấp lại mật khẩu</Text>
      </View>
      <TextInput
        style={Style.textInput}
        label={<Text style={Style.textLabel}>Email</Text>}
        value={email}
        onChangeText={setEmail}
        placeholder="Nhập email..."
        placeholderTextColor="white"
        textColor="black"
        cursorColor="black"
        underlineStyle={{ backgroundColor: "rgba(60,32,22,0.8)" }}
      />
    </View>
  );
};
export default ForgotPassword;
