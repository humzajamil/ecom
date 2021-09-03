import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, ActivityIndicator} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../store/actions/auth';

const Login = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const dispatch = useDispatch(loginUser);
  const handleSubmit = () => {
    let data = {email, password};
    dispatch(loginUser(data));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <Input
        placeholder="email"
        keyboardType="email-address"
        onChangeText={text => setemail(text)}
      />
      <Input
        placeholder="password"
        keyboardType="default"
        onChangeText={text => setpassword(text)}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Button
          title="Sign Up"
          type="outline"
          onPress={() => navigation.navigate('Signup')}
        />
        <Button title="Sign In" type="solid" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
