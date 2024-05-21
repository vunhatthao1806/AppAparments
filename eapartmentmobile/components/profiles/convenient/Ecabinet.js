import { useContext, useEffect, useState } from "react";
import { Avatar, Button, List } from "react-native-paper";
import { authAPI, endpoints } from "../../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import moment from "moment";
import Styles from "../Styles";
import Style from "../../profiles/convenient/Style";

const Ecabinet = ({navigation}) => {
    const [ecabinets, setEcabinets] = useState([]);
    const loadEcabinets = async () => {
      try {
        accessToken = await AsyncStorage.getItem("access-token");
        let res = await authAPI(accessToken).get(endpoints["ecabinet"]);
        setEcabinets(res.data);
      } catch (ex) {
        console.error(ex);
      }
    };

  useEffect(() => {
    loadEcabinets();
  }, []);

  // Array of imported images
  const imageArray = [require('./imageEca/1.jpg'), require('./imageEca/2.jpg'), require('./imageEca/3.jpg')];
  
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    return imageArray[randomIndex];
  };

  return (
      <ScrollView>
        {ecabinets.map((c) => (
        <View style={Style.ecabinetStyle}>
            <TouchableOpacity key={c.id} onPress={() => navigation.navigate('Items', {'ecabinetId': c.id})} >
              <List.Item 
              key={c.id} 
              title={c.name} 
              description={moment(c.created_date).format("DD/MM/YYYY")}
              left={() => 
                <Image
                  style={Styles.imageEca}
                  source={getRandomImage()}
                  />}
              right={() => 
                <Text style={Styles.textRight}>SL: {c.count_items}</Text>}
              />
            </TouchableOpacity>
            
        </View>
        ))}
        
      </ScrollView>
  );
};
export default Ecabinet;