import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Complaint from "./components/complaints/Complaint";
import AddComplaint from "./components/complaints/AddComplaint";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from 'react-native-paper';
import ComplaintDetail from './components/complaints/ComplaintDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from './components/chats/Chat';
import Context from './configs/Context';
import { useEffect, useReducer, useState } from 'react';
import MyUserReducer from './reducers/MyUserReducer';

import Notifiactions from './components/notifications/Notifications';
import Profile from './components/profiles/profile/Profile';
import Convenient from './components/profiles/profile/Convenient';
import AccountInfo from './components/profiles/profile/AccountInfo';
import ChangePass from './components/profiles/profile/ChangePass';

import Payment from './components/profiles/convenient/Payment';
import Ecabinet from './components/profiles/convenient/Ecabinet';
import Survey from './components/profiles/convenient/Survey';
import Carcard from './components/profiles/convenient/Carcard';
import Logo from './components/users/Logo';
import Login from './components/users/Login';
import Items from './components/profiles/convenient/Items';
import CarcardDetail from './components/profiles/convenient/CarCardDetail';
import EditComment from './components/complaints/EditComment';
import CarcardRegister from './components/profiles/convenient/CarCardRegister';
import LoginFirst from './components/profiles/profile/LoginFirst';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ItemCreate from './components/profiles/convenient/ItemCreate';

import ProfileAdmin from './components/admin/profiles/ProfileAdmin';
import Services from './components/admin/profiles/Services';
import ItemCreate from './components/admin/creations/ItemCreate';
import SurveyCreate from './components/admin/creations/SurveyCreate';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerTitleAlign: "center" }}
        name="Tài khoản"
        component={Profile}
      />
      <Stack.Screen
        name="Convenient"
        component={Convenient}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="AccountInfo"
        component={AccountInfo}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ChangePass"
        component={ChangePass}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name="Payment"
        component={Payment}
      />
      <Stack.Screen
        name="Cabinet"
        component={Ecabinet}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Items"
        component={Items}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Carcard"
        component={Carcard}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="CarCardDetail"
        component={CarcardDetail}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="CarCardRegister"
        component={CarcardRegister}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Survey"
        component={Survey}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

const AdminStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerTitleAlign: "center" }}
        name="Tài khoản"
        component={ProfileAdmin}
      />
      <Stack.Screen
        name="Services"
        component={Services}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="AccountInfo"
        component={AccountInfo}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ChangePass"
        component={ChangePass}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ItemCreate"
        component={ItemCreate}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="SurveyCreate"
        component={SurveyCreate}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="CarCardRegister"
        component={CarcardRegister}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

// Nơi để xem complaint và complaint-detail
const ComplaintStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="ComplaintStack"
          component={Complaint}
          options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ComplaintDetail"
        component={ComplaintDetail}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="AddComplaint"
        component={AddComplaint}
        options={{ headerShown: true, tabBarVisible: false}}
      />
      <Stack.Screen
        name="EditComment"
        component={EditComment}
        options={{ headerShown: true, tabBarVisible: false}}
      />
    </Stack.Navigator>
  );
};

const LoginStack = ({ user, onInitialSetupComplete }) => {
  return (
    <Stack.Navigator>
    {user === null ? (
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    ) : user.first_login ? (
      <Stack.Screen name="LoginFirst" options={{ headerShown: false }}>
        {props => <LoginFirst {...props} onInitialSetupComplete={onInitialSetupComplete} />}
      </Stack.Screen>
    ) : user.is_staff ? (
      <Stack.Screen name="AdminTab" component={AdminTab} options={{ headerShown: false }} />
    ) : (
      <Stack.Screen name="MyTab" component={MyTab} options={{ headerShown: false }} />
    )}
  </Stack.Navigator>

  );
};

const Tab = createMaterialBottomTabNavigator();
const MyTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
              name="Chat"
              component={Chat}
              options={{
                title: "Tin nhắn",
                tabBarIcon: () => <Icon source="chat" size={30} color="white" />,
                headerTitleAlign: "center",
              }}
            />
      
      <Tab.Screen
        name="Notification"
        component={Notifiactions}
        options={{
          title: "Thông báo",
          tabBarIcon: () => <Icon source="bell" size={30} color="white" />,
          headerTitleAlign: "center",
        }}
      />
      
      <Tab.Screen
            name="Compaint"
            component={ComplaintStack}
            options={{
              title: "Phản ánh",
              tabBarIcon: () => <Icon source="newspaper" size={30} color="white" />,
              headerTitleAlign: "center",
              headerShown: false,
            }}
          />

      <Tab.Screen
            name="Profile"
            component={ProfileStack}
            options={{
              title: "Tài khoản",
              tabBarIcon: () => <Icon source="account" size={30} color="white" />,
              headerTitleAlign: "center",
              headerShown: false,
            }}
            />
    </Tab.Navigator>
  );
}

const AdminTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
              name="Chat"
              component={Chat}
              options={{
                title: "Tin nhắn",
                tabBarIcon: () => <Icon source="chat" size={30} color="white" />,
                headerTitleAlign: "center",
              }}
            />
      
      <Tab.Screen
        name="Survey"
        component={Survey}
        options={{
          title: "Khảo sát",
          tabBarIcon: () => <Icon source="bell" size={30} color="white" />,
          headerTitleAlign: "center",
        }}
      />
      
      <Tab.Screen
            name="Compaint"
            component={ComplaintStack}
            options={{
              title: "Phản ánh",
              tabBarIcon: () => <Icon source="newspaper" size={30} color="white" />,
              headerTitleAlign: "center",
              headerShown: false,
            }}
          />

      <Tab.Screen
            name="Profile"
            component={AdminStack}
            options={{
              title: "Tài khoản",
              tabBarIcon: () => <Icon source="account" size={30} color="white" />,
              headerTitleAlign: "center",
              headerShown: false,
            }}
            />
    </Tab.Navigator>
  );
}

const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null);
  const [loading, setLoading] = useState(true);
  const [isInitialSetupComplete, setIsInitialSetupComplete] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    // console.log(user.is_staff);

    return () => clearTimeout(timeout);
  }, []);

  const handleInitialSetupComplete = () => {
      setIsInitialSetupComplete(true);
      dispatch({ type: "updateFirstLogin" });
      console.log(user.is_staff);
  };

  return (
    <Context.Provider value={[user, dispatch]}>
      <NavigationContainer>
        {loading ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Logo"
              options={{ headerShown: false }}
              component={Logo}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="LoginStack" options={{ headerShown: false }}>
              {/* {() => <LoginStack user={user} />} */}
              {() => (
                  <LoginStack
                      user={user}
                      onInitialSetupComplete={handleInitialSetupComplete}
                  />
                            )}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Context.Provider>
  );
}

export default App;
