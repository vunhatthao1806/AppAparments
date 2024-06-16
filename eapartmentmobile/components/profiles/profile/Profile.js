import { Alert, TouchableOpacity, View } from "react-native";
import { Avatar, Button, List } from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import Context from "../../../configs/Context";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyStyle from "../../../styles/MyStyle";
import Styles from "../Styles";
import { authAPI, endpoints } from "../../../configs/APIs";

const Profile = ({ navigation }) => {
  const [user, dispatch] = useContext(Context);
  //const userAvatar = user ? user.avatar : null;
  const [userInfo, setUserInfo] = useState("");
  const [avatar, setAvatar] = useState(null);
  const logout = () => {
    dispatch({
      type: "logout",
    });
  };
  const loadCurrentUser = async () => {
    try {
      let accessToken = await AsyncStorage.getItem("access-token");
      let res = await authAPI(accessToken).get(endpoints["current_user"]);
      setUserInfo(res.data);
      // console.info(userInfo);
    } catch (ex) {
      console.error(ex);
    }
  };
  const chooseAvatar = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") alert("Từ chối quyền truy cập");
    else {
      let res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled) {
        const image = res.assets[0];
        setAvatar(image);
        uploadImage(image);
      }
    }
  };
  const uploadImage = async (image) => {
    const filename = image.uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const fileType = match ? `image/${match[1]}` : `image`;
    if (image) {
      const form = new FormData();
      form.append("avatar", {
        uri: image.uri,
        type: fileType,
        name: filename,
      });
      try {
        let accessToken = await AsyncStorage.getItem("access-token");
        let res = await authAPI(accessToken).patch(
          endpoints["current_user"],
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        Alert.alert("Thông báo", "Cập nhật ảnh thành công!!!");
        loadCurrentUser();
      } catch (ex) {
        console.error(ex);
      }
    }
  };
  useEffect(() => {
    loadCurrentUser();
  }, []);
  return (
    <View style={MyStyle.container}>
      <View style={Styles.avatarbackground}>
        <Avatar.Image
          style={Styles.avatarprofile}
          //source={userAvatar ? { uri: userAvatar } : require("./avatar.jpg")}
          source={{ uri: userInfo.avatar }}
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