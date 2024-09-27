import { Text, View } from "react-native";
import { Appbar, Avatar } from "react-native-paper";
import MyStyle from "../../styles/MyStyle";
import { useContext, useState } from "react";
import Context from "../../configs/Context";

const Chat = () => {
  const [message, setMessage] = useState([]);
  const [user] = useContext(Context);
  return (
    <View>
      <Appbar>
        <Appbar.Content title="Nhắn tin" />
        <Avatar.Image source={{ uri: user.avatar }} size={35} />
      </Appbar>
    </View>
  );
};

export default Chat;
