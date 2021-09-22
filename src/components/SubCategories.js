import React, {useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import {getSubCategories} from '../store/actions/subCategories';
import {useDispatch, useSelector} from 'react-redux';
import SubCategoriesCard from './SubCategoriesCard';
import {height, width} from '../constants/Dimensions';

const SubCategories = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, []);

  const dispatch = useDispatch();
  const getSubCategoriesFunc = () => {
    dispatch(getSubCategories());
  };
  useEffect(() => {
    getSubCategoriesFunc();
  }, []);

  const subCategoriesFromState = useSelector(state =>
    state.subCategories.filter(item => item.category == route.params.id),
  );

  const renderItem = ({item}) => (
    <View style={{flex: 1}}>
      <TouchableNativeFeedback
        key={item._id}
        style={{margin: 10}}
        onPress={() => {
          navigation.navigate('Items', {
            categoryID: item.category,
            subCategoryID: item._id,
          });
        }}
        background={TouchableNativeFeedback.Ripple('#bfe0ff', false)}>
        <View>
          <SubCategoriesCard
            image={item.image}
            name={item.subCategory}
            navigation={navigation}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );

  return (
    <View style={{flex: 1, marginTop: height * 0.02}}>
      <FlatList
        contentContainerStyle={{
          justifyContent: 'center',
        }}
        data={subCategoriesFromState}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        numColumns={3}
      />
    </View>
  );
};

export default SubCategories;

const styles = StyleSheet.create({});
