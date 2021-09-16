import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Button, Input, Icon, Text} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import {TextInputMask} from 'react-native-masked-text';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
import postalCodes from 'postal-codes-js';
import Captcha from './Captcha';

let url = 'https://api.countrystatecity.in/v1/countries';
let key = 'VDBZWTcwdTBwQThMSU1QMjFYanZMZE94OTZ2R0lJaHJxMEh1eFhqOA==';
Geocoder.init('AIzaSyD83MK2lCE6lXbNeDhDwqdhzUbgmnfKHlE');
let nameReg = new RegExp('^[a-zA-Z]+$');
let emailReg = new RegExp('^[^s@]+@[^s@]+.[^s@]+$');

const Register = ({navigation}) => {
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);
  const [iso2, setIso2] = useState(null);
  const [stateiso2, setStateIso2] = useState(null);
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [noteColor, setNotecolor] = useState('');
  const [isMatched, setIsMatched] = useState('');
  const [sabSet, setSabSet] = useState(true);
  const [captchaOk, setCaptchaOk] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  //form states
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(0);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState(0);
  const [code, setCode] = useState('92');
  const [num, setNum] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [coordinates, setCoordinates] = useState({});
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');

  const refInp1 = useRef();
  const refInp2 = useRef();
  const refInp3 = useRef();
  const refInp4 = useRef();
  const refInp5 = useRef();

  const handleSubmit = async () => {
    setShowLoader(true);
    let data = {
      firstName,
      lastName,
      email,
      password,
      dob: `${(dob.getMonth() + 1).toString()}/${dob.getDate().toString()}/${dob
        .getFullYear()
        .toString()}`,
      country,
      state,
      city: selectedCity,
      mobile: `+${code}${num}`,
      zipCode: postalCode,
      coordinates: [coordinates.latitude, coordinates.longitude],
    };
    await axios.post('http://192.168.18.94:5000/generate-otp', {
      email,
    });
    setShowLoader(false);
    // console.log(res.data.Otp, 'From register component');
    navigation.navigate('Verify Email', {data: data});
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShow(false);
    setDob(currentDate);
  };

  const getCities = async () => {
    if (stateiso2) {
      let {data} = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${iso2}/states/${stateiso2}/cities`,
        {
          headers: {
            'X-CSCAPI-KEY': key,
          },
        },
      );
      setCities(data);
    }
  };

  const getLocation = coords => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 500000,
    })
      .then(location => {
        Geocoder.from({
          latitude: coords ? coords.latitude : location.latitude,
          longitude: coords ? coords.longitude : location.longitude,
        })
          .then(json => {
            let {formatted_address} = json.results[0];
            setAddress(formatted_address);
          })
          .catch(error => console.log(error));
        setCoordinates({
          latitude: coords ? coords.latitude : location.latitude,
          longitude: coords ? coords.longitude : location.longitude,
        });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const getCountries = async () => {
    console.log('in countries');
    let {data} = await axios.get(url, {
      headers: {
        'X-CSCAPI-KEY': key,
      },
    });
    setCountries(data);
  };

  useEffect(() => {
    getLocation();
    getCountries();
  }, []);

  const getStates = async () => {
    console.log(iso2, 'in states');
    if (iso2) {
      let {data} = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${iso2}/states`,
        {
          headers: {
            'X-CSCAPI-KEY': key,
          },
        },
      );
      setStates(data);
    }
  };

  const getCode = async () => {
    if (iso2) {
      let {data} = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${iso2}`,
        {
          headers: {
            'X-CSCAPI-KEY': key,
          },
        },
      );
      setCode(data.phonecode);
    }
  };

  useEffect(() => {
    getStates();
    getCode();
    console.log(selectedCountry, 'from use effect');
  }, [iso2, selectedCountry]);

  useEffect(() => {
    getCities();
    console.log(stateiso2, 'useEffect state iso2');
  }, [stateiso2]);

  useEffect(() => {}, [address]);
  useEffect(() => {
    if (password.length >= 8) {
      setNote('Strong Password');
      setNotecolor('green');
    } else if (password.length >= 5) {
      setNote('Weak Password');
      setNotecolor('#FDDA0D');
    } else {
      setNote('Too Short');
      setNotecolor('red');
    }
  }, [password]);

  const handleIsMatched = val => {
    console.log(val);
    setCaptchaOk(val);
  };

  return (
    <ScrollView style={{flex: 1}}>
      {!countries && coordinates ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color="red" />
        </View>
      ) : (
        <View>
          <Text h2 style={{alignSelf: 'center', marginTop: 20}}>
            Welcome To Bazaar
          </Text>
          <View>
            <Input
              ref={refInp1}
              returnKeyType="next"
              onSubmitEditing={() => {
                refInp2.current.focus();
              }}
              blurOnSubmit={false}
              placeholder="First Name"
              keyboardType="default"
              onChangeText={text => {
                setFirstName(text);
              }}
            />
            {!nameReg.test(firstName) ? (
              <Text style={{color: 'red', marginLeft: 15, marginTop: -20}}>
                Invalid field
              </Text>
            ) : null}
            <Input
              ref={refInp2}
              returnKeyType="next"
              onSubmitEditing={() => {
                refInp3.current.focus();
              }}
              blurOnSubmit={false}
              placeholder="Last Name"
              keyboardType="default"
              onChangeText={text => {
                setLastName(text);
              }}
            />
            {!nameReg.test(lastName) ? (
              <Text style={{color: 'red', marginLeft: 15, marginTop: -20}}>
                Invalid field
              </Text>
            ) : null}
            <Input
              ref={refInp3}
              returnKeyType="next"
              onSubmitEditing={() => {
                refInp4.current.focus();
                setShow(true);
              }}
              blurOnSubmit={false}
              placeholder="email"
              keyboardType="email-address"
              onChangeText={text => {
                setEmail(text);
              }}
            />
            {!emailReg.test(email) ? (
              <Text style={{color: 'red', marginLeft: 15, marginTop: -20}}>
                Invalid email
              </Text>
            ) : null}
            <TouchableOpacity
              onPress={() => {
                setShow(true);
              }}>
              <Input
                ref={refInp4}
                returnKeyType="next"
                onSubmitEditing={() => {
                  refInp5.current.focus();
                }}
                blurOnSubmit={false}
                placeholder="DOB"
                keyboardType="default"
                disabled
                value={
                  dob
                    ? `${(dob.getMonth() + 1).toString()}/${dob
                        .getDate()
                        .toString()}/${dob.getFullYear().toString()}`
                    : null
                }
              />
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  onChange={onChange}
                  maximumDate={new Date()}
                />
              )}
            </TouchableOpacity>
            <Picker
              selectedValue={selectedCountry}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedCountry(itemValue);
                itemValue ? setCountry(itemValue.name) : null;
                itemValue ? setIso2(itemValue.iso2) : null;
              }}>
              <Picker.Item label="--Select Country--" value={null} />
              {countries.map(country => (
                <Picker.Item
                  key={country.id}
                  label={country.name}
                  value={country}
                />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedState}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedState(itemValue);
                console.log(itemValue);
                itemValue ? setState(itemValue.name) : null;
                itemValue ? setStateIso2(itemValue.iso2) : null;
              }}>
              <Picker.Item label="--Select State--" value={null} />
              {states?.map(state => (
                <Picker.Item key={state.id} label={state.name} value={state} />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedCity}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedCity(itemValue);
              }}>
              <Picker.Item label="--Select City--" value={null} />
              {cities?.map(city => (
                <Picker.Item
                  key={city.id}
                  label={city.name}
                  value={city.name}
                />
              ))}
            </Picker>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 15,
              }}>
              <Text style={{fontSize: 18}}>{code}</Text>
              <TextInputMask
                returnKeyType="next"
                onSubmitEditing={() => {
                  refInp5.current.focus();
                }}
                blurOnSubmit={false}
                type={'custom'}
                style={{marginLeft: 5, color: 'black', fontSize: 18}}
                placeholder="(336)-513-0514"
                keyboardType="phone-pad"
                options={{
                  mask: '(999) 999-9999',
                }}
                value={num}
                onChangeText={text => {
                  setNum(text);
                }}
              />
            </View>
            <Input
              ref={refInp5}
              placeholder="Postal Code"
              keyboardType="number-pad"
              onChangeText={text => {
                setPostalCode(text);
              }}
            />
            {postalCodes.validate(iso2, postalCode) !== true ? (
              <Text style={{color: 'red', marginLeft: 15, marginTop: -20}}>
                Invalid Postal Code
              </Text>
            ) : null}
            <Input
              disabled
              style={{fontSize: 12, flexWrap: 'wrap'}}
              multiline={true}
              value={address}
              placeholder="location select from map"
            />
            <MapView
              style={{height: 400, width: '90%', alignSelf: 'center'}}
              // onRegionChange={getLocation}
              initialRegion={{
                latitude:
                  coordinates.latitude != undefined ? coordinates.latitude : 0,
                longitude:
                  coordinates.longitude != undefined
                    ? coordinates.longitude
                    : 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                draggable
                coordinate={
                  coordinates.latitude != undefined
                    ? coordinates
                    : {latitude: 0, longitude: 0}
                }
                onDragEnd={e => getLocation(e.nativeEvent.coordinate)}
              />
            </MapView>
            <Input
              style={{flexWrap: 'wrap', paddingTop: 50}}
              placeholder="password"
              keyboardType="default"
              onChangeText={text => {
                setIsMatched(text == password);
                setPassword(text);
              }}
            />
            {password ? (
              <Text style={{color: noteColor, marginLeft: 15, marginTop: -20}}>
                {note}
              </Text>
            ) : null}

            <Input
              disabled={password.length > 0 ? false : true}
              style={{flexWrap: 'wrap'}}
              placeholder="confirm password"
              keyboardType="default"
              onChangeText={text => {
                setIsMatched(text == password);
              }}
            />
            {isMatched ? (
              <Text style={{color: 'green', marginLeft: 15, marginTop: -20}}>
                Password Matched
              </Text>
            ) : null}
            <Captcha handleIsMatched={handleIsMatched.bind(this)} />

            <View style={{marginTop: 20, marginBottom: 20}}>
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
                disabled={!(isMatched && captchaOk)}
                onPress={handleSubmit}
                title="Verify Email"
                type="solid"
                buttonStyle={{
                  alignSelf: 'center',
                  width: '50%',
                }}
              />
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({});
