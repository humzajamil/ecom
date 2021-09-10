import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../store/actions/auth';
import {Icon, Text} from 'react-native-elements';

const Login = ({navigation}) => {
  let view;
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [load, setLoad] = useState(false);
  const token = useSelector(state => state.register.token);
  const error = useSelector(state => state.register.error);
  const dispatch = useDispatch(loginUser);
  const handleSubmit = () => {
    setLoad(true);
    let data = {email, password};
    dispatch(loginUser(data));
  };

  useEffect(() => {
    console.log(token, 'token');
    if (token) {
      setLoad(false);
      navigation.navigate('Home');
    }
  }, [token]);

  useEffect(() => {
    console.log(error, 'error');
    if (error) {
      console.log(error);
      setLoad(false);
      alert(error);
    }
  }, [error]);

  if (load) {
    view = (
      <View style={{flex: 1}}>
        <Modal animationType="slide" visible={load}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'red',
                backgroundColor: 'white',
                borderRadius: 6,
                padding: 35,
                shadowColor: '#000',
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <ActivityIndicator
                color="red"
                size="small"
                style={{marginRight: 15}}
              />
              <Text>Signing in..</Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  } else {
    view = (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Input
          value={email}
          placeholder="email"
          keyboardType="email-address"
          onChangeText={text => setemail(text)}
        />
        <Input
          secureTextEntry={true}
          value={password}
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
          <Button
            disabled={email.length == 0 || password == 0 ? true : false}
            title="Sign In"
            type="solid"
            onPress={handleSubmit}
          />
        </View>
      </SafeAreaView>
    );
  }

  return view;
};

export default Login;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
});
