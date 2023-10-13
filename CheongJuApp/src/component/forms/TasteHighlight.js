import React, { useRef, useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import Swiper from 'react-native-swiper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { useNavigation } from '@react-navigation/core';



const TasteHighlight = () => {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.scrollBy(1, true);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, []);


  const onIndexChanged = (index) => {
    setCurrentPage(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{fontSize:wp('4%'), fontWeight:'700', alignItems:'center'}}>맛집 랭크</Text>
        <Text style={{fontSize:wp('3%'), color:'gray', alignSelf:'center'}}>사용자 참여가 가장많은 상위 5개가 보여집니다.</Text>
      </View>
      <Swiper ref={swiperRef} onIndexChanged={onIndexChanged} showsPagination={false} spaceBetween={20}>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('사이드메뉴')}}
        style={styles.slideContainer}>
            <View style={styles.sliderImage}>
                <Image style={{height:hp('17%'), width:wp('80%'), borderRadius:10,}} reszieMode='contain' source={require('../../../assets/testImage.jpg')} />
            </View>
            <View style={styles.descContainer}>
                <View>
                    <Text>청년치킨</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text>별점 4.5</Text>
                    <Text style={{fontSize:wp('3%'), alignSelf:'center', paddingLeft:5, color:'darkgray'}}>(10명 참여)</Text>
                </View>
            </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8}
        style={styles.slideContainer}>
            <View style={styles.sliderImage}>
                <Image style={{height:hp('17%'), width:wp('80%'), borderRadius:10,}} reszieMode='contain' source={require('../../../assets/testImage.jpg')} />
            </View>
            <View style={styles.descContainer}>
                <View>
                    <Text>청년치킨</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text>별점 4.5</Text>
                    <Text style={{fontSize:wp('3%'), alignSelf:'center', paddingLeft:5, color:'darkgray'}}>(10명 참여)</Text>
                </View>
            </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8}
        style={styles.slideContainer}>
            <View style={styles.sliderImage}>
                <Image style={{height:hp('17%'), width:wp('80%'), borderRadius:10, alignSelf:'center'}} reszieMode='contain' source={require('../../../assets/testImage.jpg')} />
            </View>
            <View style={styles.descContainer}>
                <View>
                    <Text>청년치킨</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text>별점 4.5</Text>
                    <Text style={{fontSize:wp('3%'), alignSelf:'center', paddingLeft:5, color:'darkgray'}}>(10명 참여)</Text>
                </View>
            </View>
        </TouchableOpacity>
       
      </Swiper>
        <TouchableOpacity style={styles.navTasteStyle}>
            <Text style={styles.navTastText}>맛집 페이지로 이동하기</Text>
        </TouchableOpacity>
    </View>
  );
};

export default TasteHighlight;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    height: hp("35%"),
    width: wp("100%"),
    marginTop : 50,
    alignSelf: "center",
    justifyContent : 'center'
    
  },

  titleContainer : {
    flexDirection:'row', 
    justifyContent:'space-between', 
    width : wp('80%'), 
    alignSelf:'center', 
    justifyContent : 'space-between'
  },

  slideContainer: {

    borderWidth: 0,
    height: hp("25"),
    borderRadius: 15,
    backgroundColor: "white",
    opacity: 1,
    elevation: 1.5,
    marginTop: 5,
    shadowColor : 'gray',
    shadowOffset : {
        elevation : 1,
    },
    alignSelf : 'center'
  },

  sliderImage :{
    height:hp('17%'), 
    width:wp('80%'), 
    borderRadius:10, 
    alignItems:'center', 
    backgroundColor:'gainsboro',
    elevation : 1,
  },

  navTasteStyle : {
    height : hp('4.5%'),
    width : wp('80%'),
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius : 10,
    backgroundColor : 'white',
    elevation : 1,
    alignSelf : 'center'

  },

  navTastText : {
    fontSize : wp('4%')
  },

  descContainer : {
    height : hp('8%'),
    width : wp('80%'),
    flexDirection : 'row',
    alignItems : 'center',
    paddingLeft : 10,
    justifyContent : 'space-between',
    paddingRight : 10,
  }
});