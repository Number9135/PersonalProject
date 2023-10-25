import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { Entypo } from '@expo/vector-icons';


const PickerSelect = ({modalVisible, closeModal}) => {

    

  return (
    <Modal visible={modalVisible} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.bigCateory}>

        </View>

        <View style={styles.middleCategory}>

        </View>

        <View style={styles.smallCategory}>

        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={closeModal}
          style={styles.buttonStyle}>
            <Entypo name="cross" size={wp('5%')} color="black" />
            <Text stle={styles.buttonText}>닫 기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default PickerSelect

const styles = StyleSheet.create({
    modalContainer : {
        borderWidth : 1,
        height : hp('70%'),
        width : wp('90%'),
        alignSelf : 'center',
        top : 80,
        backgroundColor : 'white'
    },

    bigCateory : {
        borderBottomWidth : 1,
        height : hp('15%')
    },

    middleCategory : {
        height : hp('25%'),
        borderBottomWidth : 1,
    },

    smallCategory : {
        borderBottomWidth :  1,
        height : hp('25%')
    },

    buttonContainer : {
        justifyContent :'center',
        alignItems : 'center',
        height : hp('5%')
    },

    buttonStyle : {
        flexDirection : 'row'
    },

    buttonText : {
        fontSize : wp('5%')
    }
})