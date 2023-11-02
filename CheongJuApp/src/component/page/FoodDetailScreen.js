import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import Swiper from 'react-native-swiper';
import { Entypo } from '@expo/vector-icons';

const FoodDetailScreen = ({ route }) => {
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

  const swiperRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isCateButton, setIsCateButton] = useState(false);

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

  const cateButton = (button) => {
    setIsCateButton(button)
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.swiperContainer}>
          <Swiper
            ref={swiperRef}
            onIndexChanged={onIndexChanged}
            showsPagination={false}
            spaceBetween={20}
          >
            <Image style={styles.imageStyle} source={{ uri: image[0] }} />
          </Swiper>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Entypo name="star" size={wp("5%")} color="gold" />
          <Text style={styles.ratingText}>{totalRating}</Text>
          <Text style={{ fontSize: wp("3%"), paddingLeft: 10 }}>
            (1,130명 참여)
          </Text>
        </View>
        <View style={{marginVertical:10,}}>
          <Text style={styles.locationText}>가게 위치정보</Text>
          <View style={styles.locationContainer}>

          </View>
        </View>
        <View style={styles.cateContainer}>
          <TouchableOpacity onPress={()=>{cateButton('사진')}}
          style={[styles.cateButton, isCateButton === '사진' && styles.bgColor]}>
            <Text style={[styles.buttonText, isCateButton === '사진' && {color : 'white'}]}>사진</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>cateButton('리뷰')}
          style={[styles.cateButton, isCateButton === '리뷰' && styles.bgColor]}>
            <Text style={[styles.buttonText, isCateButton === '리뷰' && {color : 'white'} ]}>리뷰</Text>
          </TouchableOpacity>
        </View>
        {
          isCateButton === '리뷰' && (
              <View style={styles.reviewContainer}>
                <Text>

                </Text>
              </View>
          )
        }
      </View>
    </ScrollView>
  );
};

export default FoodDetailScreen;

const styles = StyleSheet.create({
  container : {
    borderWidth : 0,
    flex : 1,

  },

  swiperContainer : {
    borderWidth : 0,
    height : hp('25%'),
    width : wp('100%')
  },

  imageStyle : {
    borderWidth : 1,
    height : hp('25%'),
    width : wp('100%'),
    borderRadius : 10,
  },

  titleContainer : {
    borderWidth : 0,
    height : hp('7%'),
    justifyContent : 'center'

  },

  titleText : {
    fontSize : wp('6%'),
    paddingLeft : 5,
    fontWeight : '600'
  },

  ratingContainer : {
    borderWidth : 0,
    height : hp('4%'),
    flexDirection : 'row',
    alignItems : 'center',
    paddingLeft : 5,
  },

  ratingText : {
    fontSize : wp('4%'),
    paddingLeft : 5,
  },

  locationContainer : {
    borderWidth : 0,
    height : hp('25%'),
    width : wp('98'),
    alignSelf : 'center',
    marginVertical : 5,
    borderRadius : 10,
    elevation : 6,
    backgroundColor : 'white'
  },

  locationText : {
    fontSize : wp('4%'),
    paddingLeft : 10,
  },

  cateContainer : {
    borderWidth : 0,
    height : hp('7%'),
    width : wp('100%'),
    flexDirection : 'row',
    justifyContent :'space-around',
    alignItems : 'center'
  },

  cateButton : {
    borderWidth : 1,
    height : hp('6%'),
    width : wp('47%'),
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius : 10,
  },

  buttonText : {
    fontSize : wp('4%'),
    fontWeight : '600',
    color : 'gray'
  },

  bgColor : {
    backgroundColor : 'darkgray'
  },

  reviewContainer : {
    borderWidth : 1,
    height : hp('60%'),
    width : wp('98%'),
    alignSelf : 'center',
    marginVertical : 10,
  }
})