import { TouchableOpacity, View } from "react-native";
import { Avatar, Button, List } from "react-native-paper";

import { useContext, useEffect, useState } from "react";
import Context from "../../../configs/Context";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyStyle from "../../../styles/MyStyle";
import Styles from "../Styles";


const Profile = ({ navigation }) => {
  const [user, dispatch] = useContext(Context);
  const userAvatar = user ? user.avatar : null;
  const logout = () => {
    dispatch({
      type: "logout",
    });
  };
  const chooseAvatar = async () => {
    let status = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") alert("Từ chối quyền truy cập");
    else {
      let res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled) {
        // updateAvatar(res.uri);
      }
    }
  };
  const updateAvatar = async (imageUri) => {
    try {
      let accessToken = await AsyncStorage.getItem("access-token");
      let formData = new FormData();
      formData.append("avatar", {
        uri: imageUri,
        name: "avatar.jpg",
        type: "image/jpg",
      });

      let res = await authAPI(accessToken).patch(
        endpoints["current-user"],
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({
        type: "updateAvatar",
        payload: { avatar: res.data.avatar }, // Giả sử server trả về đường dẫn mới của ảnh đại diện
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={MyStyle.container}>
      <View style={Styles.avatarbackground}>
        <Avatar.Image
          style={Styles.avatarprofile}
          source={userAvatar ? { uri: userAvatar } : require("./avatar.jpg")}
          size={150}
        />
        <TouchableOpacity onPress={chooseAvatar}>
          <Button
            icon="camera"
            mode="contained"
            style={{
              width: 50,
              position: "absolute",
              top: 110,
              left: 230,
            }}
            buttonColor="rgba(60, 32, 22, 1)"
          >
            +
          </Button>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 100 }}>
        <List.Section>
          <List.Subheader style={Styles.subject}>Setting</List.Subheader>
          <View style={Styles.item}>
            <TouchableOpacity
              onPress={() => navigation.navigate("AccountInfo")}
            >
              <List.Item
                title="Thông tin tài khoản"
                titleStyle={{ fontSize: 20 }}
                left={() => (
                  <List.Icon icon="account" color="rgba(60,32,22,0.8)" />
                )}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("ChangePass")}>
              <List.Item
                title="Thay đổi mật khẩu"
                titleStyle={{ fontSize: 20 }}
                left={() => (
                  <List.Icon icon="shield" color="rgba(60,32,22,0.8)" />
                )}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Convenient")}>
              <List.Item
                title="Tiện ích"
                titleStyle={{ fontSize: 20 }}
                left={() => (
                  <List.Icon icon="star" color="rgba(60,32,22,0.8)" />
                )}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
              <List.Item
                title="Đăng xuất"
                titleStyle={{ fontSize: 20 }}
                left={() => (
                  <List.Icon icon="logout" color="rgba(60,32,22,0.8)" />
                )}
              />
            </TouchableOpacity>
          </View>
        </List.Section>
      </View>
    </View>
  );
};
export default Profile;