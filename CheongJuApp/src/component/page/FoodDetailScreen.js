import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';

const FoodDetailScreen = ({route}) => {

  const {
    title,
    image,
    desc,
    firstRating,
    secondRating,
    thirdRating,
    totalRating,
    uid,
  } = route.params;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      // 이미지가 선택되었을 때의 처리 로직
      // 선택된 이미지를 사용하거나 업로드 등을 할 수 있습니다.
      console.log(result.uri);
      //...
    }
  };


  return (
    <View>
      <Text>{title}</Text>
      <Image source={{uri:image}}/>
      <Text>{desc}</Text>
      <Text>{firstRating}</Text>
      <Text>{secondRating}</Text>
      <Text>{secondRating}</Text>
      <Text>{thirdRating}</Text>
      <Text>{totalRating}</Text>
    </View>
  );
}

export default FoodDetailScreen

const styles = StyleSheet.create({})