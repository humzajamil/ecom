import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Pressable,
  TouchableNativeFeedback,
} from 'react-native';
import {Text, Icon, Image} from 'react-native-elements';
import axios from 'axios';
import {getCategories} from '../store/actions/categories';
import {useDispatch, useSelector} from 'react-redux';
import CategoriesCard from './CategoriesCard';
import {width, height} from '../constants/Dimensions';

const Shop = ({navigation}) => {
  const [pressed, setPressed] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  // const [rippleColor, setRippleColor] = useState('blue');
  // const [rippleOverflow, setRippleOverflow] = useState(false);
  const dispatch = useDispatch();

  const getCategoriesFunc = () => {
    dispatch(getCategories());
  };
  useEffect(() => {
    getCategoriesFunc();
  }, []);

  const categoriesFromState = useSelector(state => state.categories);

  const renderItem = ({item}) => (
    <View style={{flex: 1, paddingLeft: 10}}>
      <TouchableNativeFeedback
        key={item._id}
        style={{margin: 10}}
        onPress={() => {
          navigation.navigate('SubCategories', {
            title: item.category,
            id: item._id,
          });
        }}
        background={TouchableNativeFeedback.Ripple('#bfe0ff', false)}>
        <View>
          <CategoriesCard
            image={item.image}
            name={item.category}
            navigation={navigation}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );

  return (
    <View style={{flex: 1, marginTop: height * 0.02}}>
      <Text h5 style={{marginLeft: width * 0.03, fontWeight: 'bold'}}>
        Categories
      </Text>
      <FlatList
        contentContainerStyle={{marginTop: height * 0.03}}
        data={categoriesFromState}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        numColumns={5}
      />
    </View>
  );
};

export default Shop;

const styles = StyleSheet.create({});
