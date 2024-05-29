import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Styles from "../Styles";
import { useEffect, useState } from "react";
import { authAPI, endpoints } from "../../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Style from "./Style";
import { ActivityIndicator, Icon, List } from "react-native-paper";
import { isCloseToBottom } from "../../utils/Utils";

const Carcard = ({ navigation }) => {
  const [carcard, setCarcard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  
  const loadCarcard = async () => {
    if (page > 0) {
      setLoading(true);
      try {
        let accessToken = await AsyncStorage.getItem("access-token");
        let url = `${endpoints["carcard"]}?page=${page}`;

        let res = await authAPI(accessToken).get(url);

        if (res.data.next === null) setPage(0);

        if (page === 1) setCarcard(res.data.results);
        else
          setCarcard((current) => {
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
    loadCarcard();
  }, [page]);

  const loadMore = ({ nativeEvent }) => {
    if (!loading && page > 0 && isCloseToBottom(nativeEvent)) {
      setPage(page + 1);
    }
  };

  return (
    <ScrollView onScroll={loadMore}>
      {loading && <ActivityIndicator />}
      {carcard.map(c => (
        <View style={Style.ecabinetStyle}>
          <TouchableOpacity
            key={c.id}
            onPress={() =>
              navigation.navigate("CarCardDetail", { carCardId: c.id })
            }
          >
            <List.Item
              key={c.id}
              title={c.number_plate}
              description={c.type}
              left={() => (
                <Image
                  style={Styles.imageEca}
                  source={{ uri: c.image_mrc_m1 }}
                />
              )}
            />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={() => navigation.navigate("CarCardRegister")}>
        <View style={Style.ecabinetStyle}>
          <List.Item
            title="Đăng ký thẻ xe mới"
            left={() => <Icon source={"plus-circle"} size={70} />}
          />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default Carcard;