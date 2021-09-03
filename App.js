import React from 'react';
import Screens from './src/screens/Screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <Screens />
    </SafeAreaProvider>
  );
};

export default App;
