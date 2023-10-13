import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigator from './StackNavigator';
import { Feather, Ionicons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import MainScreen from '../main/MainScreen';
import DrawerNavigator from './DrawerNavigator';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
     screenOptions={{
      tabBarStyle :{
        backgroundColor : 'white'
      },
      headerShown : false,
      tabBarActiveTintColor: "black",
      tabBarLabelStyle : {
        fontSize : wp('3%'),
        bottom : 3,
        
      },
     
     }}>


      <Tab.Screen name="홈" component={StackNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Feather name="home" size={wp('4.5%')} color={focused ? "black" : "gray"}/>
          ),
        }} />
      <Tab.Screen name="마이페이지" component={MainScreen}
       options={{
        tabBarIcon : ({ focused, size }) => (
          <Ionicons name="person" size={wp('4.5%')} color={focused ? "black" : "gray"} />
        ),
       }}/>
    </Tab.Navigator>
  );
}

export default TabNavigator;

