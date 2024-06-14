import { Alert, Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import Style from "../../../profiles/convenient/Style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import MyStyle from "../../../../styles/MyStyle";
import { authAPI, endpoints } from "../../../../configs/APIs";

const LockAccountDetail = ({ route }) => {
    const [user, setUser] = useState('');
    const userid = route.params?.userid;
    const [isactive, setIsActive] = useState();
    const loadUser = async () => {
    try {
        let accessToken = await AsyncStorage.getItem("access-token");
        let res = await authAPI(accessToken).get(
            endpoints["user-detail"](userid)
        );
        setUser(res.data);
    } catch (ex) {
        console.log(ex);
    }
  };
  const update_active = async () => {
        try {
        const newIsActive = user.is_active ? "False" : "True";
        const formData = new FormData();
        formData.append("is_active", newIsActive);
        let accessToken = await AsyncStorage.getItem("access-token");
        let res = await authAPI(accessToken).patch(
            endpoints["lock"](userid),
            formData,
            {
            headers: { "Content-Type": "multipart/form-data" },
            }
        );
        setUser((prevUser) => ({ ...prevUser, is_active: !prevUser.is_active }));
        Alert.alert("Thành công!!!");
        } catch (ex) {
        console.error(ex);
        }
  };
useEffect(() => {
    loadUser();
}, [userid]);
return (
    <ScrollView style={MyStyle.container}>
        {user && (
            <View style={[{ marginTop: 0 }]}>
                <View >
                    <Image
                        source={
                            user.avatar ? { uri: user.avatar } : require("./default.png")
                        }
                        style={{ width: 150, height: 150, borderRadius: 100, marginLeft: '25%'}}
                    />
                    <View style={[{ marginTop: 20,
                                    borderColor: '#ddd',  // Màu viền
                                    borderWidth: 1,       // Độ dày viền
                                    borderRadius: 5,      // Góc bo tròn viền
                                    padding: 10,          // Khoảng cách bên trong viền
                                    // marginBottom: 10,     // Khoảng cách giữa các bình luận
                                    backgroundColor: '#fff', // Màu nền
                                    marginLeft: 10,
                                    marginRight: 15,
                    }]}>
                        <Text style={{ fontSize: 17, fontWeight: "bold", margin: 10 }}>
                            Username: {user.username}
                        </Text>
                        <Divider/>
                        <Text style={{ fontSize: 17, margin: 10 }}>
                            Ngày đăng ký: {moment(user.date_joined).format("DD/MM/YYYY")}{" "}
                        </Text>
                    </View>
            </View>
        <View style={[{ marginTop: 30,
                        borderColor: '#ddd',  // Màu viền
                        borderWidth: 1,       // Độ dày viền
                        borderRadius: 5,      // Góc bo tròn viền
                        padding: 10,          // Khoảng cách bên trong viền
                        marginBottom: 10,     // Khoảng cách giữa các bình luận
                        backgroundColor: '#fff', // Màu nền
                        marginLeft: 10,
                        marginRight: 15,
                    }]}>
          <View
              style={[{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 10,
              }]}
            >
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>Họ: </Text>
              <Text style={{ fontSize: 17 }}>{user.first_name}</Text>
          </View>
          <Divider/>
          <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 10,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>Tên: </Text>
              <Text style={{ fontSize: 17 }}>{user.last_name}</Text>
          </View>
          <Divider/>
          <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 10,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>Email: </Text>
              <Text style={{ fontSize: 17 }}>{user.email}</Text>
          </View>
          <Divider/>
          <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 10,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: '7%' }}>
                Trạng thái tài khoản: 
              </Text>
              <Text style={{ fontSize: 17,
                margin: 10,
                padding: 10, // Thêm padding để có không gian cho border
                borderWidth: 2, // Độ dày của border
                backgroundColor: user.is_active === false ? "red" : "green",
                color: "white",
                borderRadius: 10,
                borderColor: user.is_active === false ? "red" : "green"
               }}>
                {user.is_active === false ? "Đang khóa" : "Hoạt động"}
              </Text>
          </View>
        </View>
          <TouchableOpacity>
            {user.is_active === true ? (
              <Button
                onPress={update_active}
                mode="contained"
                style={{ width: "70%", alignSelf: "center", margin: 10 }}
                buttonColor="#FF8F8F"
                textColor="black"
              >
                Khóa tài khoản
              </Button>
            ) : (
              <Button
                onPress={update_active}
                mode="contained"
                style={{ width: "70%", alignSelf: "center", margin: 10 }}
                buttonColor="#A1DD70"
                textColor="black"
              >
                Kích hoạt tài khoản
              </Button>
            )}
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};
export default LockAccountDetail;