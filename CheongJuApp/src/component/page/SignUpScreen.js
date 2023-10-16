import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/core';

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [isEmailFocus, setIsEmailFocus] = useState(false);
    const [isPwFocus, setIsPwFocus] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={{ fontSize: wp("5%") }}>청주의 맛집 & 멋집</Text>
      </View>
      <View style={styles.signUpContainer}>
        <View>
          <Text>지금 회원가입을 통해 다양한 편의를 느껴보세요.</Text>
        </View>
        <View style={styles.textInputContainer}>
          <View>
            <TextInput
              style={[
                styles.inputStyle,
                { borderColor: isPwFocus ? "black" : "gray" },
              ]}
              secureTextEntry={true}
              placeholder="Email"
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
              placeholder="닉네임"
              clearButtonMode="while-editing"
              borderWidth={1}
              onFocus={() => setIsPwFocus(true)}
              onBlur={() => setIsPwFocus(false)}
              fontSize={wp("3%")}
            />

            <TextInput
              style={[
                styles.inputStyle,
                { borderColor: isPwFocus ? "black" : "gray", marginTop: 15 },
              ]}
              secureTextEntry={true}
              placeholder="1차 비밀번호"
              clearButtonMode="while-editing"
              borderWidth={1}
              onFocus={() => setIsPwFocus(true)}
              onBlur={() => setIsPwFocus(false)}
              fontSize={wp("3%")}
            />

            <TextInput
              style={[
                styles.inputStyle,
                { borderColor: isPwFocus ? "black" : "gray", marginTop: 15 },
              ]}
              secureTextEntry={true}
              placeholder="2차 비밀번호"
              clearButtonMode="while-editing"
              borderWidth={1}
              onFocus={() => setIsPwFocus(true)}
              onBlur={() => setIsPwFocus(false)}
              fontSize={wp("3%")}
            />
          </View>
          
        </View>
        
      </View>
      <View style={styles.submitContainer}>
            <TouchableOpacity style={styles.signUpButton}>
                <Text style={styles.buttonText}>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.goBack()}
                style={styles.gobackButton}>
                <Text style={styles.gobackText}>취소하고 돌아가기</Text>
            </TouchableOpacity>
          </View>
    </View>
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