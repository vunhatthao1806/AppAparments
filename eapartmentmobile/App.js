import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Complaint from "./components/complaints/Complaint";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from 'react-native-paper';

const Stack = createStackNavigator();


const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Course" component={Complaint} />
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