import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Icon, Input} from 'react-native-elements';

const Captcha = ({handleIsMatched}) => {
  const [captcha, setCaptcha] = useState('1234');
  const handleSubmit = () => {
    let r = (Math.random() + 1).toString(36).substr(2, 4);
    setCaptcha(r);
    handleIsMatched(false);
  };
  useEffect(() => {
    let r = (Math.random() + 1).toString(36).substr(2, 4);
    setCaptcha(r);
  }, []);

  const handleChange = val => {
    if (val == captcha) {
      handleIsMatched(true);
    } else {
      handleIsMatched(false);
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          height: 80,
          borderColor: 'grey',
          borderWidth: 1,
          width: '95%',
          alignSelf: 'center',
          marginTop: 10,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              textAlign: 'right',
              flex: 1,
              fontSize: 20,
              color: 'lightblue',
              fontWeight: 'bold',
            }}>
            {captcha}
          </Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Icon
              name="refresh"
              type="evilicon"
              color="green"
              size={50}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </View>
      <Input
        placeholder="Type above captcha here"
        onChangeText={handleChange}
      />
    </SafeAreaView>
  );
};

export default Captcha;

const styles = StyleSheet.create({});
