import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { ImageBackground, Text, View } from "react-native";
import Style from "./Style";
import MyStyle from "../../styles/MyStyle";
import { Avatar } from "react-native-paper";

const Logo = () => {
  return (
    <ImageBackground
      source={require("./apartment.webp")}
      style={[Style.image, MyStyle.container]}
    >
      <View style={Style.overlay}>
        <Avatar.Image
          source={require("./TT.png")}
          size={200}
          style={[Style.logo, { marginTop: 150 }]}
        />
        <Text style={Style.imagetext}> Quản Lý Chung Cư </Text>
        <Text
          style={{
            fontSize: 20,
            color: "gold",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          {"© 2024 Apartment App \n Design by Nhật Thảo & Thanh Thúy"}{" "}
        </Text>
      </View>
    </ImageBackground>
  );
};
export default Logo;