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
      <Image style={styles.image} source={{uri: route.params.item.image}} />
      <View style={styles.textMain}>
        <Text style={styles.title}>{route.params.item.name}</Text>
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
    height: height * 0.5,
    marginBottom: 20,
  },
  textMain: {
    paddingLeft: 15,
  },
  title: {
    color: 'grey',
    marginBottom: 5,
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
});
