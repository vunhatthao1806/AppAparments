import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import {
  Checkbox,
  Chip,
  Icon,
  TextInput,
  ToggleButton,
  TouchableRipple,
} from "react-native-paper";
import Style from "./Style";
import MyStyle from "../../styles/MyStyle";
import APIs, { authAPI, endpoints } from "../../configs/APIs";
import Context from "../../configs/Context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import * as Notifications from "expo-notifications";
import Styles from "../profiles/Styles";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

const AddComplaint = ({ navigation }) => {
  const [checkedStatus, setCheckedStatus] = useState(false);
  const [checkedComplaint, setCheckedComplaint] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState({
    status: "",
    complaint: "",
  });

  const [complaints, setComplaints] = useState([]);
  const [complaint_tagId, setComplaint_tagId] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      console.log(token);
      fetch("http://192.168.2.8/save-token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, user_id: 2 }), // Thay 1 bằng ID người dùng thực sự
      });
    });
  }, []);

  const sendNotification = async () => {
    console.log("Sending push notification... ");

    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Thông báo",
      body: "Bạn đã tạo thành công một bài phản ánh!",
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  const chooseAvatar = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") alert("Từ chối quyền truy cập");
    else {
      let res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled) {
        setSelectedImage(res.assets[0]);
      }
    }
  };

  const loadTags = async () => {
    try {
      let res = await APIs.get(endpoints["tags"]);
      setTags(res.data);
    } catch (ex) {
      console.error(ex);
    }
  };

  const loadComplaints = async () => {
    try {
      let url = `${endpoints["complaints"]}?complaint_tag_id=${complaint_tagId}`;

      let res = await APIs.get(url);
      setComplaints(res.data);
    } catch (ex) {
      console.error(ex);
    }
  };

  const loadCreatComplaint = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("status_tag", checkedStatus);
      formData.append("complaint_tag", checkedComplaint);
      console.log(formData);

      const filename = selectedImage.uri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const fileType = match ? `image/${match[1]}` : `image`;

      console.log(fileType);
      console.log(filename);
      console.log(selectedImage);

      formData.append("image", {
        uri: selectedImage.uri,
        type: fileType, // hoặc type phù hợp với file của bạn
        name: filename,
      });

      // Gửi dữ liệu form lên server
      let accessToken = await AsyncStorage.getItem("access-token");
      let res = await authAPI(accessToken).post(
        endpoints["add_complaint"],
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (ex) {
      Alert.alert("Đã có lỗi xảy ra ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  const createComplaint = async () => {
    const statusTag = tags.find((t) => t.id == checkedStatus);
    const complaintTag = tags.find((t) => t.id == checkedComplaint);
    setSelectedTags({
      status: statusTag ? statusTag.id : null,
      complaint: complaintTag ? complaintTag.id : null,
    });
    loadComplaints();
    await loadCreatComplaint();
    await sendNotification();
    navigation.navigate("Complaint");
  };

  const StatusTags = tags.filter((t) => t.id === 6 || t.id === 7);
  const ComplaintTags = tags.filter((t) => t.id >= 8 && t.id <= 10);

  return (
    <ScrollView>
      <View>
        <View style={Styles.backgroundtranfer}>
          <View style={Styles.uploadImage}>
            <TouchableOpacity onPress={chooseAvatar}>
              {selectedImage === null ? (
                <View>
                  <View style={Styles.iconupimage}>
                    <Icon source={"tray-arrow-up"} size={30} />
                  </View>
                </View>
              ) : (
                <Image
                  source={{ uri: selectedImage.uri }}
                  width={100}
                  height={100}
                  borderRadius={10}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* {selectedImage && (
                    <View style={{ alignItems: 'center', marginVertical: 20 }}>
                        <Image source={{ uri: selectedImage.uri }} style={{ width: 200, height: 200 }} />
                    </View>
                )} */}
      </View>

      <View style={[Style.margin, Style.container]}>
        <View style={MyStyle.row}>
          <Icon source="pen" color={"#AF8F6F"} size={28} />
          <Text style={Style.titleComplaint}>Tiêu đề bài viết</Text>
        </View>
        <TextInput
          style={Style.TextInputComplaint}
          value={title}
          onChangeText={(title) => setTitle(title)}
          multiline={true}
          backgroundColor="#543310"
          placeholder="Nhập tiêu đề"
          placeholderTextColor="white"
          textColor="white"
          cursorColor="white"
          underlineStyle={{ backgroundColor: "#543310" }}
        />
      </View>

      <View style={[Style.margin, Style.container]}>
        <View style={MyStyle.row}>
          <Icon source="book-open-variant" color={"#AF8F6F"} size={28} />
          <Text style={[Style.titleComplaint]}>Nội dung</Text>
        </View>

        <TextInput
          label=""
          value={content}
          onChangeText={(content) => setContent(content)}
          multiline={true}
          style={Style.TextInputComplaint}
          backgroundColor="#543310"
          placeholder="Nhập nội dung"
          placeholderTextColor="white"
          textColor="white"
          cursorColor="white"
          underlineStyle={{ backgroundColor: "#543310" }}
        />
      </View>

      <View
        style={[
          Style.margin,
          Style.container,
          MyStyle.row,
          Style.justifyContent,
        ]}
      >
        <View>
          <Text style={[Style.titleComplaint, Style.titleTag]}>Status tag</Text>
          {StatusTags === null ? (
            <ActivityIndicator />
          ) : (
            <>
              {StatusTags.map((c) => (
                <Chip
                  mode={checkedStatus === c.id ? "flat" : "outlined"}
                  key={c.id}
                  onPress={() => {
                    setCheckedStatus(checkedStatus === c.id ? null : c.id);
                  }}
                  style={[
                    MyStyle.margin,
                    {
                      backgroundColor:
                        checkedStatus === c.id ? "#AF8F6F" : "#543310", // Thay đổi màu nền dựa trên trạng thái được chọn
                    },
                  ]}
                  icon={() => (
                    // -----Mới thêm-----
                    <Icon source="tag" size={20} color={"#F8F4E1"} />
                  )}
                  textStyle={{ color: "#F8F4E1" }}
                >
                  {c.name}
                </Chip>
              ))}
            </>
          )}
        </View>

        <View>
          <Text style={[Style.titleComplaint, Style.titleTag]}>
            Complaint tag
          </Text>
          {ComplaintTags === null ? (
            <ActivityIndicator />
          ) : (
            <>
              {ComplaintTags.map((c) => (
                <Chip
                  mode={checkedComplaint === c.id ? "flat" : "outlined"}
                  key={c.id}
                  onPress={() => {
                    setCheckedComplaint(
                      checkedComplaint === c.id ? null : c.id
                    );
                  }}
                  style={[
                    MyStyle.margin,
                    {
                      backgroundColor:
                        checkedComplaint === c.id ? "#AF8F6F" : "#543310", // Thay đổi màu nền dựa trên trạng thái được chọn
                    },
                  ]}
                  icon={() => (
                    // -----Mới thêm-----
                    <Icon source="tag" size={20} color={"#F8F4E1"} />
                  )}
                  textStyle={{ color: "#F8F4E1" }}
                >
                  {c.name}
                </Chip>
              ))}
            </>
          )}
        </View>
      </View>

      <View>
        <TouchableOpacity style={Style.buttonCreate} onPress={createComplaint}>
          <Text style={Style.textCreate}>Create</Text>
        </TouchableOpacity>
      </View>

      {/* {selectedTags.status || selectedTags.complaint ? (
                <View style={[Style.margin, Style.container]}>
                    <Text>Selected Tags:</Text>
                    {selectedTags.status && <Text>Status: {selectedTags.status}</Text>}
                    {selectedTags.complaint && <Text>Complaint: {selectedTags.complaint}</Text>}
                </View>
            ) : null} */}
    </ScrollView>
  );
};

export default AddComplaint;
