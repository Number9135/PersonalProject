import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";


const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.titleText}>로그인 해주세요</Text>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  
  loginContainer : {
    borderWidth : 1,
    height : hp('70%'),
    width : wp('80%'),
    alignItems : 'center'
  },

  titleText : {
    fontSize : wp('4.5%'),
    marginTop : 10,
    fontWeight : '500'
  }
})