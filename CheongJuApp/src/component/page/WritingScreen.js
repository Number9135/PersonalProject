import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  Image,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native";
import PickerSelect from "../forms/PickerSelect";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function WritingScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isMajorCategory, setIsMajorCategory] = useState("");
  const [isMediumCategory, setIsMediumCategory] = useState("");
  const [images, setImages] = useState([]);
  const [isCamera, setIsCamera] = useState(false);

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
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 2],
      allowsMultipleSelection: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => asset.uri);
      if (images.length + newImages.length <= 5) {
        setImages([...images, ...newImages]);
      } else {
        alert("최대 5장까지 업로드 가능합니다.");
      }
    }
  };

  const [isTitle, setIsTitle] = useState("");

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
    <ScrollView showsVerticalScrollIndicator={false} Style={{flex:1}}>
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
          <View style={{width:wp('80%'), height:hp('15%'), justifyContent: 'center', alignItems:'center'}}>
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
      <View style={{justifyContent:'flex-start', width:wp('80%'), marginTop:5,}}>
      <Text style={{fontSize:wp('3%')}}>* 사진은 최대 5장까지 업로그 가능합니다.</Text>
      <Text style={{fontSize:wp('3%')}}>* 업로드된 사진을 클릭하면 해당 사진이 삭제됩니다.</Text>
      </View>
      <View style={styles.cateContainer}>
        <TouchableOpacity onPress={openModal} style={styles.cateButton}>
          <Text style={styles.buttonText}>분 류</Text>
        </TouchableOpacity>
        <Text style={styles.selectedCateText}>{isMajorCategory}</Text>
        <Text style={styles.selectedCateText}>{isMediumCategory}</Text>
      </View>

      <View style={styles.starContainer}>

      </View>

      <View style={styles.starContainer}>

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
    height : hp('25%')
  }
});
