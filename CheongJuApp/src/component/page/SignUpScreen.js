import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/core';
import { useHeaderHeight } from '@react-navigation/elements';
import {auth} from '../../../firebaseConfig';
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';


const SignUpScreen = () => {

    const headerHeight = useHeaderHeight()

    const navigation = useNavigation();
    const [isEmailFocus, setIsEmailFocus] = useState(false);
    const [isPwFocus, setIsPwFocus] = useState(false);
    const [isComparePw, setIsComparePw] = useState(false);

   const [inputEmail, setInputEmail] = useState('');
   const [inputPw, setInputPw] = useState('');
   const [inputComparePw, setInputComparePw] = useState('');


   const [error, setError] = useState(null);

  

   const createAccount = async () => {
    try {
      await auth.signOut(); // 로그아웃
      if (inputPw === inputComparePw) {
        await auth.createUserWithEmailAndPassword(inputEmail, inputPw); // 다시 인증 시도
      } else {
        setError("비밀번호가 일치하지 않습니다.");
      }
    } catch (e) {
      setError('회원가입 도중 문제가 발생했습니다.');
    }
  };
  

  const logout = async () => {
    try {
      await auth.signOut({uid : "KRDIrHNKiXgOoZbh40FPgNkj5EC3"});
      console.log('성공')
    } catch (e) {
      console.log('로그아웃 도중 문제가 발생했습니다.', e);
    }
  };
  

  auth.onAuthStateChanged((user)=>{
    if(user){
      console.log("현재인증된 사용자", user)
    }else{
     console.log('없음')
    }
  })

   

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={{ fontSize: wp("5%") }}>청주의 맛집 & 멋집</Text>
      </View>
      
      <KeyboardAvoidingView 
      keyboardVerticalOffset={headerHeight}
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.signUpContainer}>
        <View>
          <Text>지금 회원가입을 통해 다양한 편의를 느껴보세요.</Text>
        </View>
        {
          error && <Text>{error}</Text>
        }
        <View style={styles.textInputContainer}>
          <View>
            <TextInput
              style={[
                styles.inputStyle,
                { borderColor: isEmailFocus ? "black" : "gray"},
              ]}
              onChangeText={setInputEmail}
              value={inputEmail}
              secureTextEntry={true}
              placeholder="Email"
              keyboardType="email-address"
              clearButtonMode="while-editing"
              borderWidth={1}
              onFocus={() => setIsEmailFocus(true)}
              onBlur={() => setIsEmailFocus(false)}
              fontSize={wp("3%")}
            />

            <TextInput
              style={[
                styles.inputStyle,
                { borderColor: isPwFocus ? "black" : "gray", marginTop: 15 },
              ]}
              secureTextEntry={true}
              placeholder="1차 비밀번호"
              onChangeText={setInputPw}
              clearButtonMode="while-editing"
              borderWidth={1}
              onFocus={() => setIsPwFocus(true)}
              onBlur={() => setIsPwFocus(false)}
              fontSize={wp("3%")}
            />

            <TextInput
              style={[
                styles.inputStyle,
                { borderColor: isComparePw ? "black" : "gray", marginTop: 15 },
              ]}
              secureTextEntry={true}
              placeholder="2차 비밀번호"
              onChangeText={setInputComparePw}
              clearButtonMode="while-editing"
              borderWidth={1}
              onFocus={() => setIsComparePw(true)}
              onBlur={() => setIsComparePw(false)}
              fontSize={wp("3%")}
            />
          </View>
          
        </View>
        
      </KeyboardAvoidingView>
      
      <View style={styles.submitContainer}>
            <TouchableOpacity onPress={createAccount}
            // disabled={!inputEmail || !inputPw || !inputComparePw}
            style={styles.signUpButton}>
                <Text style={styles.buttonText}>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.goBack()}
                style={styles.gobackButton}>
                <Text style={styles.gobackText}>취소하고 돌아가기</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={logout}>
            <Text>로그아웃</Text>
          </TouchableOpacity>
    </View>
    </ScrollView>
  );
}

export default SignUpScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center'

    },

    imageContainer : {
        borderWidth : 0,
        width : wp('80%'),
        height : hp('25%'),
        justifyContent : 'center',
        alignItems : 'center'
    },

    signUpContainer : {
        borderWidth : 0,
        width : wp('80%'),
        height : hp('30%'),
        marginTop : 10,
    },

    textInputContainer : {
        borderWidth : 0,
        height : hp('25%'),
        marginTop : 10,
    },
    inputStyle : {
        width : wp('80%'),
        height : hp('5%'),
        marginTop : 5,
        paddingLeft : 10,
        borderRadius : 5,
        opacity : 1,
        
      
      },

      submitContainer : {
        borderWidth : 0,
        width : wp('80%'),
        height : hp('20%'),
        marginTop : 5,
        justifyContent : 'center',
        alignItems : 'center',

      },

      signUpButton : {
        borderWidth : 0,
        height : hp('5.5%'),
        width : wp('80%'),
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : 'black',
        borderWidth : 1,
        borderRadius : 10,
        elevation : 10,
      },

      buttonText : {
        color : 'white',
        fontSize : wp('4%')
      },
      gobackButton : {
        marginTop : 10,
      },

      gobackText : {
        fontSize : wp('3.5%')
      }
})