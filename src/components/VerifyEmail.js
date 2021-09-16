import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {Button, Image, Input, Text} from 'react-native-elements';
import {Email} from '../images';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../store/actions/register';
import SuccessfulModal from './SuccessfulModal';
import axios from 'axios';

const VerifyEmail = ({navigation, route}) => {
  const inp1 = useRef();
  const inp2 = useRef();
  const inp3 = useRef();
  const inp4 = useRef();
  const [input1, setInput1] = useState(null);
  const [input2, setInput2] = useState(null);
  const [input3, setInput3] = useState(null);
  const [input4, setInput4] = useState(null);
  const [show, setShow] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  // const [otp, setOtp] = useState(route.params.otp);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setShowLoader(true);
    let code = input1 + input2 + input3 + input4;
    let match = await axios.post('http://192.168.18.94:5000/verify-email', {
      email: route.params.data.email,
      otp: code,
    });
    if (match.status == 200) {
      setShowLoader(false);
      dispatch(registerUser(route.params.data));
      setShowLoader(false);

      setShow(true);
    } else {
      setWrong(true);
      console.log('mismatched');
    }
  };

  const handleResend = async () => {
    try {
      await axios.post('http://192.168.18.94:5000/generate-otp', {
        email: route.params.data.email,
      });
      alert('Verification code sent');
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      {show ? <SuccessfulModal navigation={navigation} /> : null}
      <KeyboardAvoidingView
        keyboardVerticalOffset={-100}
        behavior="position"
        contentContainerStyle={{
          flex: 1,
        }}>
        <View style={{alignSelf: 'center', marginTop: 100}}>
          <Image source={Email} style={{width: 200, height: 200}} />
          <Text h3 style={{color: 'green'}}>
            Verification Code
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          <Text>Please Enter Verification Code sent to </Text>
          <Text style={{color: 'green', textDecorationLine: 'underline'}}>
            {route.params.data.email}
          </Text>
        </View>
        <View
          style={{
            width: '50%',
            flexDirection: 'row',
            marginTop: 20,
            alignSelf: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{width: 40}}>
            <TextInput
              autoFocus={true}
              value={input1?.input1}
              ref={inp1}
              onKeyPress={eve => {
                if (eve.nativeEvent.key == 'Backspace') {
                  console.log('invoked');
                  if (input1 != null) {
                    setInput1(null);
                  }
                }
              }}
              onChangeText={val => {
                setInput1(val.length == 0 ? null : val);
                if (val.length > 0) {
                  inp2.current.focus();
                }
              }}
              maxLength={1}
              keyboardType="number-pad"
              style={{
                color: 'black',
                borderBottomColor: 'black',
                borderWidth: 0.5,
                textAlign: 'center',
              }}
            />
          </View>
          <View style={{width: 40}}>
            <TextInput
              value={input2?.input2}
              ref={inp2}
              onKeyPress={eve => {
                if (eve.nativeEvent.key == 'Backspace') {
                  if (input2 != null) {
                    setInput2(null);
                  } else {
                    inp1.current.focus();
                  }
                }
              }}
              onChangeText={val => {
                setInput2(val.length == 0 ? null : val);
                if (val.length > 0) {
                  inp3.current.focus();
                }
              }}
              maxLength={1}
              keyboardType="number-pad"
              style={{
                color: 'black',
                borderBottomColor: 'black',
                borderWidth: 0.5,
                textAlign: 'center',
              }}
            />
          </View>
          <View style={{width: 40}}>
            <TextInput
              value={input3?.input3}
              ref={inp3}
              onKeyPress={eve => {
                if (eve.nativeEvent.key == 'Backspace') {
                  if (input3 != null) {
                    setInput3(null);
                  } else {
                    inp2.current.focus();
                  }
                }
              }}
              onChangeText={val => {
                setInput3(val.length == 0 ? null : val);
                if (val.length > 0) {
                  inp4.current.focus();
                }
              }}
              maxLength={1}
              keyboardType="number-pad"
              style={{
                color: 'black',
                borderBottomColor: 'black',
                borderWidth: 0.5,
                textAlign: 'center',
              }}
            />
          </View>
          <View style={{width: 40}}>
            <TextInput
              value={input4?.input4}
              ref={inp4}
              onKeyPress={eve => {
                if (eve.nativeEvent.key == 'Backspace') {
                  if (input4 != null) {
                    setInput4(null);
                  } else {
                    inp3.current.focus();
                  }
                }
              }}
              onChangeText={val => {
                setInput4(val.length == 0 ? null : val);
              }}
              maxLength={1}
              keyboardType="number-pad"
              style={{
                color: 'black',
                borderBottomColor: 'black',
                borderWidth: 0.5,
                textAlign: 'center',
              }}
            />
          </View>
        </View>
        {wrong ? (
          <Text style={{color: 'red', textAlign: 'center'}}>
            Wrong pin, please try again
          </Text>
        ) : null}
        <View
          style={{
            marginTop: 200,
          }}>
          <Button
            icon={
              showLoader ? (
                <ActivityIndicator
                  size={20}
                  color="white"
                  style={{paddingRight: 5}}
                />
              ) : null
            }
            disabled={input1 && input2 && input3 && input4 ? false : true}
            onPress={handleSubmit}
            title="VERIFY"
            type="solid"
            titleStyle={{color: 'white'}}
            buttonStyle={{
              backgroundColor: 'green',
              width: '80%',
              alignSelf: 'center',
              marginBottom: 10,
            }}
          />
          <Button
            onPress={handleResend}
            buttonStyle={{borderColor: 'white'}}
            title="Resend Code"
            type="outline"
            titleStyle={{color: 'green'}}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({});
