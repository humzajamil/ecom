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
import {Rating, AirbnbRating} from 'react-native-ratings';

const ItemsCard = ({image, name, price, stars}) => {
  return (
    <View style={styles.item}>
      <Image
        resizeMode="stretch"
        source={{uri: image[0]}}
        style={styles.image}
      />
      <View style={{alignItems: 'flex-start', paddingLeft: 5}}>
        <Text style={styles.title}>{name}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 10, color: 'darkorange'}}>Rs.</Text>
          <Text style={styles.price}> {price}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Rating
            startingValue={Number(stars)}
            readonly={true}
            imageSize={12}
            ratingColor="#3498db"
            ratingCount={5}
            style={{paddingBottom: 10}}
          />
          <Text
            style={{fontSize: 12, color: 'lightgrey', top: -3, paddingLeft: 5}}>
            (1)
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ItemsCard;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    width: width * 0.45,
    height: height * 0.3,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    height: height * 0.2,
    width: width * 0.45,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  price: {
    color: 'darkorange',
    paddingVertical: 10,
  },
});
