import React, { useEffect, useState } from "react";
import { Text, Button, View, Alert, PermissionsAndroid, Platform } from "react-native";
import * as SMS from 'expo-sms';
import { TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/APIs";

const Notification = () => {
  const [message, setMessage] = useState("Bạn có bưu kiện mới chưa nhận! Hãy tới quầy nhận bưu kiện nhận hàng nhé! Chân thành cảm ơn!");

  const [ecabinets, setEcabinets] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [selectedEcabinet, setSelectedEcabinet] = useState(null);
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState('');

  const loadEcabinet = async () => {
    try {
        let accessToken = await AsyncStorage.getItem("access-token");
        let res = await authAPI(accessToken).get(endpoints["ecabinets"]);
        setEcabinets(res.data);
    } catch (ex) {
        console.error(ex);
    }
}

const loadPhoneNumbers = async () => {
  try {
      let accessToken = await AsyncStorage.getItem("access-token");
      let res = await authAPI(accessToken).get(endpoints["phone_number"]);
      setPhoneNumbers(res.data);
      // console.log(res.data);
  } catch (ex) {
      console.error(ex);
  }
}

useEffect(() => {
  loadEcabinet();
  loadPhoneNumbers();
}, [])

  // Kiểm tra khả năng gửi SMS của thiết bị
  const checkSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      Alert.alert('SMS is available on this device');
    } else {
      Alert.alert('SMS is not available on this device');
    }
  };

  // Gửi tin nhắn SMS
  const sendSms = async () => {
    try {
      const { result } = await SMS.sendSMSAsync([ownerPhoneNumber], message);
      if (result === 'sent') {
        Alert.alert('Message sent successfully!');
      } else {
        Alert.alert('Failed to send message.');
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
    <View style={{ padding: 20 }}>
      <Text>Hi</Text>
      <Button title="Kiểm tra SMS" onPress={checkSMS} />

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

      <TextInput
        style={{ marginTop: 20 }}
        label="Số điện thoại"
        placeholder="Nhập số điện thoại"
        value={ownerPhoneNumber}
        onChangeText={setOwnerPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={{ marginTop: 20 }}
        label="Tin nhắn"
        placeholder="Nhập tin nhắn"
        multiline='true'
        value={message}
        onChangeText={setMessage}
      />
      
               {selectedEcabinet && (
                    <>
                        <Text>Bạn đã chọn: {ecabinets.find(e => e.id === selectedEcabinet)?.name}</Text>
                        <Text>Số điện thoại của chủ sở hữu: {ownerPhoneNumber}</Text>
                    </>
                )}  
                {/* {selectedEcabinet && <Text>Bạn đã chọn: {selectedEcabinet}</Text>} */}
                {/* {phoneNumber && <Text>Bạn đã chọn: {ecabinets.find(e => e.phone_number_id === ownerPhoneNumber)</Text>} */}
                    
      <Button title="Gửi SMS" onPress={sendSms} />
    </View>
  );
};

export default Notification;