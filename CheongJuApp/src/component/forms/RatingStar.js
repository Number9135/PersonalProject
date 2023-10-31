import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import StarRating from 'react-native-star-rating';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import PickerSelect from './PickerSelect';
import { useSelector } from 'react-redux';


export default function RatingStar() {
  const [isFirstStarCount, setIsFirstStartCount] = useState(0);
  const [isSecondStarCount, setIsSecondStartCount] = useState(0);
  const [isThirdStarCount, setIsThirdStartCount] = useState(0);

  const [isFirstCategory, setIsFirstCategory] = useState('');
  const [isSecondtCategory, setIsSecondCategory] = useState('');
  const [isThirdCategory, setIsThirdCategory] = useState('');

  const pickMajorCategory = useSelector((state) => state.category.majorCategory)
  const {kindOfCate} = {
    isFirstCategory,
    isSecondtCategory,
    isThirdCategory
  }

  const {kindOfStar} = {
    isFirstStarCount,
    isSecondStarCount,
    isThirdStarCount,
  }
  console.log(pickMajorCategory)
  

  useEffect(() => {
    
    // 대분류 선택 값에 따라 맛, 위생, 서비스/친절 카테고리 변경
    if (pickMajorCategory === "음식") {
      setIsFirstCategory("맛");
      setIsSecondCategory("위생");
      setIsThirdCategory("서비스/친절");
    } else {
      setIsFirstCategory("양");
      setIsSecondCategory("위치");
      setIsThirdCategory("서비스");
    }
  }, [pickMajorCategory]);

  

  const onFristStarRatingPress = (rating) => {
    setIsFirstStartCount(rating);
  };

  const onSecondStarRatingPress = (rating) => {
    setIsSecondStartCount(rating);
  };

  const onThirdStarRatingPress = (rating) => {
    setIsThirdStartCount(rating);
  };





  const averageRating = ((isFirstStarCount+isSecondStarCount+isThirdStarCount)/3).toFixed(1)


  return (
    
    <View style={styles.container}>
      <View style={styles.headerContinaer}>
        <Text style={styles.ratingText}>음식 별점</Text>
        <Text style={[styles.ratingText, {marginLeft:5,}]}>평균 : {averageRating}</Text>
      </View>
      
        <View style={styles.contentStarContainer}>
          <View style={styles.starTextView}>
            <Text style={styles.contentStarText}>{isFirstCategory}</Text>
          </View>
          <View style={styles.starRatingScale}>
            <StarRating
            emptyStarColor='gray'
            fullStarColor='gray'
              starStyle={{ borderStartColor: "yellow" }}
              starSize={wp("5%")}
              disabled={false}
              maxStars={5}
              rating={isFirstStarCount}
              selectedStar={(rating) => onFristStarRatingPress(rating)}
            />
          </View>
          <View style={styles.ratingScaleTextContainer}>
            <Text style={styles.ratingScaleText}>{isFirstStarCount}/5</Text>
          </View>
        </View>

        <View style={styles.contentStarContainer}>
          <View style={styles.starTextView}>
            <Text style={styles.contentStarText}>{isSecondtCategory}</Text>
          </View>
          <View style={styles.starRatingScale}>
            <StarRating
              emptyStarColor='gray'
              fullStarColor='gray'
              starSize={wp("5%")}
              disabled={false}
              maxStars={5}
              rating={isSecondStarCount}
              selectedStar={(rating) => onSecondStarRatingPress(rating)}
            />
          </View>
          <View style={styles.ratingScaleTextContainer}>
            <Text style={styles.ratingScaleText}>{isSecondStarCount}/5</Text>
          </View>
        </View>

        <View style={styles.contentStarContainer}>
          <View style={styles.starTextView}>
            <Text style={styles.contentStarText}>{isThirdCategory}</Text>
          </View>
          <View style={styles.starRatingScale}>
            <StarRating
            emptyStarColor='gray'
            fullStarColor='gray'
              starStyle={{ borderStartColor: "yellow" }}
              starSize={wp("5%")}
              disabled={false}
              maxStars={5}
              rating={isThirdStarCount}
              selectedStar={(rating) => onThirdStarRatingPress(rating)}
            />
          </View>
          <View style={styles.ratingScaleTextContainer}>
            <Text style={styles.ratingScaleText}>{isThirdStarCount}/5</Text>
          </View>
        </View>
        
       
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent : 'space-around',

  },
  ratingText: {
    fontSize: wp('4%'),
    marginBottom: 20,
  },

  headerContinaer : {
  flexDirection : 'row'
},

  contentStarContainer : {
    flexDirection : 'row',
    width : wp('80%'),
    alignItems : 'center',
    justifyContent :'space-between'
  },

  contentStarText : {
    fontSize : wp('3.5%'),

  },

  starTextView : {
    width : wp('25%'),
    alignItems : 'center',
    height : hp('4%')
  },

  starRatingScale : {
    height : hp('4%'),
  },

  ratingScaleText : {
    fontSize : wp('4%'),

  },

  ratingScaleTextContainer : {
    height : hp('4%'),
    width : wp('10%'),
  }
});
