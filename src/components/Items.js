import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {height, width} from '../constants/Dimensions';
import {getItems} from '../store/actions/items';
import ItemsCard from './ItemsCard';

const Items = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, []);

  const dispatch = useDispatch();
  const getItemsFunc = () => {
    dispatch(getItems());
  };
  useEffect(() => {
    getItemsFunc();
  }, []);

  const itemsFromState = useSelector(state =>
    state.items.filter(
      item =>
        item.category == route.params.categoryID &&
        item.subcategory == route.params.subCategoryID,
    ),
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      key={item._id}
      style={{
        margin: 10,
      }}
      onPress={() => {
        navigation.navigate('ItemView', {
          item: item,
        });
      }}>
      <ItemsCard
        image={item.images}
        name={item.name}
        price={item.price}
        stars={item.stars}
        navigation={navigation}
      />
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={itemsFromState}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        numColumns={2}
      />
    </View>
  );
};

export default Items;

const styles = StyleSheet.create({});
