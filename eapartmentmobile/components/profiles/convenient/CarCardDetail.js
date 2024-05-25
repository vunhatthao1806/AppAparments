import { ScrollView, Text, View } from "react-native";
import { authAPI, endpoints } from "../../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "react-native-paper";
import { useEffect, useState } from "react";
import Style from "../../profiles/convenient/Style";
import moment from "moment";

const CarcardDetail = ({ route }) => {
  const [carcard, setCarcard] = useState([]);
  const carCardId = route.params?.carCardId;
  console.log(carCardId);
  const loadCarcard = async () => {
    try {
      let accessToken = await AsyncStorage.getItem("access-token");
      let res = await authAPI(accessToken).get(endpoints["carcard-detail"](carCardId));
      setCarcard(res.data);
    //   console.log(res.data);
    } catch (ex) {
      console.error(ex);
    }
  };
  useEffect(() => {
    loadCarcard();
  }, [carCardId]);

  return (
    <View>
        {carcard===null?<ActivityIndicator/>:<>
            <View key={carcard.id} style={Style.cardContainer}>
                <Text>{carcard.type}</Text>
                <Text>{moment(carcard.created_date).format("DD/MM/YYYY")}</Text>
            </View>
            </> }  
    </View>
        
  );
};
export default CarcardDetail;
