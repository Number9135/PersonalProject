import { StyleSheet, Text, View, FlatList, SafeAreaView, Image } from 'react-native'
import React, {useEffect, useState,} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native';

const FoodScreen = () => {

    const [fetchData, setFetchData] = useState([]);

    const [selectors, setSelectors] = useState([]);

    const [numColumns, setNumColumns] = useState(2);
  
  
  useEffect(()=>{
    axios.get(`http://jsonplaceholder.typicode.com/users`)
    .then((response)=> {setFetchData(response.data)
    setSelectors(response.data)})
    .catch((error)=> console.log(error))
  }, [])
  
  const selectorMenu = (selectorButton) => {
    if(selectorButton == 'all'){
      return setSelectors(fetchData);
    }else{
      return setSelectors(fetchData.filter(d => d.username == selectorButton))
    }
  }
    const [selectedButton, setSelectedButton] = useState(null);
  
    const handleButtonPress = (button) => {
      setSelectedButton(button)
    };

  
    return (
      <View style={styles.container}>
        <View style={styles.cateContainer}>
          <TouchableOpacity 
              onPress={()=>{
                handleButtonPress('all')
                selectorMenu('all')
            }}
              style={[styles.cateButton, selectedButton === 'all' && styles.buttonBackground]}>
              <Text style={[styles.cateButtonText,]}>전체</Text>
          </TouchableOpacity>
  
          <TouchableOpacity onPress={()=>{handleButtonPress('isKoreaFood')
            selectorMenu('Bret')  
        }}
          style={[styles.cateButton, selectedButton === 'isKoreaFood' && styles.buttonBackground ]}>
              <Text style={[styles.cateButtonText, selectedButton === 'isKoreaFood' && styles.selectedTextColor]}>한식</Text>
          </TouchableOpacity>
  
          <TouchableOpacity onPress={()=>{handleButtonPress('isJapanFood')
          selectorMenu('Delphine')}}
          style={[styles.cateButton, selectedButton === 'isJapanFood' && styles.buttonBackground ]}>
              <Text style={[styles.cateButtonText, selectedButton === 'isJapanFood' && styles.selectedTextColor]}>일식</Text>
          </TouchableOpacity>
  
          <TouchableOpacity onPress={()=>{handleButtonPress('isChinaFood')}}
          style={[styles.cateButton, selectedButton === 'isChinaFood' && styles.buttonBackground ]}>
              <Text style={[styles.cateButtonText, selectedButton === 'isChinaFood' && styles.selectedTextColor]}>중식</Text>
          </TouchableOpacity>
  
          <TouchableOpacity onPress={()=>{handleButtonPress('isWesternFood')}}
          style={[styles.cateButton, selectedButton === 'isWesternFood' && styles.buttonBackground ]}>
              <Text style={[styles.cateButtonText, selectedButton === 'isWesternFood' && styles.selectedTextColor]}>양식</Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={{backgroundColor:'white'}}>
      <FlatList 
        data={selectors}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
            <TouchableOpacity style={styles.columnContainer}>
                <View style={styles.imageContainer}>
                    <Image resizeMode='contain' style={styles.cateImage} source={require('../../../assets/favicon.png')}/>
                </View>
                <Text>{item.username}</Text>
            </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>

      </View>
    )
  }
  
  export default FoodScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },

    cateContainer : {
        borderWidth : 0,
        width : wp('100%'),
        height : hp('6%'),
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-around'
    },

    cateButton : {
        borderWidth : 0,
        height : hp('5%'),
        width : wp('15%'),
        borderRadius : 10,
        justifyContent : 'center',
        alignItems : 'center'
    },

    cateButtonText : {
        fontSize : wp('4%'),

    },

    selectedTextColor : {
        color : 'white'
    },

    buttonBackground : {
        backgroundColor : 'gray'
    },

    columnContainer : {
        borderWidth  : 1, 
        height : hp('25%'),
        width : wp('45%'),
        margin : 10,
        elevation : 7,
        backgroundColor : 'ghostwhite',
        alignItems : 'center'
    },

    cateImage : {
        height : hp('10%'),
        width : wp('20%')
    },

    imageContainer : {
        borderBottomWidth : 1,
        height : hp('17%'),
        width : wp('45%'),
        justifyContent : 'center',
        alignItems : 'center'
    }
 


})