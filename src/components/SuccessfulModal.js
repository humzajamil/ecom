import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {Overlay, Text, Button, Icon, Image} from 'react-native-elements';
import {Checked} from '../images';

const SuccessfulModal = ({navigation}) => {
  return (
    <View>
      <Overlay isVisible={true}>
        <View style={{alignItems: 'center'}}>
          <Image source={Checked} style={{width: 100, height: 100}} />
          <Text h3 style={{marginTop: 10}}>
            Success!
          </Text>
          <View>
            <Text
              style={{
                marginTop: 50,
                marginBottom: 50,
                paddingHorizontal: 50,
                textAlign: 'center',
              }}>
              Your account has been created successfully
            </Text>
          </View>
          <Button
            onPress={() => {
              navigation.navigate('Signin');
            }}
            containerStyle={{marginBottom: 5}}
            buttonStyle={{
              backgroundColor: 'green',
              paddingHorizontal: 30,
              borderRadius: 30,
              alignItems: 'center',
            }}
            icon={
              <Icon
                style={{paddingLeft: 10}}
                name="arrow-right"
                type="evilicon"
                size={30}
                color="white"
              />
            }
            iconPosition="right"
            title="Sign In"
          />
        </View>
      </Overlay>
    </View>
  );
};

export default SuccessfulModal;

const styles = StyleSheet.create({});
