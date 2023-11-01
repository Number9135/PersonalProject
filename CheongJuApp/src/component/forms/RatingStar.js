import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import StarRating from 'react-native-star-rating';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import PickerSelect from './PickerSelect';
import { useSelector, useDispatch } from 'react-redux';
import { selectFirstRating, selectSecondRating, selectThirdRating } from '../redux/modules/RatingStarSlice';


export default function RatingStar() {
  const dispatch = useDispatch();

  const [isFirstCategory, setIsFirstCategory] = useState('');
  const [isSecondtCategory, setIsSecondCategory] = useState('');
  const [isThirdCategory, setIsThirdCategory] = useState('');

  const firstRating = useSelector((state)=>state.ratingStar.firstRatingStar);
  const secondRating = useSelector((state)=>state.ratingStar.secondRatingStar);
  const thirdRating = useSelector((state)=>state.ratingStar.thirdRatingStar);

  const pickMajorCategory = useSelector((state) => state.category.majorCategory)
 

  useEffect(() => {
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

  

  const onFirstStarRatingPress = (rating) => {
    dispatch(selectFirstRating(rating))
  };

  const onSecondStarRatingPress = (rating) => {
    dispatch(selectSecondRating(rating))
  };

  const onThirdStarRatingPress = (rating) => {
    dispatch(selectThirdRating(rating))
  };

  const averageRating = ((firstRating+secondRating+thirdRating)/3).toFixed(1)


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
              rating={firstRating}
              selectedStar={(rating) => onFirstStarRatingPress(rating)}
            />
          </View>
          <View style={styles.ratingScaleTextContainer}>
            <Text style={styles.ratingScaleText}>{firstRating}/5</Text>
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
              rating={secondRating}
              selectedStar={(rating) => onSecondStarRatingPress(rating)}
            />
          </View>
          <View style={styles.ratingScaleTextContainer}>
            <Text style={styles.ratingScaleText}>{secondRating}/5</Text>
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
              rating={thirdRating}
              selectedStar={(rating) => onThirdStarRatingPress(rating)}
            />
          </View>
          <View style={styles.ratingScaleTextContainer}>
            <Text style={styles.ratingScaleText}>{thirdRating}/5</Text>
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
