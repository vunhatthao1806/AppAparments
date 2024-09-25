import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import {
  StyleProp,
  ViewStyle,
  Animated,
  Platform,
  SafeAreaView,
  I18nManager,
} from "react-native";
import { AnimatedFAB, Icon } from "react-native-paper";
import MyStyle from "../../styles/MyStyle";
import { useEffect, useState } from "react";
import APIs, { endpoints } from "../../configs/APIs";
import {
  ActivityIndicator,
  Avatar,
  Card,
  Chip,
  List,
  Searchbar,
  Button,
} from "react-native-paper";
import Style from "./Style";
import moment from "moment";
import RenderHTML from "react-native-render-html";
import { isCloseToBottom } from "../utils/Utils";

const Complaint = ({
  navigation,
  animatedValue,
  visible,
  animateFrom,
  label,
  style,
  iconMode,
}) => {
  const [complaints, setComplaints] = useState([]);
  const [complaint_tagId, setComplaint_tagId] = useState("");
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const [showFullContent, setShowFullContent] = useState({});
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(1);

  const loadComplaints = async () => {
    if (page > 0) {
      setLoading(true);
      let url = `${endpoints["complaints"]}?complaint_tag_id=${complaint_tagId}&&page=${page}`;
      try {
        let res = await APIs.get(url);
        if (page === 1) setComplaints(res.data.results);
        else
          setComplaints((current) => {
            return [...current, ...res.data.results]; //chen them du lieu vao trang hien tai
          });

        if (!res.data.next) setPage(0);
      } catch (ex) {
        console.error(ex);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleContent = (id) => {
    setShowFullContent((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const maxContentLength = 100; // Giới hạn số lượng ký tự để hiển thị trước khi bấm "Đọc thêm"

  const loadTags = async () => {
    try {
      let res = await APIs.get(endpoints["tags"]);
      setTags(res.data);
    } catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, [complaint_tagId, page]);

  useEffect(() => {
    loadTags();
  }, []);

  const search = (value, callback) => {
    setPage(1);
    callback(value);
  };

  const [isExtended, setIsExtended] = useState(true);

  const isIOS = Platform.OS === "ios";

  const Scroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);

    if (!loading && page > 0 && isCloseToBottom(nativeEvent)) {
      setPage(page + 1);
    }
  };

  const fabStyle = { [animateFrom]: 16 };
  const ComplaintTags = tags.filter((t) => t.id >= 8 && t.id <= 10);

  return (
    <View style={[MyStyle.container]}>
      <Text style={[Style.cates, Style.margin]}>Bản tin góp ý</Text>

      <View style={[MyStyle.row, MyStyle.wrap]}>
        <Chip
          mode={!complaint_tagId ? "flat" : "outlined"}
          onPress={() => search("", setComplaint_tagId)} // -----Mới thêm-----
          style={[
            Style.tags,
            !complaint_tagId
              ? { backgroundColor: "#AF8F6F" }
              : { backgroundColor: "#543310" },
          ]}
          textStyle={{ color: "#F8F4E1" }}
          icon={() => (
            <Icon
              source="tag"
              size={20}
              color={
                !complaint_tagId
                  ? Style.chipTextSelected.color
                  : Style.chipTextUnselected.color
              }
            />
          )}
        >
          Tất cả
        </Chip>

        {ComplaintTags === null ? (
          <ActivityIndicator />
        ) : (
          <>
            {ComplaintTags.map((c) => (
              <Chip
                mode={c.id === complaint_tagId ? "flat" : "outlined"}
                key={c.id}
                onPress={() => search(c.id, setComplaint_tagId)}
                textStyle={{ color: "#F8F4E1" }} // -----Mới thêm-----
                style={[
                  Style.tags,
                  c.id === complaint_tagId
                    ? { backgroundColor: "#AF8F6F" }
                    : { backgroundColor: "#543310" },
                ]}
                icon={() => (
                  <Icon
                    source="tag"
                    size={20}
                    color={
                      !complaint_tagId
                        ? Style.chipTextSelected.color
                        : Style.chipTextUnselected.color
                    }
                  />
                )}
              >
                {c.name}
              </Chip>
            ))}
          </>
        )}
      </View>
      {/* <SafeAreaView style={Style.container}> */}
      <ScrollView onScroll={Scroll}>
        <ScrollView>
          {complaints.length == 0 ? (
            <>
              <View style={Style.noCommentContainer}>
                <Text style={Style.noCommentText}>Chưa có bài viết nào!</Text>
              </View>
            </>
          ) : (
            <>
              {complaints.map((c) => (
                <TouchableOpacity
                  key={c.id}
                  onPress={() =>
                    navigation.navigate("ComplaintDetail", {
                      complaintId: c.id,
                    })
                  }
                >
                  {/* // -----Mới thêm----- */}
                  <Card key={c.id} style={{ backgroundColor: "white" }}>
                    <View style={[MyStyle.row, MyStyle.wrap, MyStyle.margin]}>
                      <Avatar.Image size={43} source={{ uri: c.user.avatar }} />
                      <View>
                        <Text style={Style.username}>{c.user.username}</Text>
                        <Text style={Style.createdDate}>
                          {moment(c.created_date).format("DD/MM/YYYY HH:mm")}
                        </Text>
                      </View>
                    </View>

                    <Text style={Style.title}>{c.title}</Text>

                    <Card.Cover source={{ uri: c.image }} />
                    <View style={[MyStyle.row, MyStyle.wrap, MyStyle.margin]}>
                      {c.complaint_tag && (
                        <Chip
                          key={c.complaint_tag.id}
                          style={[
                            MyStyle.margin,
                            { backgroundColor: "#543310" },
                          ]}
                          icon={() => (
                            // -----Mới thêm-----
                            <Icon
                              source="tag"
                              size={20}
                              color={
                                !complaint_tagId
                                  ? Style.chipTextSelected.color
                                  : Style.chipTextUnselected.color
                              }
                            />
                          )}
                          textStyle={{ color: "#F8F4E1" }}
                        >
                          {c.complaint_tag.name}
                        </Chip>
                      )}
                      {c.status_tag && (
                        <Chip
                          key={c.status_tag.id}
                          style={{
                            ...MyStyle.margin,
                            ...MyStyle.statustag,
                            backgroundColor:
                              c.status_tag.name === "Chưa xử lý"
                                ? "#FF8F8F"
                                : "#B0EBB4",
                          }}
                        >
                          {c.status_tag.name}
                        </Chip>
                      )}
                    </View>
                    <Card.Content style={Style.cardContent}>
                      <RenderHTML
                        contentWidth={width}
                        source={{
                          html: showFullContent[c.id]
                            ? c.content
                            : `${c.content.slice(0, maxContentLength)}...`,
                        }}
                      />

                      {!showFullContent[c.id] &&
                        c.content.length > maxContentLength && (
                          <TouchableOpacity
                            onPress={() => handleToggleContent(c.id)}
                          >
                            <Text style={Style.readMore}>Đọc thêm</Text>
                          </TouchableOpacity>
                        )}
                      {showFullContent[c.id] && (
                        <TouchableOpacity
                          onPress={() => handleToggleContent(c.id)}
                        >
                          <Text style={Style.readMore}>Thu gọn</Text>
                        </TouchableOpacity>
                      )}
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              ))}
            </>
          )}
        </ScrollView>
      </ScrollView>
      <AnimatedFAB // -----Mới thêm-----
        icon={() => <Icon source="plus" size={20} color="#543310" />}
        label={"ĐĂNG BÀI VIẾT"}
        extended={isExtended}
        onPress={() => navigation.navigate("AddComplaint")}
        visible={visible}
        animateFrom={"right"}
        iconMode={"static"}
        style={[Style.fabStyle, style, fabStyle]}
        labelStyle={{ color: "#FFFFFF" }}
      />
      {/* </SafeAreaView> */}
    </View>
  );
};

export default Complaint;
