import {
    View,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
    Text,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Button, Icon, TextInput, HelperText } from "react-native-paper";
import { useContext, useState } from "react";
import Context from "../../../configs/Context";
import { authAPI, endpoints } from "../../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Styles from "../Styles";
import MyStyle from "../../../styles/MyStyle";
import qs from "qs";
import * as ImagePicker from "expo-image-picker";

const LoginFirst = ({onInitialSetupComplete}) => {
    const [usercurrent, setCurrentUser] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fields = [
        {
            label: "Mật khẩu hiện tại",
            icon: passwordVisible ? "eye-off" : "eye",
            secureTextEntry: !passwordVisible,
            name: "currentpassword",
            onPressIcon: () => setPasswordVisible(!passwordVisible),
        },
        {
            label: "Mật khẩu mới",
            icon: newPasswordVisible ? "eye-off" : "eye",
            secureTextEntry: !newPasswordVisible,
            name: "password",
            onPressIcon: () => setNewPasswordVisible(!newPasswordVisible),
        },
        {
            label: "Xác nhận mật khẩu",
            icon: confirmPasswordVisible ? "eye-off" : "eye",
            secureTextEntry: !confirmPasswordVisible,
            name: "confirm",
            onPressIcon: () => setConfirmPasswordVisible(!confirmPasswordVisible),
        },
    ];

    const updateInfo = async (imageUri) => {
        if (
            usercurrent?.password !== usercurrent?.confirm ||
            usercurrent?.password === usercurrent.currentpassword
        ) {
            setError(true);
            return;
        } else {
            setError(false);
        }

        setLoading(true);
        try {
            let form = new FormData();
            for (let key in usercurrent) {
                if (key === "password") {
                    form.append(key, usercurrent[key]);
                }
            }
            if (imageUri) {
                form.append("avatar", {
                    uri: imageUri.uri,
                    name: "avatar.jpg",
                    type: "image/jpg",
                });
            }

            let accessToken = await AsyncStorage.getItem("access-token");
            let res = await authAPI(accessToken).patch(endpoints["current_user"],
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            await AsyncStorage.setItem("initial-setup-complete", "true");
            onInitialSetupComplete();
        } catch (ex) {
            console.log(ex);
        } finally {
            setLoading(false);
        }
    };

    const updateState = (field, value) => {
        setCurrentUser((current) => {
            return { ...current, [field]: value };
        });
    };

    const chooseAvatar = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Từ chối quyền truy cập");
        } else {
            let res = await ImagePicker.launchImageLibraryAsync();
            if (!res.canceled) {
                const image = res.assets[0];
                setAvatar(image);
            }
        }
    };

    return (
        <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
        <ScrollView>
            <Text style={Styles.avatarImage}>Cập nhật ảnh đại diện</Text>

            <View style={Styles.backgroundtranfer}>
                <View style={Styles.uploadImage}>
                    <TouchableOpacity onPress={chooseAvatar}>
                        {avatar === null ? (
                            <View>
                                <View style={Styles.iconupimage}>
                                    <Icon source={"tray-arrow-up"} size={30} />
                                </View>
                            </View>
                        ) : (
                            <Image
                                source={{ uri: avatar.uri }}
                                width={100}
                                height={100}
                                borderRadius={10}
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={Styles.avatarImage}>Thay đổi mật khẩu</Text>
            <View>

                        <ScrollView>
                        <View style={Styles.input}>
                            {fields.map((f) => (
                                <TextInput
                                    value={usercurrent[f.name]}
                                    onChangeText={(t) => updateState(f.name, t)}
                                    key={f.label}
                                    label={
                                        <Text style={{ color: "#CCCCCC", fontSize: 20 }}>
                                            {f.label}
                                        </Text>
                                    }
                                    secureTextEntry={f.secureTextEntry}
                                    style={{ marginTop: 10, backgroundColor: "rgba(60,32,22,0.5)" }}
                                    right={<TextInput.Icon icon={f.icon} onPress={f.onPressIcon} />}
                                    placeholderTextColor="white"
                                    textColor="black"
                                    cursorColor="black"
                                    underlineStyle={{ backgroundColor: "rgba(60,32,22,0.8)" }}
                                />
                            ))}

                            <HelperText type="error" visible={error}>
                                Mật khẩu không hợp lệ!
                            </HelperText>

                            <Button
                                loading={loading}
                                icon="lock"
                                mode="contained"
                                onPress={() => updateInfo(avatar)}
                                buttonColor="rgba(60,32,22,0.8)"
                                style={{ width: "80%", alignSelf: "center" }}>
                                Xác nhận
                            </Button>
                        </View>
                        </ScrollView>
                    
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
                
    );
}

export default LoginFirst;
