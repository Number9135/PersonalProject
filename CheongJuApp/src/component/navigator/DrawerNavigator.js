import React from "react";
import { createDrawerNavigator, DrawerToggleButton } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import TabNavigator from "./TabNavigator";
import { Image, View, StyleSheet } from "react-native";
import MainScreen from "../main/MainScreen";
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const log = {
    "logoImage" : 'https://firebasestorage.googleapis.com/v0/b/cheongju-project.appspot.com/o/LogoImage.jpg?alt=media&token=8b5a0878-e136-44e2-b12a-57cef95f1cf3&_gl=1*q70a1y*_ga*MjExNTUxMzk4Ni4xNjUzMzA4MDMx*_ga_CW55HF8NVT*MTY5Njk0Mjk3OC4xNC4xLjE2OTY5NDUwMDMuMzEuMC4w'
}
  return (
    <Drawer.Navigator
        screenOptions={{
          headerStyle : {backgroundColor : 'white'},
          headerLeft : false,
          headerRight : () => <DrawerToggleButton/>,
          drawerPosition : 'right',
            headerShown : true,
            height: hp('11%'),
            headerTitle : (props) => (
              <Image style={styles.logoStyle} resizeMode='contain' source={{uri:log.logoImage}}/>
            )
        }}
        initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={TabNavigator} options={{drawerLabel: 'HOME',}} />
      <Drawer.Screen name="About" component={MainScreen} options={{drawerLabel: 'ABOUT'}} />
    </Drawer.Navigator>
   
  );
}

const styles = StyleSheet.create({
  logoStyle : {
      height:hp('6%'), 
      width:wp('13%'),
      borderRadius : 10,
  },

  headerStyleContainer : {
      flexDirection : 'row',
      justifyContent : 'space-between'
  }

});

export default DrawerNavigator;
