import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigator from './StackNavigator';
import { Feather, Ionicons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import MainScreen from '../main/MainScreen';
import DrawerNavigator from './DrawerNavigator';
import { auth } from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

function TabNavigator() {

  const [loggedIn, setLoggedIn] =useState(false)

  auth.onAuthStateChanged((user) => {
    if(user){
      setLoggedIn(true);
    }else{
      setLoggedIn(false);
    }
  })

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

        {
          loggedIn ? (
            <Tab.Screen name="마이페이지" component={alert('로그인을 해주세요.')}
            options={{
             tabBarIcon : ({ focused, size }) => (
               <AntDesign name="login" size={wp('4.5%')} color={focused ? "black" : "gray"} />
             ),
            }}/>
          ) : (
          <Tab.Screen name="마이페이지" component={MainScreen}
          options={{
           tabBarIcon : ({ focused, size }) => (
             <Ionicons name="person" size={wp('4.5%')} color={focused ? "black" : "gray"} />
           ),
          }}/>)
          
        }
      
    </Tab.Navigator>
  );
}

export default TabNavigator;

