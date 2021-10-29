/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import MainScreen from './src/screens/MainScreen';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/components/StackNavigator';

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
  },
});

export default App;
