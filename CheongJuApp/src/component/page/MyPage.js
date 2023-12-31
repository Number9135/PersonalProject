import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { Avatar } from 'react-native-paper';
import { MaterialIcons, Ionicons, Feather, MaterialCommunityIcons   } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import {auth, firebase_db} from '../../../firebaseConfig';
import { useSelector } from 'react-redux';


export default function MyPage() {

  const navigation = useNavigation();

  const [isAuth, setIsAuth] = useState(false);
  const [isImg, setIsImg] = useState(null)
  const [isDisplayName, setIsDisplayName] = useState('');

  auth.onAuthStateChanged((user)=>{
    if(user){
      setIsAuth(true)
    }else{
     //console.log('없음')
    }
  })

useEffect(() => {
  const userId = auth.currentUser.uid;

  const userProfileRef = firebase_db.ref(`users/${userId}/profile`);
  userProfileRef.on('value', (snapshot) => {
    const profileData = snapshot.val();
    if (profileData) {
      setIsImg(profileData.PhotoURL);
      setIsDisplayName(profileData.UserName);
    }
  });

  return () => {
    userProfileRef.off('value');
  };
}, []);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Avatar.Image size={wp("20%")} style={styles.infoImage} source={{uri:isImg}}/>
        <View style={styles.infoText}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: wp("5%"), fontWeight: "600" }}>
            {isDisplayName}  님
            {
              isDisplayName == null && (
                <Text>asd</Text>
              )
            }
            </Text>
            <Text style={{ fontSize: wp("4%"), marginLeft: 10 }}>
              마이페이지
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: wp("3%"), marginTop: 2 }}>
              나의 정보들을 한눈에! 나의 글들을 확인 해보세요.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.cateContainer}>
        <View style={[styles.cateMenu, { height: hp("26%") }]}>
          <View style={styles.cateTitleContainer}>
            <Text style={styles.cateTitleText}>계정관리</Text>
          </View>
          <View
            style={{
              height: hp("20%"),
              alignItems: "center",
              marginTop: 5,
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity onPress={()=>{navigation.navigate('프로필꾸미기')}}
            style={styles.cateButtonStyle}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="ios-person-circle-outline"
                  size={wp("5%")}
                  color="black"
                />
                <Text style={styles.cateButtonText}>프로필 꾸미기</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={wp("5%")}
                color="black"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.cateButtonStyle}>
              <View style={styles.iconContainer}>
                <MaterialIcons
                  name="perm-device-information"
                  size={wp("5%")}
                  color="black"
                />
                <Text style={styles.cateButtonText}>개인정보 수정</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={wp("5%")}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cateButtonStyle}>
              <View style={styles.iconContainer}>
                <Feather name="log-out" size={wp("5%")} color="black" />
                <Text style={styles.cateButtonText}>회원탈퇴</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={wp("5%")}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.cateMenu, { height: hp("31%") }]}>
          <View style={styles.cateTitleContainer}>
            <Text style={styles.cateTitleText}>게시물 관리</Text>
          </View>
          <View
            style={{
              height: hp("25%"),
              alignItems: "center",
              marginTop: 5,
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity style={styles.cateButtonStyle}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="preview" size={wp("5%")} color="black" />
                <Text style={styles.cateButtonText}>나의 리뷰</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={wp("5%")}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cateButtonStyle}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="reply-outline"
                  size={wp("5%")}
                  color="black"
                />
                <Text style={styles.cateButtonText}>나의 댓글</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={wp("5%")}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cateButtonStyle}>
              <View style={styles.iconContainer}>
                <Feather name="heart" size={wp("5%")} color="black" />
                <Text style={styles.cateButtonText}>찜 목록</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={wp("5%")}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cateButtonStyle}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="monitor-eye"
                  size={wp("5%")}
                  color="black"
                />
                <Text style={styles.cateButtonText}>최근 본 글</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={wp("5%")}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },

    infoContainer : {
        borderBottomWidth : 1,
        height : hp('20%'),
        width : wp('100%'),
        backgroundColor : "gainsboro",
        flexDirection : 'row',
        alignItems : 'center'
    },

    infoImage : {
        borderWidth : 1,
        backgroundColor : 'white',
        marginLeft : 10,
    },

    infoText : {
        marginLeft : 10,
    },


    
    cateContainer : {
        height : hp('61%'),
        justifyContent : 'space-around',
        alignItems : 'center'
    },

    cateMenu : {
        borderWidth : 0,
        borderRadius : 10,
        elevation : 10,
        backgroundColor : 'white',
        opacity : 0.8,
        width : wp('95%')
    },

    cateTitleContainer : {
        borderBottomWidth : 1,
        width : wp('90%'),
        height : hp('5%'),
        justifyContent : 'center',
        
    },

    cateTitleText : {
        marginLeft : 18,
        fontSize : wp('4.5%'),
        fontWeight : '600'
    },

    cateButtonStyle : {
        borderWidth : 0,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        height : hp('4%'),
        width : wp('85%')
    },

    cateButtonText : {
        fontSize : wp('4%'),
        marginLeft : 10,
    },

    iconContainer : {
        flexDirection : 'row',
        justifyContent : 'center'
    }
})