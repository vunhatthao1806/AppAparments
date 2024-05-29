import React, { useEffect, useState } from "react";
import { Text, Button, View, Alert, PermissionsAndroid, Platform } from "react-native";
import * as SMS from 'expo-sms';
import { TextInput } from "react-native-paper";

const Notification = () => {
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');

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
      const { result } = await SMS.sendSMSAsync([number], message);
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
      <TextInput
        style={{ marginTop: 20 }}
        label="Số điện thoại"
        placeholder="Nhập số điện thoại"
        value={number}
        onChangeText={setNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={{ marginTop: 20 }}
        label="Tin nhắn"
        placeholder="Nhập tin nhắn"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Gửi SMS" onPress={sendSms} />
    </View>
  );
};

export default Notification;