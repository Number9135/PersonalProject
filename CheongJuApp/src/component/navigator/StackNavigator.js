import React, { useEffect, useState } from 'react';  //설치한 스택 네비게이션 라이브러리 삽입
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../main/MainScreen';
import { Image, TouchableOpacity, View, Text, PixelRatio, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { useNavigation } from '@react-navigation/native';
import DrawerMenu from '../forms/DrawerMenu';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const StackNavigator = () =>{

    const navigation = useNavigation(); 

    const log = {
        "logoImage" : 'https://firebasestorage.googleapis.com/v0/b/cheongju-project.appspot.com/o/LogoImage.jpg?alt=media&token=8b5a0878-e136-44e2-b12a-57cef95f1cf3&_gl=1*q70a1y*_ga*MjExNTUxMzk4Ni4xNjUzMzA4MDMx*_ga_CW55HF8NVT*MTY5Njk0Mjk3OC4xNC4xLjE2OTY5NDUwMDMuMzEuMC4w'
    }

        
    
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown : true,
                headerLeft : null,
                headerStyle: {
                    backgroundColor: "white",
                    borderBottomColor: "white",
                    shadowColor: "white",
                    height: hp('11%'),
                
                },
                headerTitle : (props) => (
             
                    <View style={styles.headerStyleContainer}>
                    <Image style={styles.logoStyle} resizeMode='contain' source={{uri:log.logoImage}}/>
                    <TouchableOpacity onPress={()=>{navigation.navigate('드로우')}}>
                        <Ionicons name="menu-outline" size={20} color="black" />
                    </TouchableOpacity>
                    </View>
                    
                ),
                headerTintColor: "black",
                headerBackTitleVisible: false,
            }}>

            {/* component={} 안에 페이지로 만들 컴포넌트를 넣음. 컴포넌트에 페이지 기능을 부여하는 코드*/}
            <Stack.Screen name="메인페이지" component={MainScreen} />
            <Stack.Screen name="사이드메뉴" component={DrawerMenu} />


        </Stack.Navigator>
    )
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

//만든 스택 네비게이터를 외부에서 사용하기위해 export로 함수를 내보냄
export default StackNavigator; 
