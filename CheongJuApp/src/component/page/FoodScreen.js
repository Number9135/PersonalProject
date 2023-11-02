import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { ScrollView } from "react-native";
import { firebase_db } from "../../../firebaseConfig";
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/core";

const FoodScreen = () => {

  const navigation = useNavigation();

  const [fetchData, setFetchData] = useState([])

  const [selectors, setSelectors] = useState([]);

  const [numColumns, setNumColumns] = useState(2);

  const [foodData, setFoodData] = useState({});

  useEffect(() => {
    firebase_db
      .ref("/음식")
      .once("value")
      .then((snapshot) => {
        console.log(snapshot);
        setFoodData(snapshot.val());
      });
  }, []);

  console.log(foodData);

  const formattedData = Object.values(foodData);

  const selectorMenu = (selectorButton) => {
    if (selectorButton == "all") {
      return setSelectors(fetchData);
    } else {
      return setSelectors(
        fetchData.filter((d) => d.username == selectorButton)
      );
    }
  };
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cateContainer}>
        <TouchableOpacity
          onPress={() => {
            handleButtonPress("all");
            selectorMenu("all");
          }}
          style={[
            styles.cateButton,
            selectedButton === "all" && styles.buttonBackground,
          ]}
        >
          <Text style={[styles.cateButtonText]}>전체</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleButtonPress("isKoreaFood");
            selectorMenu("Bret");
          }}
          style={[
            styles.cateButton,
            selectedButton === "isKoreaFood" && styles.buttonBackground,
          ]}
        >
          <Text
            style={[
              styles.cateButtonText,
              selectedButton === "isKoreaFood" && styles.selectedTextColor,
            ]}
          >
            한식
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleButtonPress("isJapanFood");
            selectorMenu("Delphine");
          }}
          style={[
            styles.cateButton,
            selectedButton === "isJapanFood" && styles.buttonBackground,
          ]}
        >
          <Text
            style={[
              styles.cateButtonText,
              selectedButton === "isJapanFood" && styles.selectedTextColor,
            ]}
          >
            일식
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleButtonPress("isChinaFood");
          }}
          style={[
            styles.cateButton,
            selectedButton === "isChinaFood" && styles.buttonBackground,
          ]}
        >
          <Text
            style={[
              styles.cateButtonText,
              selectedButton === "isChinaFood" && styles.selectedTextColor,
            ]}
          >
            중식
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleButtonPress("isWesternFood");
          }}
          style={[
            styles.cateButton,
            selectedButton === "isWesternFood" && styles.buttonBackground,
          ]}
        >
          <Text
            style={[
              styles.cateButtonText,
              selectedButton === "isWesternFood" && styles.selectedTextColor,
            ]}
          >
            양식
          </Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <FlatList
          data={formattedData}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{navigation.navigate('음식상세페이지', {
             title : item.title,
             image : item.image,
             desc : item.desc,
             firstRating : item.firstRating,
             secondRating : item.secondRating,
             thirdRating : item.thirdRating,
             totalRating : item.totalRating,
             uid : item.uid
            })}}
             style={styles.columnContainer}>
              <View style={styles.imageContainer}>
                <Image
                  resizeMode="cover"
                  style={styles.cateImage}
                  source={{ uri: item.image[0] }}
                />
              </View>
              <View style={styles.descContainer}>
                <View style={styles.titleContainer}>
                  <Text style={{fontSize:wp('4.5%'), fontWeight:'700'}}>{item.title}</Text>
                </View>
                <View style={styles.scoreContainer}>
                  <Text style={{marginRight:5, fontSize:wp('4%')}}>평점</Text>
                  <EvilIcons name="star" size={wp('4%')} color="gray" />
                  <Text style={{fontSize:wp('3.5%')}}>{item.totalRating}</Text>
                  <Text style={{fontSize:wp('2.5%'), marginLeft:5,}}>(1,123)</Text>
                </View>
              </View>
            </TouchableOpacity> 
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default FoodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  cateContainer: {
    borderWidth: 0,
    width: wp("100%"),
    height: hp("6%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  cateButton: {
    borderWidth: 0,
    height: hp("5%"),
    width: wp("15%"),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  cateButtonText: {
    fontSize: wp("4%"),
  },

  selectedTextColor: {
    color: "white",
  },

  buttonBackground: {
    backgroundColor: "gray",
  },

  columnContainer: {
    borderWidth: 0,
    height: hp("25%"),
    width: wp("45%"),
    margin: 10,
    elevation: 7,
    backgroundColor: "ghostwhite",
    alignItems: "center",
  },

  cateImage: {
    height: hp("15%"),
    width: wp("43%"),
  },

  imageContainer: {
    borderBottomWidth: 0,
    height: hp("17%"),
    width: wp("45%"),
    justifyContent: "center",
    alignItems: "center",
  },

  descContainer: {
    borderWidth: 0,
    height: hp("8%"),
    width: wp("42%"),
    
  },

  scoreContainer : {
    borderWidth:0, 
    width:wp('40%'),
    height : hp('4%'),
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingLeft : 10,
  },

  titleContainer : {
    borderWidth:0,
    width:wp('40%'),
    height : hp('3.5%'),
    justifyContent : 'center',
    alignItems : 'flex-start',
    paddingLeft : 10,
  }
});
