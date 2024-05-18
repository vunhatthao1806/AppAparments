import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Complaint from "./components/complaints/Complaint";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from 'react-native-paper';
import ComplaintDetail from './components/complaints/ComplaintDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Complaint" component={Complaint} />
      <Stack.Screen options={{headerShown: true}} name="ComplaintDetail" component={ComplaintDetail} />
    </Stack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();
const MyTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MyStack} options={{title: "Complaint", tabBarIcon: () => <Icon source="home" size={30} color="blue" />}} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTab />
    </NavigationContainer>
  );
}