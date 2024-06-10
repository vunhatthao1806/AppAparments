import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, ScrollView, Text, View } from "react-native";
import { authAPI, endpoints } from "../../../configs/APIs";
import { useEffect, useState } from "react";
import Style from "../../complaints/Style";
import MyStyle from "../../../styles/MyStyle";
import { Picker } from "@react-native-picker/picker";
import { Card, Chip, Icon } from "react-native-paper";
import moment from "moment";

const ItemUpdate = () => {
    const [ecabinets, setEcabinets] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedEcabinet, setSelectedEcabinet] = useState(null);

    // const itemId = route.params?.itemId;

    const loadEcabinet = async () => {
        try {
            let accessToken = await AsyncStorage.getItem("access-token");
            let res = await authAPI(accessToken).get(endpoints["ecabinets"]);
            setEcabinets(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    const loadItems = async () =>{
        try {
            let accessToken = await AsyncStorage.getItem("access-token");
            let res = await authAPI(accessToken).get(endpoints["get_items"]);
            setItems(res.data);
            // console.log(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    const toggleItemStatus = async (itemId) => {
        try {
            // Cập nhật trạng thái cục bộ
            const updatedItems = selectedItems.map(item =>
                item.id === itemId ? {
                    ...item,
                    status_tag: {
                        ...item.status_tag,
                        name: item.status_tag.name === "Chưa nhận hàng" ? "Đã nhận hàng" : "Chưa nhận hàng"
                    }
                } : item
            );
    
            // Lưu thay đổi lên server
            const updatedItem = updatedItems.find(item => item.id === itemId);
            const newStatusId = updatedItem.status_tag.name === "Chưa nhận hàng" ? 1 : 2; // Sử dụng ID đúng của trạng thái
            let accessToken = await AsyncStorage.getItem("access-token");
            await authAPI(accessToken).patch(endpoints["update_item"](itemId), {
                status_tag: newStatusId
            });
            setSelectedItems(updatedItems);
        } catch (ex) {
            console.error(ex);
        }
    }

    useEffect(() => {
        loadEcabinet();
        loadItems();
    }, [])

    useEffect(() => {
        if (selectedEcabinet) {
            const selectedCabinetItems = items.filter(i => i.e_cabinet === selectedEcabinet);
            setSelectedItems(selectedCabinetItems);
        }
    }, [selectedEcabinet, items]);

    return (
        <ScrollView >
            
            <View style={[Style.margin, Style.container]} >
                <View style={MyStyle.row}>
                    <Icon
                        source="file-cabinet"
                        color={'#4F6F52'} 
                        size={28}
                    />    
                    <Text style={Style.titleComplaint}> Ecabinets</Text>
                </View>

                {ecabinets === null ? (
                    <Text>Loading...</Text>
                ) : (
                    <Picker
                        selectedValue={selectedEcabinet}
                        style={{ height: 50, width: 100,
                            color: "white",
                            width: '100%',
                            borderWidth: 1,
                            borderColor: '#ccc',
                            backgroundColor: "#627254", }}
                            onValueChange={(itemValue) => {
                                setSelectedEcabinet(itemValue);
                                const selectedCabinet = ecabinets.find(e => e.id === itemValue);
                                if (selectedCabinet) {
                                    setSelectedItems(items.filter(i => i.e_cabinet === selectedCabinet.id));
                                }
                            }
                        }>
                        <Picker.Item label="Chọn tủ đồ" value={null} />
                        {ecabinets.map(e => (
                            <Picker.Item key={e.id} 
                                label={e.name} 
                                value={e.id} />
                        ))}
                    </Picker>                    
                )}
            </View>
            <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 8,}}>
                    {selectedEcabinet && (
                        <>
                            {/* <Text>Bạn đã chọn: {ecabinets.find(e => e.id === selectedEcabinet)?.name}</Text> */}
                            {Array.isArray(selectedItems) && selectedItems.length > 0 ? (
                                selectedItems.map(item => (
                                    <View key={item.id} style={{ width: '50%', marginBottom: 8 }}>
                                        <Card style={{flex: 1, marginLeft: 7}}>
                                            <Card.Cover source={{ uri: item.image }} />
                                            <Text 
                                                style={{fontWeight: "bold", 
                                                        fontSize: 18, 
                                                        margin: 8, 
                                                        alignSelf: "center", 
                                                        marginBottom: 4}} >{item.name}</Text>
                                            <Text 
                                                style={{alignSelf: "center", 
                                                        marginBottom: 4}}>{moment(item.created_date).format("DD/MM/YYYY")}</Text>
                                            <View 
                                                style={{width: 150, 
                                                        marginBottom: 10, 
                                                        alignSelf: "center"}}>
                                                {item.status_tag && (
                                                    <Chip 
                                                        key={item.status_tag.id} 
                                                        icon="minus-box-outline"
                                                        style={{
                                                            backgroundColor: item.status_tag.name === "Chưa nhận hàng" ? "#FF8F8F" : "#B0EBB4"
                                                        }}
                                                        onPress={() => toggleItemStatus(item.id)}
                                                    >
                                                        {item.status_tag.name}
                                                    </Chip>
                                                )}
                                            </View>
                                        </Card>
                                    </View>
                                ))
                            ) : (
                                <Text>Không có vật phẩm trong tủ đồ này</Text>
                            )}
                        </>
                    )}   
                    </ScrollView>

        </ScrollView>
        

    );
}

export default ItemUpdate;