import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Complaint from "./components/complaints/Complaint";
import AddComplaint from "./components/complaints/AddComplaint";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "react-native-paper";
import ComplaintDetail from "./components/complaints/ComplaintDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "./components/chats/Chat";
import Context from "./configs/Context";
import { useEffect, useReducer, useState } from "react";
import MyUserReducer from "./reducers/MyUserReducer";

import Profile from "./components/profiles/profile/Profile";
import Convenient from "./components/profiles/profile/Convenient";
import AccountInfo from "./components/profiles/profile/AccountInfo";
import ChangePass from "./components/profiles/profile/ChangePass";

import Payment from "./components/profiles/convenient/Payment";
import Ecabinet from "./components/profiles/convenient/Ecabinet";
import Survey from "./components/profiles/convenient/Survey";
import Carcard from "./components/profiles/convenient/Carcard";
import CarcardRegister from "./components/profiles/convenient/CarCardRegister";
import Items from "./components/profiles/convenient/Items";
import CarcardDetail from "./components/profiles/convenient/CarCardDetail";

import Logo from "./components/users/Logo";
import Login from "./components/users/Login";

import EditComment from "./components/complaints/EditComment";

import LoginFirst from "./components/profiles/profile/LoginFirst";

import ProfileAdmin from "./components/admin/profiles/ProfileAdmin";
import Services from "./components/admin/profiles/Services";

import ItemCreate from "./components/admin/creations/items/ItemCreate";
import ItemUpdate from "./components/admin/creations/items/ItemUpdate";

import Surveys from "./components/admin/creations/surveys/Surveys";
import SurveyCreate from "./components/admin/creations/surveys/SurveyCreate";
import SurveyQuestion from "./components/admin/creations/surveys/SurveyQuestion";
import QuestionCreate from "./components/admin/creations/surveys/QuestionCreate";

import LockAccount from "./components/admin/creations/users/LockAccount";
import LockAccountDetail from "./components/admin/creations/users/LockAccountDetail";
import PaymentDetail from "./components/profiles/convenient/PaymentDetail";
import PaymentHistory from "./components/profiles/convenient/PaymentHistory";
import TranferPayment from "./components/profiles/convenient/TranferPayment";
import SurveysUser from "./components/surveys/SurveysUser";
import SurveyDetail from "./components/surveys/SurveyDetail";
import SurveysHistory from "./components/surveys/SurveysHistory";
import CarCardConfirm from "./components/admin/creations/carcard/CarcardConfirm";
import CarCardConfirmDetail from "./components/admin/creations/carcard/CarcardConfirmDetail";
import ForgotPassword from "./components/users/ForgotPassword";

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
        options={{ headerShown: true }}
        name="PaymentDetail"
        component={PaymentDetail}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name="PaymentHistory"
        component={PaymentHistory}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name="TranferPayment"
        component={TranferPayment}
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
        name="Surveys"
        component={Surveys}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ItemUpdate"
        component={ItemUpdate}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="SurveyCreate"
        component={SurveyCreate}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="LockAccount"
        component={LockAccount}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="LockAccountDetail"
        component={LockAccountDetail}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="CarcardConfirm"
        component={CarCardConfirm}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="CarcardConfirmDetail"
        component={CarCardConfirmDetail}
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
        name="Complaint"
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
        options={{ headerShown: true, tabBarVisible: false }}
      />
      <Stack.Screen
        name="EditComment"
        component={EditComment}
        options={{ headerShown: true, tabBarVisible: false }}
      />
    </Stack.Navigator>
  );
};

const LoginStack = ({ user, onInitialSetupComplete }) => {
  return (
    <Stack.Navigator>
      {user === null ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
        </>
      ) : user.first_login ? (
        <Stack.Screen name="LoginFirst" options={{ headerShown: false }}>
          {(props) => (
            <LoginFirst
              {...props}
              onInitialSetupComplete={onInitialSetupComplete}
            />
          )}
        </Stack.Screen>
      ) : user.is_staff ? (
        <Stack.Screen
          name="AdminTab"
          component={AdminTab}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="MyTab"
          component={MyTab}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

const SurveyUserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SurveysUser"
        component={SurveysUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SurveyDetail"
        component={SurveyDetail}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="SurveysHistory"
        component={SurveysHistory}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();
const MyTab = () => {
  return (
    <Tab.Navigator
      shifting={true}
      activeColor="#F8F4E1" // Màu trắng kem cho tab đang hoạt động
      inactiveColor="#D7CCC8" // Màu nâu nhạt cho tab không hoạt động
      barStyle={{
        backgroundColor: "#3E2723",
      }}
    >
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
        name="SurveyUserStack"
        component={SurveyUserStack}
        options={{
          title: "Khảo sát",
          tabBarIcon: () => (
            <Icon source="form-select" size={30} color="white" />
          ),
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
};

const SurveyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Surveys"
        component={Surveys}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SurveyCreate"
        component={SurveyCreate}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="SurveyQuestion"
        component={SurveyQuestion}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="QuestionCreate"
        component={QuestionCreate}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AdminTab = () => {
  return (
    <Tab.Navigator
      shifting={true}
      activeColor="#F8F4E1" // Màu trắng kem cho tab đang hoạt động
      inactiveColor="#D7CCC8" // Màu nâu nhạt cho tab không hoạt động
      barStyle={{
        backgroundColor: "#3E2723",
      }}
    >
      <Tab.Screen
        name="SurveyStack"
        component={SurveyStack}
        options={{
          title: "Khảo sát",
          tabBarIcon: () => (
            <Icon source="playlist-edit" size={30} color="white" />
          ),
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
};

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
};

export default App;
