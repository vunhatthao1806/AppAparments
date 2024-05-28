// import { Platform, Text, TouchableOpacity, View } from "react-native";
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';
// import { useEffect, useRef, useState } from "react";
// import { ActivityIndicator, Avatar, Button, Card, Chip, Icon, List, TextInput, Menu, Divider, PaperProvider } from "react-native-paper";

import { Text, View } from "react-native";

// Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//       shouldShowAlert: true,
//       shouldPlaySound: true,
//       shouldSetBadge: false,
//     }),
// });
 
//     async function registerForPushNotificationsAsync() {
//         let token;
      
//         if (Platform.OS === 'android') {
//           await Notifications.setNotificationChannelAsync('default', {
//             name: 'default',
//             importance: Notifications.AndroidImportance.MAX,
//             vibrationPattern: [0, 250, 250, 250],
//             lightColor: '#FF231F7C',
//           });
//         }
      
//         token = (
//             await Notifications.getExpoPushTokenAsync({
//               projectId: "6687b1b2-0db0-42e6-8dcf-1486d76335d7",
//             })
//           ).data;
//         console.log(token);

//         if (token) {
//           // Gửi token lên server để lưu
//           await fetch('http://192.168.2.8:8000/user/save_token/', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ token, user_id: 2 }),
//           });
//         }
        
//         return token;
//       }

//       const sendPushNotification = async () => {
//         console.log("Sending push notification... ")

//         // notification message
//         const message = {
//             to: expoPushToken,
//             sound: "default",
//             title: "My first push notification",
//             body: "This is my first push notification",
//         };

//         await fetch("https://exp.host/--/api/v2/push/send", {
//             method: "POST",
//             headers: {
//                 host: "exp.host",
//                 accept: "application/json",
//                 "accept-encoding": "gzip, deflate",
//                 "content-type": "application/json"
//             },
//             body: JSON.stringify(message),
//         });
//       } 


//       const Notifiactions = () => {
//         const [expoPushToken, setExpoPushToken] = useState('');
//         const [notification, setNotification] = useState(false);
//         const notificationListener = useRef();
//         const responseListener = useRef();

//         const [visible, setVisible] = useState(false);

//         const openMenu = () => setVisible(true);
    
//         const closeMenu = () => setVisible(false);
        
//         useEffect(() => {
//             console.log("Registering for push notifications... ");
    
//             registerForPushNotificationsAsync().then(token => {
//                 console.log("token: ", token);
//                 setExpoPushToken(token);
//             })
//             .catch((ex) => console.error(ex));
    
//             notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//               setNotification(notification);
//             });
        
//             responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//               console.log(response);
//             });
        
//             return () => {
//               Notifications.removeNotificationSubscription(notificationListener.current);
//               Notifications.removeNotificationSubscription(responseListener.current);
//             };
            
//         }, [])

//     return (
//         <View>
//             <Text>Notifiaction</Text>
//             <TouchableOpacity style={{marginTop: 0, alignItems: "center"}}
//                 onPress={async () => {
//                   await sendNotificationToAnotherUser(3, 'This is a test notification');
//                 }}
//                 // onPress={sendPushNotification}
//             >
//                 <Text>Push notification</Text>
//             </TouchableOpacity>

//         </View>
//     );
// }

// const sendNotificationToAnotherUser = async (recipientUserId, message) => {
//   await fetch('http://192.168.2.8:8000/user/send-notification', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       recipientUserId,
//       message,
//     }),
//   });
// };

// export default Notifiactions;


const Notifiaction = () => {
  return(
    <View>
      <Text style={{marginTop: 100}}>notification</Text>
    </View>
  );
}

export default Notifiaction;