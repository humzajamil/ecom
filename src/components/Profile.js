import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {useSelector} from 'react-redux';

import MapView, {Marker} from 'react-native-maps';

const Profile = () => {
  const user = useSelector(state => state.register.user);

  return (
    <ScrollView>
      <Input value={user.firstName} disabled />
      <Input value={user.lastName} disabled />
      <Input value={user.mobile} disabled />
      <Input value={user.email} disabled />
      <Input value={user.city} disabled />
      <Input value={user.state} disabled />
      <Input value={user.country} disabled />
      <MapView
        style={{height: 500, width: '95%', alignSelf: 'center'}}
        // onRegionChange={getLocation}
        initialRegion={{
          latitude: Number(user.coordinates[0]),
          longitude: Number(user.coordinates[1]),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: Number(user.coordinates[0]),
            longitude: Number(user.coordinates[1]),
          }}
        />
      </MapView>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
