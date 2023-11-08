import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput, Alert, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import { Avatar } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons, Ionicons  } from '@expo/vector-icons';
import { selectDisplayName, selectPhotoURL } from '../redux/modules/AuthSlice';
import { useSelector, useDispatch } from 'react-redux';
import { firebase_db, auth } from '../../../firebaseConfig';

const UpdateInfo = () => {

    const [isNickName, setIsNickName] = useState('');
    const [isEdit, setIsEdit] = useState('');
    const [isErr, setIsErr] = useState(null)
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState('');
    const [isImg, setIsImg] = useState(null);
    const getDisplayName = useSelector((state)=> state.userInfo.displayName);
    const getPhotoURL = useSelector((state)=> state.userInfo.photoURL)


    const handlerPickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission denied");
          return;
        }
    
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [3, 2],
          quality: 1,
        });
    
        if (!result.canceled) {
          dispatch(selectPhotoURL(result.uri));
        }
      };
    
    const longPressHandler = () => {
        Alert.alert('','기본 이미지로 바꾸시겠습니까?', [
            {
                text : "기본 이미지로 변경",
                onPress : () => {dispatch(selectPhotoURL(null))}
            },
            {
                text : '취소하기'
            }

    ]
    )
    }

    const editButton = (e) => {
        setIsEdit(e);
    }

    const nickNameDuplication = () => {
        try{
            firebase_db.ref('users').orderByChild('profile/UserName')
            .equalTo(isNickName)
            .once('value')
            .then((snapshot) => {
                console.log(snapshot)
                if(snapshot.exists()){
                    setIsErr('impossible')
                }else{
                    dispatch(selectDisplayName(isNickName))
                    setIsErr('possible')
                }
            })
        }catch{

        }
    }

    const imgaeHandler = async() => {
     try{
        await auth.currentUser.updateProfile({
            PhotoURL : getPhotoURL
        })
        .then(()=>{
        firebase_db.ref('users/' + auth.currentUser.uid + '/profile').update({
            PhotoURL : getPhotoURL
        })})
        .then(()=>{
            console.log('성공')
            Alert.alert('변경되었습니다','',[{
                text: '닫기'
            }])
        })
     }catch{
        Alert.alert('문제가 생겼습니다.','잠시 후 다시 시도해 주십시오.', [{
            text : "닫기",
        }])

     }
    }

    const nicknameHandler = async() => {
        try{
            if(isErr === 'possible'){
                await auth.currentUser.updateProfile({
                    displayName : getDisplayName,
                })
                .then(()=>{
                firebase_db.ref('users/' + auth.currentUser.uid + '/profile').update({
                    UserName : getDisplayName
                })})
                .then(()=>{
                    console.log('성공')
                    Alert.alert('변경되었습니다','',[{
                        text: '닫기'
                    }])
                })
            }
           }catch{
            Alert.alert('문제가 생겼습니다.','잠시 후 다시 시도해 주십시오.', [{
                text : "닫기",
            }])
        }
       }


       

       useEffect(() => {
         const userId = auth.currentUser.uid;
     
         const userProfileRef = firebase_db.ref(`users/${userId}/profile`);
         userProfileRef.on('value', (snapshot) => {
           const profileData = snapshot.val();
           if (profileData) {
             setDisplayName(profileData.UserName);
           }
         });
     
         return () => {
           userProfileRef.off('value');
         };
       }, []);
     

    
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={{ fontSize: wp("3.5%") }}>나만의</Text>
          <Text
            style={{
              fontSize: wp("4.5%"),
              fontWeight: "600",
              color: "burlywood",
            }}
          >
            {" "}
            프로필
          </Text>
          <Text style={{ fontSize: wp("3.5%") }}>을 꾸며보세요.</Text>
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.imagePcikContainer}>
            <TouchableOpacity
              onPress={handlerPickImage}
              onLongPress={longPressHandler}
            >
              {getPhotoURL ? (
                <Avatar.Image
                  style={styles.profileImage}
                  source={{ uri: getPhotoURL }}
                  size={wp("20%")}
                />
              ) : (
                <Avatar.Icon
                  style={styles.profileImage}
                  icon={"account-outline"}
                  size={wp("20%")}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.imageDescContainer}>
            <Text style={{ fontSize: wp("4.5%") }}>
              나의 대표 사진을 골라주세요!
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: wp("3.5%") }}>노출되는 곳 :</Text>
              <Text
                style={{ fontSize: wp("3.5%"), color: "blue", paddingLeft: 5 }}
              >
                사이드메뉴, 작성 게시물, 리뷰
              </Text>
            </View>
            <Text style={{ fontSize: wp("3.5%"), marginTop: 5 }}>
              사진을 길게 누르면 기본 이미지로 변경됩니다.
            </Text>
            <TouchableOpacity onPress={imgaeHandler}
            style={styles.changeButton}>
                <Text style={{fontSize:wp('4%')}}>변경하기</Text>
            </TouchableOpacity>
          </View>
          
        </View>
        <KeyboardAvoidingView>
          <View style={styles.nickNameContainer}>
            <Text style={styles.nickNameTitle}>닉네임</Text>
            <View style={styles.nickNameCard}>
              <View style={styles.operatingNickNameCard}>
                <View style={styles.operatingNickName}>
                  <Text style={styles.ninckNameDescText}>현재 닉네임</Text>
                  <Text style={styles.nickNmaeText}>{displayName}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => editButton("변경")}
                  style={styles.confirmDuplicateButton}
                >
                  <Text style={{ fontSize: wp("3.5%") }}>변 경</Text>
                </TouchableOpacity>
              </View>
              {isEdit === "변경" && (
                <View style={styles.operatingNickNameCard}>
                  <View style={styles.operatingNickName}>
                    <Text style={styles.ninckNameDescText}>변경 후 닉네임</Text>
                    <TextInput
                      value={isNickName}
                      onChangeText={setIsNickName}
                      fontSize={wp("3%")}
                      style={styles.nickNmaeText}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={nickNameDuplication}
                    style={styles.confirmDuplicateButton}
                  >
                    <Text style={{ fontSize: wp("3.5%") }}>중복확인</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={styles.errContainer}>
            {isErr === "possible" && (
              <Text style={{ fontSize: wp("3.5%"), }}>
                사용 가능한 닉네임입니다.
              </Text>
            )}
            {isErr === "impossible" && (
              <Text style={{ fontSize: wp("3.5%"), color: "red" }}>
                이미 존재하는 닉네임입니다.
              </Text>
            )}
            </View>
            <TouchableOpacity onPress={nicknameHandler}
            style={[styles.changeButton, {alignSelf:'center', marginLeft:80,}]}>
                <Text style={{fontSize:wp('4%')}}>변경하기</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
}

export default UpdateInfo

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },

    headerContainer : {
        borderWidth : 0,
        width : wp('98%'),
        height : hp('5%'),
        alignSelf : 'center',
        marginTop : 10,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'flex-end'
    },

    imageContainer : {
        borderWidth : 0,
        width : wp('98%'),
        alignSelf : 'center',
        height : hp('20%'),
        marginVertical : 10,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-around',
        backgroundColor : 'white',
        elevation : 5,
        borderRadius : 10,
    },

    imagePcikContainer : {
        height : hp('15%'),
        width : hp('15%'),
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'darkgray',
        opacity : 0.8,
        marginLeft : 10,
        borderRadius: 10,
    },

    imageDescContainer : {
        height : hp('15%'),
        width : wp('70%'),
        justifyContent : 'center',
        alignItems : 'flex-start',
        paddingLeft: 10,
    },

    profileImage : {
        backgroundColor : 'ghostwhite'
    },

    nickNameContainer : {
        width : wp('98%'),
        height : hp('35%'),
        alignSelf : 'center',
        borderRadius : 10,
        elevation : 5,
        backgroundColor : 'white',
    },

    nickNameTitle : {
        fontSize : wp('4.5%'),
        fontWeight : '500',
        marginVertical : 10,
        paddingLeft : 10,
    },

    nickNameCard : {
        width : wp('95%'),
        height : hp('15%'),
        alignSelf : 'center'
    },

    preNickName : {
        borderWidth : 1,
        width : wp('70%'),
        height : hp('5%'),
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },

    ninckNameDescText : {
        fontSize : wp('3.5%')
    },

    nickNmaeText : {
        fontSize : wp('3.5%'),
        borderWidth : 1,
        height : hp('5%'),
        width : wp('40%'),
        textAlign : 'center',
        textAlignVertical : 'center',
        borderRadius : 5,
    },

    operatingNickName : {
        flexDirection : 'row',
        height: hp('5%'),
        width : wp('70%'),
        justifyContent : 'space-between',
        alignItems : 'center',
        marginRight : 15,
    },

    operatingNickNameCard : {
        marginTop:10, 
        height:hp('5%'), 
        width:wp('90%'), 
        flexDirection:'row',
        justifyContent : 'flex-start',
        alignItems : 'center'
    },

    confirmDuplicateButton : {
        borderWidth : 1,
        height : hp('4.5%%'),
        width : wp('15%'),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,
    },

    errContainer : {
        width:wp('95%'), 
        alignSelf:'center',
         height:hp('5%'),
         justifyContent : 'center'
    },

    changeButton : {
        borderWidth : 1,
        height : hp('4%'),
        width : wp('60%'),
        marginTop : 10,
        borderRadius : 5,
        justifyContent : 'center',
        alignItems : 'center'
    }
})