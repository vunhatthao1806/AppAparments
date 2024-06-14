import { useEffect, useState } from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import moment from "moment";
import { Button } from "react-native-paper";
import Style from "./Style";
import MyStyle from "../../../styles/MyStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../../configs/APIs";

const PaymentDetail = ({ route, navigation }) => {
  const [receipt, setReceipt] = useState();
  const receiptid = route.params?.receiptid;

  const loadReceipt = async () => {
    try {
      let accessToken = await AsyncStorage.getItem("access-token");
      let res = await authAPI(accessToken).get(
        endpoints["receipt-detail"](receiptid)
      );
      setReceipt(res.data);
    } catch (ex) {
      console.error(ex);
    }
  };
  useEffect(() => {
    loadReceipt();
  }, [receiptid]);
  const handelPayment = async () => {
    try {
      let accessToken = await AsyncStorage.getItem("access-token");
      let url = `${endpoints["create-payment"]}?receipt_id=${receiptid}&total=${receipt.total}`;
      let res = await authAPI(accessToken).post(url);
      console.info(res.data);
      Linking.openURL(res.data.payUrl);
    } catch (ex) {
      console.error(ex);
    }
  };
  return (
    <View style={MyStyle.container}>
      {receipt && (
        <View style={[Style.ecabinetStyle, { marginTop: 50 }]}>
          <View style={{ flexDirection: "row", margin: 10 }}>
            <Image
              source={require("../../users/TT.png")}
              style={{ width: 100, height: 100, borderRadius: 100 }}
            />
            <View style={{ marginLeft: 10, marginTop: 10 }}>
              <Text style={{ fontSize: 17 }}>
                Căn hộ số: {receipt.flat.apartment_num}
              </Text>
              <Text style={{ fontSize: 17 }}>No Bill: {receipt.id}</Text>
              <Text style={{ fontSize: 17 }}>
                {moment(receipt.created_date).format("DD/MM/YYYY")}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Tổng tiền thanh toán
            </Text>
            <Text style={{ fontSize: 20 }}>{receipt.total}</Text>
          </View>
          <TouchableOpacity onPress={handelPayment}>
            <Button
              mode="contained"
              style={{ width: "70%", alignSelf: "center", margin: 10 }}
              buttonColor="#FF8F8F"
              textColor="black"
            >
              Thanh toán với MoMo
            </Button>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TranferPayment", {'receiptid': receiptid})
            }
          >
            <Button
              mode="contained"
              style={{ width: "70%", alignSelf: "center", margin: 10 }}
              buttonColor="#FF8F8F"
              textColor="black"
            >
              Thanh toán ủy nhiệm chi
            </Button>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default PaymentDetail;