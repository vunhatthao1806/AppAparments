import { Alert, Image, ScrollView, Text, TouchableOpacity, PermissionsAndroid, Platform } from "react-native";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { Badge, Chip, Icon, TextInput, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import * as SMS from 'expo-sms';
import APIs, { authAPI, endpoints } from "../../../configs/APIs";
import Styles from "../../profiles/Styles";
import Style from "../../complaints/Style";
import MyStyle from "../../../styles/MyStyle";

const ItemCreate = () => {
    const [tags, setTags] = useState([]);
    const [ecabinets, setEcabinets] = useState([]);

    const [name, setName] = useState('');
    const [selectedTags, setSelectedTags] = useState('');
    const [checkedStatus, setCheckedStatus] = useState(false);
    const [selectedEcabinet, setSelectedEcabinet] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [message, setMessage] = useState("Bạn có bưu kiện mới chưa nhận! Hãy tới quầy nhận bưu kiện nhận hàng nhé! Chân thành cảm ơn!");
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [ownerPhoneNumber, setOwnerPhoneNumber] = useState('');

    const StatusTags = tags.filter(t => t.id === 1);

    const loadTags = async () => {
        try {
            let res = await APIs.get(endpoints['tags']);
            setTags(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    const loadEcabinet = async () => {
        try {
            let accessToken = await AsyncStorage.getItem("access-token");
            let res = await authAPI(accessToken).get(endpoints["ecabinets"]);
            setEcabinets(res.data);
            console.log(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    const loadPhoneNumbers = async () => {
        try {
            let accessToken = await AsyncStorage.getItem("access-token");
            let res = await authAPI(accessToken).get(endpoints["phone_number"]);
            setPhoneNumbers(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    const chooseImage = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") 
            alert("Từ chối quyền truy cập");
        else {
            let res = await ImagePicker.launchImageLibraryAsync();
            if (!res.canceled) {
                setSelectedImage(res.assets[0]);
            }
        }
    }

    const loadCreateItem = async () => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("status_tag", checkedStatus);
            formData.append("e_cabinet", selectedEcabinet);

            const filename = selectedImage.uri.split("/").pop();
            const match = /\.(\w+)$/.exec(filename);
            const fileType = match ? `image/${match[1]}` : `image`;
            
            formData.append("image", {
                uri: selectedImage.uri,
                type: fileType, // hoặc type phù hợp với file của bạn
                name: filename,
            });

            let accessToken = await AsyncStorage.getItem("access-token");
            let res = await authAPI(accessToken).post(endpoints["add_item"], 
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            Alert.alert("Thông báo", "Đăng ký thành công!!!");

        } catch(ex) {
            console.error(ex);
        }
    }

    const createItem = async () => {
        const statusTag = tags.find(t => t.id == checkedStatus);
        const ecabinetTag = ecabinets.find(t => t.id == selectedEcabinet)
        setSelectedTags(statusTag ? statusTag.id : null);
        setSelectedEcabinet(ecabinetTag ? ecabinetTag.id : null);
        
        await loadCreateItem();
        sendSms();
    }

    const hideMiddleDigits = (phoneNumber) => {
        const hiddenDigits = phoneNumber.substring(0, phoneNumber.length - 3).replace(/\d/g, '*');
        return hiddenDigits + phoneNumber.substring(phoneNumber.length - 3);
      };
    
      const hiddenPhoneNumber = hideMiddleDigits(ownerPhoneNumber);

    useEffect(() => {
        loadTags();
        loadEcabinet();
        loadPhoneNumbers();
    }, [])
    
    const sendSms = async () => {
        try {
            const { result } = await SMS.sendSMSAsync([ownerPhoneNumber], message);
            if (result === 'sent') {
                Alert.alert('Message sent successfully!');
            } 
        } catch (error) {
            Alert.alert('An error occurred while sending the message.');
            console.error(error);
        }
    };
    
    useEffect(() => {
        if (Platform.OS === 'android') {
            requestSmsPermission();
        }
    }, []);
    
    const requestSmsPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.SEND_SMS,
                {
                    title: 'Yêu cầu quyền gửi SMS',
                    message: 'Ứng dụng cần quyền gửi SMS để hoạt động',
                    buttonNeutral: 'Hỏi sau',
                    buttonNegative: 'Hủy',
                    buttonPositive: 'Đồng ý',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Bạn đã cấp quyền gửi SMS');
            } else {
                console.log('Quyền gửi SMS bị từ chối');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    return (
        <ScrollView style={{backgroundColor: "#FBF6EE"}}>
            <View style={Styles.backgroundtranfer}>
                <View style={Styles.uploadImage}>
                    <TouchableOpacity onPress={chooseImage}>
                        {selectedImage === null ? (
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
                                source={{ uri: selectedImage.uri }}
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
                    value={name}
                    onChangeText={name => setName(name)}
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
                            style={[Style.tags, checkedStatus === c.id ? Style.chipUnselected : Style.chipSelected]}  
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
                                    setOwnerPhoneNumber(phoneNumbers.find(pn => pn.id === selectedCabinet.phone_number)?.number || '');
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
                {/* {selectedEcabinet && <Text>Bạn đã chọn: {selectedEcabinet}</Text>} */}
{/* 
                {selectedEcabinet && (
                    <>
                        <Text>Bạn đã chọn: {ecabinets.find(e => e.id === selectedEcabinet)?.name}</Text>
                        <Text>Số điện thoại của chủ sở hữu: {ownerPhoneNumber}</Text>
                    </>
                )}   */}
                    
                <View>
                    <TextInput
                        style={{ marginTop: 20 }}
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại"
                        value={hiddenPhoneNumber}
                        onChangeText={setOwnerPhoneNumber}
                        keyboardType="phone-pad"
                        disabled={true}
                    />
                    <TextInput
                        style={{ marginTop: 20, backgroundColor: "#627254" }}
                        label="Tin nhắn"
                        placeholder="Nhập tin nhắn"
                        multiline={true}
                        value={message}
                        onChangeText={setMessage}
                        textColor="white"
                        cursorColor="white"
                        labelStyle={{ color: "#fff" }}
                    />
                </View>
            </View>

            <TouchableOpacity style={[Style.margin, Style.container]} onPress={createItem}>
                <View style={Style.itemCreate}>
                    <Text style={Style.textCreate}>Create</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default ItemCreate;
