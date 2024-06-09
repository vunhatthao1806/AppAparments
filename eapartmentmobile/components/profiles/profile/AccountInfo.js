import { Image, Text, View } from "react-native";
import Context from "../../../configs/Context";
import moment from "moment";
import MyStyle from "../../../styles/MyStyle";
import { useContext, useEffect, useState } from "react";
import Styles from "../Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../../configs/APIs";

const AccountInfo = () => {
    const [user, setUser] = useState('');

    const loadCurrentUser = async () => {
        try {
            let accessToken = await AsyncStorage.getItem("access-token");
            let res = await authAPI(accessToken).get(endpoints["current_user"]);
            setUser(res.data);
            console.log(res.data.first_login);
        } catch(ex){
            console.error(ex);
        }
    };

    useEffect(() => {
        loadCurrentUser();
    }, []);

    return (
      <View style={[MyStyle.container]}>
        <View>
          <Image
            style={Styles.accountinfoImage}
            source={
                user.avatar ? { uri: user.avatar } : require("./avatar.jpg")
            }
          />
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Ảnh đại diện
          </Text>
          <Text style={[Styles.subject, { marginTop: 70, marginLeft: 10 }]}>
            Thông tin tài khoản
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 10,
              marginRight: 10,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 20 }}>Tên tài khoản</Text>
            <Text style={{ fontSize: 20 }}>{user.username}</Text>
          </View>
          <View
            style={{
              marginTop: 5,
              borderBottomWidth: 1,
              borderBottomColor: "black",
              width: "95%",
              alignSelf: "center",
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 10,
              marginRight: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 20 }}>Họ</Text>
            <Text style={{ fontSize: 20 }}>{user.first_name}</Text>
          </View>
          <View
            style={{
              marginTop: 5,
              borderBottomWidth: 1,
              borderBottomColor: "black",
              width: "95%",
              alignSelf: "center",
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 10,
              marginRight: 10,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 20 }}>Tên</Text>
            <Text style={{ fontSize: 20 }}>{user.last_name}</Text>
          </View>
          <View
            style={{
              marginTop: 5,
              borderBottomWidth: 1,
              borderBottomColor: "black",
              width: "95%",
              alignSelf: "center",
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 10,
              marginRight: 10,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 20 }}>Email</Text>
            <Text style={{ fontSize: 20 }}>{user.email}</Text>
          </View>
          <View
            style={{
              marginTop: 5,
              borderBottomWidth: 1,
              borderBottomColor: "black",
              width: "95%",
              alignSelf: "center",
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 10,
              marginRight: 10,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 20 }}>Ngày tham gia</Text>
            <Text style={{ fontSize: 20 }}>
              {moment(user.date_joined).format("DD/MM/YYYY")}
            </Text>
          </View>
          <View
            style={{
              marginTop: 5,
              borderBottomWidth: 1,
              borderBottomColor: "black",
              width: "95%",
              alignSelf: "center",
            }}
          ></View>
        </View>
      </View>
    );
  };
  export default AccountInfo;