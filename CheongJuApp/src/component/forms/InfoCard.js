import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { LinearGradient } from 'expo-linear-gradient';


const InfoCard = () => {
  return (
  
        <LinearGradient style={styles.container}
             colors={['#4c669f', '#3b5998', '#192f6a']}
             end={{x:0.5, y:0.8}}
             start={{x:0.1, y:0.3}}
        >
            <Text style={{fontSize:wp('3.5%'), color:'white'}}>반갑습니다!</Text>
            <Text style={{fontSize:wp('4%'), fontWeight:'700', marginTop:5, color:'white'}}>YunSu님</Text>
            <Text style={{fontSize:wp('3.5%'), marginTop:5, color:'white'}}>오늘 하루도 청주의 맛집&멋집을 찾아보세요!</Text>
        </LinearGradient>
       
  )
}

export default InfoCard

const styles = StyleSheet.create({
    container : {
        borderWidth : 0,
        height : hp('18%'),
        width : wp('80%'),
        justifyContent : 'center',
        alignSelf : 'center',
        marginTop : 20,
        borderRadius : 10,
        paddingLeft : 20,
        elevation : 1,
        backgroundColor : 'blue',
        opacity : 0.8
    }
})