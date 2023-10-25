import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TouchableOpacity } from 'react-native';
import PickerSelect from '../forms/PickerSelect';



export default function WritingScreen() {

const [modalVisible, setModalVisible] = useState(false)


  const [isTitle, setIsTitle] = useState('')

  const openModal = () =>{
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }


  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>게시물 작성</Text>
      <TextInput
        value={isTitle}
        style={styles.titleTextInput}
        onChangeText={setIsTitle}
        placeholder='제목을 입력하세요.'
        fontSize={wp('4%')} />
      <View style={styles.cateContainer}>
        <TouchableOpacity onPress={openModal}
        style={styles.cateButton}>
          <Text style={styles.buttonText}>대분류</Text>
        </TouchableOpacity>
      </View>
        <PickerSelect 
        modalVisible={modalVisible}
        closeModal={closeModal}/>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleTextInput: {
    width: wp('80%'),
    height: hp('5%'),
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: hp('2%'),
    paddingHorizontal: wp('2%'),
    fontSize: wp('4%'),
  },
  cateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('2%'),
  },
  cateButton: {
    width: wp('35%'),
    height: hp('5%'),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: wp('3%'),
  },

  cateSelector : {
    borderWidth : 1, 
    width : wp('100%'),
    flexDirection : 'row',
    justifyContent : 'space-around'
  },

  pickerStyle : {
    width : wp('20%'),
    height : hp('10%')
  }
});
