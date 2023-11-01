import {  View, Text, StyleSheet, TextInput, Platform, Image, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import {  widthPercentageToDP as wp, heightPercentageToDP as hp, } from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native";
import PickerSelect from "../forms/PickerSelect";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import RatingStar from "../forms/RatingStar";
import { KeyboardAvoidingView } from "react-native";
import { firebase_db } from "../../../firebaseConfig";
import { auth } from "../../../firebaseConfig";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { selectSecondRating, selectThirdRating, selectFirstRating } from "../redux/modules/RatingStarSlice";


export default function WritingScreen({averageRating, kindOfCate, kindOfStar}) {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isMajorCategory, setIsMajorCategory] = useState("");
  const [isMediumCategory, setIsMediumCategory] = useState("");
  const [images, setImages] = useState([]);
  const [isCamera, setIsCamera] = useState(false);
  const [isDesc, setIsDesc] = useState('')
  const [isTitle, setIsTitle] = useState("");
  const firstRating = useSelector((state)=>state.ratingStar.firstRatingStar);
  const secondRating = useSelector((state)=>state.ratingStar.secondRatingStar);
  const thirdRating = useSelector((state)=>state.ratingStar.thirdRatingStar);
  const totalRating = ((firstRating+secondRating+thirdRating)/3).toFixed(1)


  const sucessAlert = () => {
  return (
    Alert.alert('게시물이 작성되었습니다.', '이전 페이지로 돌아갑니다.',[
        {
        onPress : () => navigation.goBack()
      }
      ])
  )
}


 

  auth.onAuthStateChanged((user) => {
    if(user){
      uid = user.uid
    }
  })

  const errMsg = "올리기 실패"

  const onSubmit = async() => {
    try{
      await firebase_db.ref(`/${isMajorCategory}`).push({
        uid : uid,
        title : isTitle,
        image : images,
        majorCate : isMajorCategory,
        mediumCate : isMediumCategory,
        desc : isDesc,
        firstRating : firstRating,
        secondRating : secondRating,
        thirdRating : thirdRating,
        totalRating : totalRating,
      })
      .then(()=>{sucessAlert()
      setIsTitle('')
      setImages([])
      setIsMajorCategory("")
      setIsMediumCategory("")
      setIsDesc("")
      dispatch(selectFirstRating(0))
      dispatch(selectSecondRating(0))
      dispatch(selectThirdRating(0))
    })
    }catch{
      console.log(errMsg)
    }
    
  }

  const goBackHandler = () => {
    Alert.alert('', '작성을 취소하시겠습니까?',[
      {
        text : "취소하하기",
        onPress : () => {navigation.goBack()
          setIsTitle('')
          setImages([])
          setIsMajorCategory("")
          setIsMediumCategory("")
          setIsDesc("")
          dispatch(selectFirstRating(0))
          dispatch(selectSecondRating(0))
          dispatch(selectThirdRating(0))},
        
    },
    {
        text : "계속작성하기",
      
    },
    ])
  }

  const getPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("사진을 업로드하려면 사진첩 권한이 필요합니다.");
        return false;
      }
      return true;
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handlerPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 2],
      allowsMultipleSelection: true,
      quality: 1,
    });


    if (!result.canceled) {
      const newImages = result.assets.map((asset) => asset.uri);
      if (images.length + newImages.length <= 5) {
        setImages([...images, ...newImages]);
      } else {
        alert("최대 5장까지 업로드 가능합니다.");
      }
    }
  };

  

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const hnadleMajorCategoryButton = (category) => {
    setIsMajorCategory(category);
  };

  const hadnleMediumCategotyButton = (category) => {
    setIsMediumCategory(category);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} Style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.headerText}>게시물 작성</Text>
        <TextInput
          value={isTitle}
          style={styles.titleTextInput}
          onChangeText={setIsTitle}
          placeholder="제목을 입력하세요."
          fontSize={wp("4%")}
        />
        <View style={styles.photoContainer}>
          {images.length > 0 &&
            images.map((uri, index) => (
              <TouchableOpacity key={index} onPress={() => removeImage(index)}>
                <Image source={{ uri }} style={styles.imageStyle} />
              </TouchableOpacity>
            ))}
          {images < 1 && (
            <View
              style={{
                width: wp("80%"),
                height: hp("15%"),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={handlerPickImage}
                style={styles.cameraButton}
              >
                <Entypo name="camera" size={wp("10%")} color="black" />
                <Text style={{ fontSize: wp("4%") }}>사진을 담아 보세요</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            width: wp("80%"),
            marginTop: 5,
          }}
        >
          <Text style={{ fontSize: wp("3%") }}>
            * 사진은 최대 3장까지 업로그 가능합니다.
          </Text>
          <Text style={{ fontSize: wp("3%") }}>
            * 업로드된 사진을 클릭하면 해당 사진이 삭제됩니다.
          </Text>
        </View>
        <View style={styles.cateContainer}>
          <TouchableOpacity onPress={openModal} style={styles.cateButton}>
            <Text style={styles.buttonText}>분 류</Text>
          </TouchableOpacity>
          <Text style={styles.selectedCateText}>{isMajorCategory}</Text>
          <Text style={styles.selectedCateText}>{isMediumCategory}</Text>
        </View>
        <View style={styles.starContainer}>
          <RatingStar/>
        </View>

        <View style={styles.descContainer}>
          <View
            style={{
              height: hp("5%"),
              borderBottomWidth: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: wp("4%") }}>내용을 기입하세요</Text>
          </View>
          <KeyboardAvoidingView style={{ height: hp("40%") }}>
            <TextInput
              style={{ height: hp("40%") }}
              multiline={true}
              value={isDesc}
              onChangeText={setIsDesc}
              fontSize={wp("3.5%")}
            />
          </KeyboardAvoidingView>
        </View>

        <View
          style={{
            flexDirection: "row",
            height: hp("10%"),
            width: wp("80%"),
            marginVertical: 10,
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity onPress={goBackHandler}
          style={[styles.buttonStyle, {backgroundColor:'darkgray'}]}>
            <Text style={styles.buttonText}>취소하기</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: wp("7%"),
              fontWeight: "300",
              alignSelf: "center",
              height: hp("6%"),
              color: "gray",
            }}
          >
            |
          </Text>
          <TouchableOpacity onPress={onSubmit}
          style={[styles.buttonStyle, {backgroundColor:'yellow'}]}>
            <Text style={styles.buttonText}>올리기</Text>
          </TouchableOpacity>
        </View>

        <PickerSelect
          onChangeMajorCategory={hnadleMajorCategoryButton}
          onChangeMediumCategory={hadnleMediumCategotyButton}
          modalVisible={modalVisible}
          closeModal={closeModal}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems : 'center'
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop : 20,
  },
  titleTextInput: {
    width: wp("80%"),
    height: hp("5%"),
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: hp("2%"),
    paddingHorizontal: wp("2%"),
    fontSize: wp("4%"),
  },
  cateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 0,
    height: hp("7%"),
    width: wp("80%"),
    flexDirection: "row",
  },
  cateButton: {
    width: wp("25%"),
    height: hp("4%"),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: wp("3%"),
  },

  cateSelector: {
    borderWidth: 1,
    width: wp("100%"),
    flexDirection: "row",
    justifyContent: "space-around",
  },

  pickerStyle: {
    width: wp("20%"),
    height: hp("10%"),
  },

  selectedCateText: {
    marginHorizontal: 15,
    fontSize: wp("3%"),
    backgroundColor: "cornsilk",
    width: wp("20%"),
    height: hp("4%"),
    elevation: 3,
    textAlign: "center",
    textAlignVertical: "center",
    opacity: 0.9,
  },

  photoContainer: {
    borderWidth: 1,
    height: hp("15%"),
    width: wp("80%"),
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },

  cameraButton: {
    justifyContent: "center",
    alignItems: "center",
  },

  imageStyle: {
    height: wp("20%"),
    width: wp("20%"),
    marginHorizontal: 10,
  },

  starContainer : {
    borderWidth : 1,
    width : wp('80%'),
    height : hp('25%'),
  },

  descContainer : {
    borderWidth : 1,
    width : wp('80%'),
    height : hp('40%'),
    marginTop : 10,

  },

  buttonStyle : {
    height : hp('5%'),
    width : wp('30%'),
    justifyContent : 'center',
    alignItems : 'center',
    elevation : 7,
  },

  buttonText : {
    fontSize : wp('3.5%')
  }
});
