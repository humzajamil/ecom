import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Icon, Image} from 'react-native-elements';
import {width, height} from '../constants/Dimensions';

const SubCategoriesCard = ({image, name}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        width: width * 0.25,
      }}>
      <View>
        <Image
          source={{uri: image}}
          style={{
            height: height * 0.1,
            width: width * 0.2,
            resizeMode: 'contain',
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          width: width * 0.2,
        }}>
        {name}
      </Text>
    </View>
  );
};

export default SubCategoriesCard;

const styles = StyleSheet.create({});
