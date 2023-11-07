import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/core';
import { useHeaderHeight } from '@react-navigation/elements';
import {auth} from '../../../firebaseConfig';
import { firebase_db } from '../../../firebaseConfig';




const SignUpScreen = () => {

    const headerHeight = useHeaderHeight()

  const navigation = useNavigation();
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPwFocus, setIsPwFocus] = useState(false);
  const [isComparePw, setIsComparePw] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [inputComparePw, setInputComparePw] = useState('');
  const [inputNickname, setInputNickname] = useState('');
  const [error, setError] = useState(null);
  const [isCheck, setIsCheck] = useState(null);
  const [nextNickname, setNextNickname] = useState(false);
  const [nextPw, setNextPw] = useState(false);
  const [nextComparePw, setNextComparePw] = useState(false);
  const currentTime = new Date();

  const isDate = {
   yaer : currentTime.getFullYear(),
   month : currentTime.getMonth() + 1,
   day : currentTime.getDay(),
   hour : currentTime.getHours(),
   minute : currentTime.getMinutes(),
   second : currentTime.getSeconds(),
  }

  const createDate = 
   isDate.yaer + '-' +isDate.month + '-' + isDate.day + '-' + isDate.hour + '-' + isDate.minute + '-' + isDate.second


  const checkEmailDuplication = (email) => {
    const emailRegex = new RegExp('^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z-.]+$')
    try{
      firebase_db.ref('users').orderByChild("profile/UserEmail")
      .equalTo(email)
      .once('value')
      .then((snapshot)=>{ 
        console.log(snapshot)
        if(email.match(emailRegex)){
          if(snapshot.exists()){
            console.log('이미 존재합니다.')
            setIsCheck('존재');
          }else{
            console.log('사용 가능합니다.')
            setNextNickname(true)
            setIsCheck('미존재')
          }
        }else{
          setIsCheck('잘못된 형식')
        }
    })
    }catch{
      console.log('잠시 후 시도해 주십시오.')
    }
  }

  const checkNicknameDuplication = (nickname) => {
    const nicknameRegex = new RegExp('^[가-힣a-zA-Z0-9]+$')
    console.log(nickname)
    try{
      firebase_db.ref('users').orderByChild("profile/UserName")
      .equalTo(nickname)
      .once('value')
      .then((snapshot)=>{ 
        console.log(snapshot)
        if(nickname.match(nicknameRegex)){
          if(snapshot.exists()){
            console.log('이미 존재합니다.')
            setIsCheck('닉네임 존재');
          }else{
            console.log('사용 가능합니다.')
            setNextPw(true)
            setIsCheck('닉네임 미존재')
          }
        }else{
          setIsCheck('닉네임 잘못된 형식')
        }
    })
    }catch{
      console.log('잠시 후 시도해 주십시오.')
    }
  }

  const createAccount = async () => {
    try{
      if(inputPw === inputComparePw && nextNickname && nextPw){
        await auth.createUserWithEmailAndPassword(inputEmail, inputPw)
        .then(() => {
          auth.currentUser.updateProfile({
            displayName : inputNickname,
          }).then(()=>{
            firebase_db.ref('users/' + auth.currentUser.uid + '/profile').set({
              UserName : inputNickname,
              UserEmail : inputEmail,
              Password : inputPw,
              CreateDate : createDate
            })
          }).then(()=> navigation.navigate('메인페이지'))
        })
      }else{
        setError("비밀번호가 일치하지 않습니다.");
      }
    }catch{
      setError('회원가입 도중 문제가 발생했습니다.');
    }
  }


  useEffect(()=>{
    const pwRegex = new RegExp('^[a-zA-Z0-9\W_]{6,}$');

    if(inputPw.match(pwRegex)){
      setIsCheck('비번 가능');
      setNextComparePw(true)
      if(inputPw === inputComparePw){
        setIsCheck('최종 확인')
      }else{
        setIsCheck('비번 불일치')
      }
    }else {
      setIsCheck('비번 불가능');
         }
      
   
  }, [inputPw, inputComparePw])
  


  auth.onAuthStateChanged((user)=>{
    if(user){
      console.log("현재인증된 사용자", user)
    }else{
     //console.log('없음')
    }
  })

 const signOut = async () =>{
  await auth.signOut()
 }

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
          error && <Text style={{fontSize:wp('3.5%'), color:'red'}}>{error}</Text>
        }
        <View style={styles.textInputContainer}>
          <View>
            <View style={styles.invidualTextInputContainer}>
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
            <TouchableOpacity onPress={()=>checkEmailDuplication(inputEmail)}
              style={styles.duplicationButton}>
              <Text>중복확인</Text>
            </TouchableOpacity>
          </View>
          {
            isCheck === '존재' && (
              <Text style={{fontSize:wp('3.5%'), color:'blue'}}>이미 존재하는 이메일입니다.</Text>
            )
          }

          {
            isCheck === '미존재' && (
              <Text style={{fontSize:wp('3.5%')}}>사용 가능합니다.</Text>
            )
          }
          {
            isCheck === '잘못된 형식' && (
              <Text style={{fontSize:wp('3.5%'), color:'red'}}>잘못된 이메일 형식입니다.</Text>
            )
          }
          <View style={styles.invidualTextInputContainer}>
              <TextInput
              style={[
                styles.inputStyle,
                { borderColor: isPwFocus ? "black" : "gray",},
              ]}
              editable={nextNickname}
              backgroundColor={nextNickname ? 'ghostwhite' : 'gray'}
              placeholder="닉네임"
              onChangeText={setInputNickname}
              clearButtonMode="while-editing"
              borderWidth={1}
              onFocus={() => setIsNickname(true)}
              onBlur={() => setIsNickname(false)}
              fontSize={wp("3%")}
            />
            <TouchableOpacity onPress={()=>checkNicknameDuplication(inputNickname)}
              style={styles.duplicationButton}>
              <Text>중복확인</Text>
            </TouchableOpacity>
            </View>
            {
            isCheck === '닉네임 존재' && (
              <Text style={{fontSize:wp('3.5%'), color:'blue'}}>이미 존재하는 이메일입니다.</Text>
            )
          }

          {
            isCheck === '닉네임 미존재' && (
              <Text style={{fontSize:wp('3.5%')}}>사용 가능합니다.</Text>
            )
          }
          {
            isCheck === '닉네임 잘못된 형식' && (
              <Text style={{fontSize:wp('3.5%'), color:'red'}}>잘못된 형식입니다(영어, 한글, 숫자 조합만 가능합니다).</Text>
            )
          }
          <View style={styles.invidualTextInputContainer}>
            <TextInput
              style={[
                styles.inputStyle,
                { borderColor: isPwFocus ? "black" : "gray" },
              ]}
              secureTextEntry={true}
              editable={nextPw}
              backgroundColor={nextPw ? 'ghostwhite' : 'gray'}
              placeholder="1차 비밀번호"
              onChangeText={setInputPw}
              clearButtonMode="while-editing"
              borderWidth={1}
              onFocus={() => setIsPwFocus(true)}
              onBlur={() => setIsPwFocus(false)}
              fontSize={wp("3%")}
            />
            </View>

            {
            isCheck === '비번 가능' && (
              <Text style={{fontSize:wp('3.5%')}}>사용 가능합니다.</Text>
            )
          }
          {
            inputPw.length > 0 && isCheck === '비번 불가능' && (
              <Text style={{fontSize:wp('3.5%'), color:'red'}}>잘못된 형식입니다(특수문자 X, 최소 1개의 영어 및 숫자를 포함 6자리 이상).</Text>
            )
          }
          <View style={styles.invidualTextInputContainer}>
            <TextInput
              style={[
                styles.inputStyle,
                { borderColor: isComparePw ? "black" : "gray",},
              ]}
              secureTextEntry={true}
              placeholder="2차 비밀번호"
              editable={nextComparePw}
              onChangeText={setInputComparePw}
              clearButtonMode="while-editing"
              backgroundColor={nextComparePw ? 'ghostwhite' : 'gray'}
              borderWidth={1}
              onFocus={() => setIsComparePw(true)}
              onBlur={() => setIsComparePw(false)}
              fontSize={wp("3%")}
            />
            </View>
            {
            isCheck === '최종 확인' && (
              <Text style={{fontSize:wp('3.5%'),}}>일치합니다.</Text>
            )
          }
            {
            inputComparePw.length > 0 && isCheck === '비번 불일치' && (
              <Text style={{fontSize:wp('3.5%'), color:'red'}}>비밀번호가 일치하지 않습니다.</Text>
            )
          }
          </View>
          
        </View>
        
      </KeyboardAvoidingView>
      
      <View style={styles.submitContainer}>
            <TouchableOpacity onPress={createAccount}
            style={styles.signUpButton}>
                <Text style={styles.buttonText}>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.goBack()}
                style={styles.gobackButton}>
                <Text style={styles.gobackText}>취소하고 돌아가기</Text>
            </TouchableOpacity>
          </View>
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
        width : wp('90%'),
        height : hp('35%'),
        marginTop : 10,
        alignItems : 'center'
    },

    textInputContainer : {
        height : hp('25%'),
        marginTop : 10,
    },
    inputStyle : {
        width : wp('60%'),
        height : hp('5%'),
        marginTop : 0,
        paddingLeft : 10,
        borderRadius : 5,
        opacity : 1,
   
        
      
      },

      submitContainer : {
        width : wp('80%'),
        height : hp('20%'),
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
      },

      invidualTextInputContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : wp('85%'),
        alignItems : 'center',
        height : hp('7%'),
        
      },

      duplicationButton : {
        borderWidth : 1,
        height : hp('5%'),
        width : wp('20%'),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,

      }
})