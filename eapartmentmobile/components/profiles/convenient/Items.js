import { useEffect, useState } from "react";
import { Button, Image, ScrollView, Text, View } from "react-native";
import APIs, { authAPI, endpoints } from "../../../configs/APIs";
import { Card, Chip, List } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyStyle from "../../../styles/MyStyle";
import Style from "../../profiles/convenient/Style";
import moment from "moment";

const Items = ({route}) => {
    const [items, setItems] = useState([]);
    const [item_tagId, setItem_tagId] = useState("");
    const ecabinetId = route.params?.ecabinetId;
    const [tags, setTags] = useState([]);

    const loadItems = async () => {
        try{
            accessToken = await AsyncStorage.getItem("access-token");
            let res = await authAPI(accessToken).get(endpoints['items'](ecabinetId));
            setItems(res.data);
            // console.log(items.status_tag.name);
        } catch (ex){
            console.error(ex);
        }
    } 

    const loadTags = async () => {
        try {
            let res = await APIs.get(endpoints['tags']);
            setTags(res.data);
        } catch (ex){
            console.error(ex);
        }
    }

    useEffect(() => {
        loadItems();
        loadTags();
    }, [ecabinetId]);

    const StatusTags = tags.filter(t => t.id === 1 || t.id === 2);

    return (
        <ScrollView contentContainerStyle={Style.container}>
        {items.map(item => (
            <View key={item.id} style={Style.cardContainer}>
                <Card style={Style.card}>

                    <Card.Cover source={{ uri: item.image }} />
                    
                    <Text style={[Style.titleItem, Style.alignSelf]} >{item.name}</Text>
                    <Text style={[Style.alignSelf]}>{moment(item.created_date).format("DD/MM/YYYY")}</Text>
                    <View style={[Style.tagItem, Style.alignSelf]}>
                        {item.status_tag && (
                             <Chip 
                             key={item.status_tag.id} 
                             icon="minus-box-outline"
                             style={{
                                 backgroundColor: item.status_tag.name === "Chưa nhận hàng" ? "#FF8F8F" : "#B0EBB4"
                             }}
                         >
                             {item.status_tag.name}
                         </Chip>
                        )}
                    </View>
                </Card>
            </View>
        ))}
        
    </ScrollView>
    );
}

export default Items;