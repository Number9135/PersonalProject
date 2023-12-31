import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigator from './StackNavigator';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import MainScreen from '../main/MainScreen';
import DrawerNavigator from './DrawerNavigator';
import { auth } from '../../../firebaseConfig';
import React, {useState} from 'react';
import {View} from 'react-native';
import LoginScreen from '../page/LoginScreen';
import MyPage from '../page/MyPage';
import WritingScreen from '../page/WritingScreen';

const Tab = createBottomTabNavigator();



function TabNavigator() {

  const [loggedIn, setLoggedIn] = useState(false);

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
      tabBarHideOnKeyboard : true,
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

<Tab.Screen
                name="글쓰기"
                component={WritingScreen}
                options={{
                    tabBarIcon: () => (
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 14,
                                height: wp('10%'),
                                width: wp('10%'),
                                borderRadius: 68,
                                backgroundColor: "gray ",
                                borderColor: "gray",
                                borderWidth: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                elevation : 10,
                            }}>
                            <View
                                style={{
                                    height: wp('8%'),
                                    width: wp('8%'),
                                    borderRadius: 58,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: "thistle",
                                }}>
                                <Ionicons name="pencil" size={wp('6%')} color="black" />
                            </View>
                        </View>
                    ),
                }}
            />

        {
          loggedIn ? (
            <Tab.Screen name="마이페이지" component={MyPage}
       options={{
        tabBarIcon : ({ focused, size }) => (
          <Ionicons name="person" size={wp('4.5%')} color={focused ? "black" : "gray"} />
        ),
       }}/>
          ) : (
            <Tab.Screen name="로그인" component={LoginScreen}
            options={{
             tabBarIcon : ({ focused, size }) => (
               <AntDesign name="login" size={wp('4.5%')} color={focused ? "black" : "gray"} />
             ),
            }}/>
          )
        }
      
    </Tab.Navigator>
  );
}

export default TabNavigator;

