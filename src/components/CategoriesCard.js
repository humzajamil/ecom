import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Icon, Image} from 'react-native-elements';
import {width, height} from '../constants/Dimensions';

const CategoriesCard = ({image, name}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        width: width * 0.15,
      }}>
      <View>
        <Image
          source={{uri: image}}
          style={{
            height: height * 0.05,
            width: width * 0.15,
            resizeMode: 'contain',
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 10,
          textAlign: 'center',
          width: width * 0.15,
          position: 'relative',
        }}>
        {name}
      </Text>
    </View>
  );
};

export default CategoriesCard;

const styles = StyleSheet.create({});
