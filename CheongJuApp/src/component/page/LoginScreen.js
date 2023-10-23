import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/core';
import {auth} from '../../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPwFocus, setIsPwFocus] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  
  
  const loginHandler = () => {
    auth.signInWithEmailAndPassword("dynamic_ys@naver.com", "dbstn721")
    .then((userCredential)=>{const user = userCredential.user})
    .then((res)=>console.log(res))
    .then(()=>navigation.navigate("메인페이지"))
  }

  auth.onAuthStateChanged((user) => {
    if(user){
      console.log(auth.currentUser)
    }else{
      console.log('로그아웃');
    }
  })
  

    
  useEffect(()=>{
    setTimeout(()=>{
      setEmail('');
    }, 4000)
  }, [errMsg])

  return (
    <View style={styles.container}>
      <View style={styles.loginImageContainer}>
        <Image style={styles.imageStyle} resizeMode="contain" source={require('../../../assets/loginImage.jpg')} />
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            Welcome to CheongJU!
          </Text>
          <Text style={styles.subTitleText}>
            로그인을 통해 청주의 맛집&멋집을 탐방하세요.
          </Text>
        </View>
        <View style={styles.infoTextContainer}>
          <View>
            <Text style={{fontSize: wp('3%'), fontWeight:'500'}}>* Email</Text>
            <TextInput 
              style={[styles.inputStyle, { borderColor: isEmailFocus ? 'black' : 'gray' }]}
              placeholder='Email을 입력하세요'
              value={email}
              onChangeText={setEmail}
              onFocus={() => setIsEmailFocus(true)}
              onBlur={() => setIsEmailFocus(false)}
              inputMode='email'
              borderWidth={1}
              fontSize={wp('3%')}
            />
          </View>
          <View style={{marginTop:5,}}>
            <Text style={{fontSize:wp('3%'), fontWeight:'500'}}>* Password</Text>
            <TextInput 
              style={[styles.inputStyle, { borderColor: isPwFocus ? 'black' : 'gray' }]}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              placeholder='Password를 입력하세요'
              clearButtonMode='while-editing'
              borderWidth={1}
              onFocus={() => setIsPwFocus(true)}
              onBlur={() => setIsPwFocus(false)}
              fontSize={wp('3%')}
            />
          </View>
        </View>
      </View>
      <View style={styles.sumitContainer}>
        <TouchableOpacity onPress={loginHandler}
        activeOpacity={0.8} style={styles.submitButton}>
          <Text style={{fontSize:wp('3%'), color:'white', fontWeight:'500'}}>
          로그인
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row', marginTop:10,}}>
          <Text style={{fontSize:wp('3%'), fontWeight:'600'}}>아직 회원이 아니신가요?</Text>
          <TouchableOpacity onPress={()=>{naivgation.navigate('회원가입')}}
            style={{marginLeft:10,}}>
            <Text style={styles.signUpText}>가입하기.</Text>
          </TouchableOpacity>
        </View>
          <TouchableOpacity onPress={()=>{navigation.goBack()}}
            style={{marginTop:10,}}>
            <Text style={{fontSize:wp('3%'), fontWeight:'700'}}>취소하고 돌아가기</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};


export default LoginScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginImageContainer: {
    borderWidth: 0,
    height: hp('30%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginContainer: {
    borderWidth: 0,
    height: hp('30%'),
    width: wp('80%'),
  },

  sumitContainer: {
    borderWidth: 0,
    height: hp('20%'),
    width: wp('80%'),
    justifyContent : 'center',
    alignItems : 'center'
  },

  imageStyle: {
    height: hp('25%'),
    width: wp('80%'),
    opacity : 0.7
  },

  titleText : {
    fontSize : wp('5%'),
    fontWeight : '500'
  },

  subTitleText : {
    fontSize : wp('3%'),
    paddingTop : 3,
  },

  titleContainer : {
    borderWidth : 0,
    height : hp('10%'),
    justifyContent : 'center'
  },

  infoTextContainer : {
    borderWidth : 0,
    height : hp('20%'),
    justifyContent : 'space-around',
    marginTop : 5,
  },

  inputStyle : {
    width : wp('80%'),
    marginTop : 5,
    paddingLeft : 10,
    borderRadius : 5,
    opacity : 1,
  
  },

  submitButton : {
    borderWidth : 1,
    height : hp('6%'),
    width : wp('80%'),
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius : 5,
    backgroundColor : 'black',
    elevation : 10,
  },

  signUpText : {
    fontSize : wp('3%'),
    color : 'blue',
    fontWeight : '700'
  }
});

