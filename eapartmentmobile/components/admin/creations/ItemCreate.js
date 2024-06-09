import { Image, ScrollView, Text, TouchableOpacity } from "react-native";
import { View } from "react-native"
import Styles from "../../profiles/Styles";
import { useEffect, useState } from "react";
import { Badge, Chip, Icon, TextInput, Button} from "react-native-paper";
import Style from "../../complaints/Style";
import MyStyle from "../../../styles/MyStyle";
import APIs, { authAPI, endpoints } from "../../../configs/APIs";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ItemCreate = () => {
    const [avatar, setAvatar] = useState(null);
    const [tags, setTags] = useState([]);
    const [ecabinets, setEcabinets] = useState([]);

    const [checkedStatus, setCheckedStatus] = useState(false);
    const [selectedEcabinet, setSelectedEcabinet] = useState(null);

    const StatusTags = tags.filter(t => t.id === 1);
    const EcabinetName = ecabinets.filter(e => e.name);

    const loadTags = async () => {
        try {
            let res = await APIs.get(endpoints['tags']);
            setTags(res.data);
        } catch (ex){
            console.error(ex);
        }
    }

    const loadEcabinet = async () => {
        try {
            let accessToken = await AsyncStorage.getItem("access-token");
            let res = await authAPI(accessToken).get(endpoints["ecabinets"]);
            setEcabinets(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    const loadCreateItem = async () => {
        try{
            
        } catch(ex) {
            console.error(ex);
        }
    }

    useEffect(() => {
        loadTags();
        loadEcabinet();
    }, [])

    return (
        <ScrollView style={{backgroundColor: "#FBF6EE"}}>
            <View style={Styles.backgroundtranfer}>
                <View style={Styles.uploadImage}>
                    <TouchableOpacity>
                        {avatar === null ? (
                            <View>
                                <View style={Styles.iconupimage}>
                                    <Icon 
                                        source={"tray-arrow-up"} 
                                        size={30} 
                                        />
                                </View>
                            </View>
                        ) : (
                            <Image
                                source={{ uri: avatar.uri }}
                                width={100}
                                height={100}
                                borderRadius={10}
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[Style.margin, Style.container]}>
                <View style={MyStyle.row}>
                    <Icon
                        source="pen"
                        color={'#4F6F52'} 
                        size={28}
                    />    
                    <Text style={Style.titleComplaint}>
                        Tên hàng nhận:
                    </Text>
                </View>
                <TextInput
                    style={Style.TextInputComplaint}
                    // value={title}
                    // onChangeText={title => setTitle(title)}
                    multiline={true}
                    placeholderTextColor="white"
                    textColor="white"
                    cursorColor="white"
                    underlineStyle={{ backgroundColor: "#627254" }}
                    backgroundColor="#627254"
                />
            </View>

            <View style={[Style.margin, Style.container]} >
                <View style={MyStyle.row}>
                    <Icon
                        source="check-circle-outline"
                        color={'#4F6F52'} 
                        size={28}
                    />    
                    <Text style={Style.titleComplaint}>
                        Tình trạng hàng:
                    </Text>
                </View>

                <View style={{width: 170}}>
                {StatusTags===null?<ActivityIndicator />:<>
                    {StatusTags.map(c =>
                        <Chip mode={checkedStatus ===c.id?"flat":"outlined"} 
                            key={c.id} 
                            onPress={() => {
                                setCheckedStatus(checkedStatus === c.id ? null : c.id);
                            }}
                            style={[Style.tags, checkedStatus === c.id ? Style.chipSelected : Style.chipUnselected]}  
                            >{c.name}
                        </Chip>
                        )}
                    </>}
                </View>
            </View>          

            <View style={[Style.margin, Style.container]} >
                <View style={MyStyle.row}>
                    <Icon
                            source="file-cabinet"
                            color={'#4F6F52'} 
                            size={28}
                        />    
                    <Text style={Style.titleComplaint}> Ecabinets</Text>
                </View>
                    
                {ecabinets.length === 0 ? (
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
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedEcabinet(itemValue)
                        }>
                        {ecabinets.map(e => (
                            <Picker.Item key={e.id} 
                                label={e.name} 
                                value={e.name} />
                        ))}
                    </Picker>
                )}
            </View>

            <TouchableOpacity style={[Style.margin, Style.container]}>
                <View style={Style.itemCreate}>
                    <Text style={Style.textCreate}>Create</Text>
                </View>
            </TouchableOpacity>
            
        </ScrollView>
    );
}

export default ItemCreate;
    