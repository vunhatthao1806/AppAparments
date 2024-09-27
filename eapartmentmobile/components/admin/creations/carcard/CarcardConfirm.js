import { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, List, Searchbar, Text } from "react-native-paper";
import APIs, { endpoints } from "../../../../configs/APIs";
import { isCloseToBottom } from "../../../utils/Utils";
import Styles from "../../../profiles/Styles";
import Style from "../../../profiles/convenient/Style";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";

const CarCardConfirm = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [carcardtemp, setCarCardTemp] = useState([]);
  const [q, setQ] = useState("");

  const loadCarCardTemp = async () => {
    if (page > 0) {
      setLoading(true);
      try {
        let url = `${endpoints["carcardtemp"]}?q=${q}&page=${page}`;

        let res = await APIs.get(url);

        if (res.data.next === null) setPage(0);

        if (page === 1) setCarCardTemp(res.data.results);
        else
          setCarCardTemp((current) => {
            return [...current, ...res.data.results];
          });
        //console.log(res.data);
      } catch (ex) {
        console.error(ex);
      } finally {
        setLoading(false);
      }
    }
  };
  const loadMore = ({ nativeEvent }) => {
    if (!loading && page > 0 && isCloseToBottom(nativeEvent)) {
      setPage(page + 1);
    }
  };
  const search = (value, callback) => {
    setPage(1);
    callback(value);
  };
  useFocusEffect(
    useCallback(() => {
      setPage(1); // Reset trang về 1 để load lại dữ liệu
      loadCarCardTemp();
    }, [q])
  );
  useEffect(() => {
    loadCarCardTemp();
  }, [q, page]);
  return (
    <View style={{ marginBottom: 60, marginTop: 10 }}>
      <Searchbar
        placeholder="Nhập từ khóa"
        style={{ backgroundColor: "#D1D8C5" }}
        onChangeText={(q) => search(q, setQ)}
        value={q}
      />
      <ScrollView style={{ marginTop: 10 }} onScroll={loadMore}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            {carcardtemp && carcardtemp.length > 0 ? (
              carcardtemp.map((c) => (
                <View style={[Style.ecabinetStyle]} key={c.id}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("CarcardConfirmDetail", {
                        carcardtempid: c.id,
                      })
                    }
                  >
                    <List.Item
                      key={c.id}
                      title={c.number_plate}
                      description={moment(c.created_date).format("DD/MM/YYYY")}
                      left={() => (
                        <Image
                          style={Styles.imageEca}
                          source={{ uri: c.image_mrc_m1 }}
                        />
                      )}
                    />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text>Carcard not found</Text>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};
export default CarCardConfirm;
