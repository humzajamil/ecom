import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const Cell = () => {
  return (
    <View style={{width: 40}}>
      <TextInput
        maxLength={1}
        style={{
          color: 'black',
          borderBottomColor: 'black',
          borderWidth: 0.5,
          textAlign: 'center',
        }}
      />
    </View>
  );
};

export default Cell;

const styles = StyleSheet.create({});
