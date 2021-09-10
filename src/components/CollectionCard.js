import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {width, height} from '../constants/Dimensions';

const CollectionCard = ({data, navigation}) => {
  console.log(data, 'dataaaaaaaaaaaaaaaaaaaaaaaa');
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate('ItemView', {item});
      }}>
      <Image style={styles.image} source={{uri: item.image}} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={2}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
};

export default CollectionCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.49,
    height: height * 0.3,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    height: height * 0.49,
    width: width * 0.49,
  },
  title: {
    color: 'grey',
  },
  price: {
    color: 'black',
  },
});
