import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput, Alert, ScrollView} from 'react-native';
import React, {useState} from 'react';
import { Avatar } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons, Ionicons  } from '@expo/vector-icons';
import { selectDisplayName, selectPhotoURL } from '../redux/modules/AuthSlice';
import { useSelector, useDispatch } from 'react-redux';

const UpdateInfo = () => {

    const [isNickName, setIsNickName] = useState('');
    const [isEdit, setIsEdit] = useState('');
    const dispatch = useDispatch();
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
    
  return (
    
        <ScrollView>
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={{fontSize:wp('3.5%')}}>나만의</Text>
            <Text style={{fontSize:wp('4.5%'), fontWeight:'600', color:'burlywood'}}> 프로필</Text>
            <Text style={{fontSize:wp('3.5%')}}>을 꾸며보세요.</Text>
        </View>
        <View style={styles.imageContainer}>
            <View style={styles.imagePcikContainer}>
                <TouchableOpacity onPress={handlerPickImage}
                onLongPress={longPressHandler}>
                    {
                        getPhotoURL ? (
                            <Avatar.Image style={styles.profileImage}
                            source={{uri : getPhotoURL}}
                            size={wp('20%')}/>
                        ) : (
                            <Avatar.Icon style={styles.profileImage}
                            icon={'account-outline'}
                            size={wp('20%')}/>
                        )
                    }
                    
                </TouchableOpacity>
            </View>
            <View style={styles.imageDescContainer}>
                <Text style={{fontSize:wp('4.5%')}}>
                    나의 대표 사진을 골라주세요!
                </Text>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                <Text style={{fontSize:wp('3.5%')}}>
                    노출되는 곳 : 
                </Text>
                <Text style={{fontSize:wp('3.5%'), color:'blue', paddingLeft:5,}}>
                    사이드메뉴, 작성 게시물, 리뷰
                </Text>
                </View>
                <Text style={{fontSize:wp('3.5%'), marginTop:5,}}>사진을 길게 누르면 기본 이미지로 변경됩니다.</Text>
            </View>
        </View>
        <KeyboardAvoidingView>
        <View style={styles.nickNameContainer}>
            <Text style={styles.nickNameTitle}>닉네임</Text>
            <View style={styles.nickNameCard}>
                <View style={styles.operatingNickNameCard}>
                    <View style={styles.operatingNickName}>
                    <Text style={styles.ninckNameDescText}>현재 닉네임</Text>
                    <Text style={styles.nickNmaeText}>dbstn9135</Text>
                    </View>
                    <TouchableOpacity onPress={()=>editButton('변경')}
                    style={styles.confirmDuplicateButton}>
                        <Text style={{fontSize:wp('3.5%')}}>변 경</Text>
                    </TouchableOpacity>
                </View>
                    {
                        isEdit === '변경' && (
                <View style={styles.operatingNickNameCard}>
                    <View style={styles.operatingNickName}>
                        <Text style={styles.ninckNameDescText}>변경 후 닉네임</Text>
                        <TextInput
                            value={isNickName}
                            onChangeText={setIsNickName}
                            fontSize={wp('3%')}
                        style={styles.nickNmaeText}/>
                    </View>
                    <TouchableOpacity style={styles.confirmDuplicateButton}>
                        <Text style={{fontSize:wp('3.5%')}}>중복확인</Text>
                    </TouchableOpacity>
                </View>
                )
                }
            </View>
            
        </View>
        </KeyboardAvoidingView>
    </View>
    </ScrollView>
   
  )
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
        height : hp('30%'),
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
        borderWidth : 1,
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
    }

})