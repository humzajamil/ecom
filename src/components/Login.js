import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {Button, Input, Icon, Text, Image} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../store/actions/auth';
import {width, height} from '../constants/Dimensions';
import {LoginImage} from '../images';

const Login = ({navigation, route}) => {
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
          marginTop: height * 0.2,
        }}>
        <View
          style={{
            alignSelf: 'center',
          }}>
          <Image
            source={LoginImage}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </View>

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
        <Text
          style={{
            textAlign: 'right',
            marginRight: 20,
            marginTop: -20,
            color: 'red',
          }}>
          Forgot Password?
        </Text>
        <View style={{marginTop: height * 0.05}}>
          <Button
            disabled={email.length == 0 || password == 0 ? true : false}
            containerStyle={{
              alignSelf: 'center',
              width: '80%',
              borderRadius: 30,
            }}
            titleStyle={{textAlign: 'center'}}
            buttonStyle={{backgroundColor: 'green'}}
            title="Sign In"
            type="solid"
            onPress={handleSubmit}
          />
          <Button
            containerStyle={{
              alignSelf: 'center',
              width: '80%',
              borderRadius: 30,
            }}
            titleStyle={{textAlign: 'center', color: 'green'}}
            buttonStyle={{borderWidth: 0}}
            title="Sign Up"
            type="outline"
            onPress={() => navigation.navigate('Signup')}
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
