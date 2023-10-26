import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";
import DataList from "../../../DataList.json";
import { useNavigation } from "@react-navigation/core";

const PickerSelect = ({ modalVisible, closeModal, onChangeMajorCategory, onChangeMediumCategory }) => {

  const navigation = useNavigation();

  const [numColumns, setNumColumns] = useState(2);

  const [isFocus, setIsFocus] = useState(null);

  const handleButtonMajorPress = (button) => {
    setIsFocus(button);
    onChangeMajorCategory(button);
  };

  const handleButtonMediumPress = (button) => {
    onChangeMediumCategory(button);
    closeModal();
  }

  return (
    <Modal visible={modalVisible} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>카테고리를 분류하여 주세요</Text>
        </View>
        <View style={styles.cateContainer}>
          <View style={styles.majorClassificationContainer}>
            <View style={styles.detailCateContainer}>
              <Text style={styles.detailCateText}>대분류</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                handleButtonMajorPress("음식")
                }}
              style={[
                styles.majorCateButton,
                isFocus === "음식" && styles.background,
              ]}
            >
              <Text style={styles.majorCateText}>음식</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleButtonMajorPress("술집");
              }}
              style={[
                styles.majorCateButton,
                isFocus === "술집" && styles.background,
              ]}
            >
              <Text style={styles.majorCateText}>술집</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleButtonMajorPress("까페&디저트");
              }}
              style={[
                styles.majorCateButton,
                isFocus === "까페&디저트" && styles.background,
              ]}
            >
              <Text style={styles.majorCateText}>까페%디저트</Text>
            </TouchableOpacity>
          </View>
          <SafeAreaView style={styles.mediumClassificationContainer}>
            {isFocus === "음식" && (
              <FlatList
                data={DataList.FoodMediumClassification}
                numColumns={numColumns}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=>handleButtonMediumPress(`${item.title}`)}
                  style={styles.mediumClassificationButton}>
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            )}
          </SafeAreaView>
          <View></View>
        </View>
        <TouchableOpacity onPress={closeModal}>
          <Text>나가기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PickerSelect;

const styles = StyleSheet.create({
  modalContainer: {
    borderWidth: 1,
    height: hp("70%"),
    width: wp("90%"),
    alignSelf: "center",
    top: 80,
    backgroundColor: "white",
  },

  headerContainer: {
    borderBottomWidth: 1,
    height: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
  },

  headerText: {
    fontSize: wp("4%"),
    fontWeight: "400",
  },

  cateContainer: {
    borderBottomWidth: 1,
    height: hp("60%"),
    flexDirection: "row",
  },

  majorClassificationContainer: {
    borderRightWidth: 1,
    width: wp("25%"),
  },

  detailCateContainer: {
    borderBottomWidth: 1,
    height: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
  },

  detailCateText: {
    fontSize: wp("4%"),
  },

  majorCateButton: {
    borderBottomWidth: 1,
    height: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
  },

  majorCateText: {
    fontSize: wp("3.5%"),
  },

  background: {
    backgroundColor: "gray",
  },

  mediumClassificationButton: {
    borderWidth: 1,
    height: hp("5%"),
    width: wp("30%"),
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  mediumClassificationText: {},

  mediumClassificationContainer: {
    width: wp("65%"),
    justifyContent: "center",
    alignItems: "center",
  },
});
