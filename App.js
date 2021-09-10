import React from 'react';
import Screens from './src/screens/Screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="red" />
      <Screens />
    </SafeAreaProvider>
  );
};

export default App;
