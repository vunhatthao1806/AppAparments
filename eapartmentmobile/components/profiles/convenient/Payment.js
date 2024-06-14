import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { authAPI, endpoints } from "../../../configs/APIs";
import Style from "./Style";
import { ActivityIndicator, Icon, List, Searchbar } from "react-native-paper";
import MyStyle from "../../../styles/MyStyle";
import { isCloseToBottom } from "../../utils/Utils";

const Payment = ({navigation}) => {
    const [status, setStatus] = useState("False");
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [q, setQ] = useState("");
    const loadReceipts = async () => {
      if (page > 0) {
        setLoading(true);
        try {
          let accessToken = await AsyncStorage.getItem("access-token");
          let url = `${endpoints["receipts"]}?status=${status}&q=${q}&page=${page}`;
  
          let res = await authAPI(accessToken).get(url);
  
          if (res.data.next === null) setPage(0);
  
          if (page === 1) setReceipts(res.data.results);
          else
            setReceipts((current) => {
              return [...current, ...res.data.results];
            });
        } catch (ex) {
          console.error(ex);
        } finally {
          setLoading(false);
        }
      }
    };
    useEffect(() => {
      loadReceipts();
    }, [status, page, q]);
    const getIcon = (tagName) => {
      switch (tagName.toLowerCase()) {
        case "điện":
          return "home-lightning-bolt";
        case "nước":
          return "water";
        case "phí quản lý":
          return "wallet";
        default:
          return "receipt";
      }
    };
  
    const getBackgroundColor = (tagName) => {
      switch (tagName.toLowerCase()) {
        case "điện":
          return { backgroundColor: "#C63D2F" };
        case "nước":
          return { backgroundColor: "#3ABEF9" };
        case "phí quản lý":
          return { backgroundColor: "#A3B763" };
        default:
          return { backgroundColor: "white" };
      }
    };
    const handlePress = (r) => {
      if (status === "False") {
        navigation.navigate('PaymentDetail', { 'receiptid': r.id });
      } else {
        navigation.navigate("PaymentHistory", { 'receiptid': r.id });
      }
    };
    const loadMore = ({ nativeEvent }) => {
      if (!loading && page > 0 && isCloseToBottom(nativeEvent)) {
        setPage(page + 1);
      }
    };
    const setStatusAndResetPage = (newStatus) => {
      setStatus(newStatus);
      setPage(1);
      setReceipts([]);
    };
    const search = (value, callback) => {
      setPage(1);
      callback(value);
    };
    return (
      <View style={MyStyle.container}>
        {loading && <ActivityIndicator />}
        <View style={Style.tiltepayment}>
            <TouchableOpacity onPress={() => setStatusAndResetPage("False")}>
                <Text style={Style.titletextpayment}>Hóa Đơn</Text>
            </TouchableOpacity>
    
            <Text style={{ borderLeftWidth: 2 }}></Text>
            <TouchableOpacity onPress={() => setStatusAndResetPage("True")}>
                <Text style={Style.titletextpayment}>Lịch sử</Text>
            </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <Searchbar
              placeholder="Nhập từ khóa"
              style={Style.search}
              onChangeText={(q) => search(q, setQ)}
              value={q}
            />
          </View>
        </TouchableWithoutFeedback>
        <ScrollView onScroll={loadMore}>
          {receipts.map((r) => (
            <TouchableOpacity key={r.id} onPress={() => handlePress(r)}>
              <View style={[Style.ecabinetStyle, getBackgroundColor(r.tag.name)]}>
                <List.Item
                  key={r.id}
                  title={r.title}
                  left={() => (
                    <Icon source={getIcon(r.tag.name)} size={40} color="black" />
                  )}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };
  export default Payment;