import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import Style from "./Style";
import APIs, { endpoints } from "../../configs/APIs";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const loadReset = async () => {
    setLoading(true);
    try {
      const res = await APIs.post(endpoints["reset-password"], {
        email: email,
      });
      Alert.alert(
        "Thông báo",
        "Vui lòng kiểm tra hộp thư và làm theo hướng dẫn"
      );
    } catch (err) {
      Alert.alert("Cảnh báo lỗi", "Email nhập sai hoặc không tồn tại!", [
        {
          text: "OK",
          onPress: () => {},
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 120} // Adjust the offset
          style={Style.containerKeyBo}
        >
          <ScrollView
            contentContainerStyle={Style.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View>
              <Image
                source={require("./apartment.webp")}
                style={Style.imageOnTop}
              />
            </View>
            <View style={Style.resetform}>
              <Text style={[Style.titleLogin, { marginBottom: 15 }]}>
                Đăng ký cấp lại mật khẩu
              </Text>
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
              <TouchableOpacity>
                <Button
                  loading={loading}
                  mode="contained"
                  buttonColor="rgba(60, 32, 22, 1)"
                  style={Style.buttonLogin}
                  labelStyle={Style.buttonText}
                  onPress={loadReset}
                >
                  Xác nhận
                </Button>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};
export default ForgotPassword;
