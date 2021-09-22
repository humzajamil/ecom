import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {height, width} from '../constants/Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';

const ItemView = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params.item.name,
    });
  }, []);
  return (
    <View style={styles.container}>
      <Image
        resizeMode="stretch"
        style={styles.image}
        source={{uri: route.params.item.images[0]}}
      />
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <Text style={{fontSize: 18, color: 'darkorange', fontWeight: 'bold'}}>
          Rs.
        </Text>
        <Text style={styles.price}>{route.params.item.price}</Text>
      </View>

      <View
        style={{
          backgroundColor: 'white',
          width: width * 0.95,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          marginBottom: height * 0.03,
        }}>
        <Text style={{fontSize: 16, color: 'lightgrey', width: '40%'}}>
          Product
        </Text>
        <Text style={styles.title}>{route.params.item.name}</Text>
      </View>

      <View
        style={{
          backgroundColor: 'white',
          width: width * 0.95,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: 'lightgrey',
            width: '40%',
            alignSelf: 'flex-start',
          }}>
          Description
        </Text>
        <Text style={styles.title}>{route.params.item.description}</Text>
      </View>
    </View>
  );
};

export default ItemView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width * 1,
    height: height * 0.4,
  },
  textMain: {
    paddingLeft: 15,
  },
  title: {
    padding: 5,
    fontSize: 16,
    justifyContent: 'center',
    textAlign: 'justify',
    width: '60%',
  },
  sizes: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  sizeText: {
    borderColor: 'lightgrey',
    borderWidth: 0.5,
    padding: 8,
    marginRight: 10,
  },
  bold: {
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  price: {
    color: 'darkorange',
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
});
