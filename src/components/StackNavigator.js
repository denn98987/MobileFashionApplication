import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import CameraScreen from '../screens/CameraScreen';
import PhotoScreen from '../screens/PhotoScreen';
import HistoryPhotoScreen from '../screens/HistoryPhotoScreen';
import {ShowHistory} from './HistoryAlbum';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="PhotoScreen" component={PhotoScreen} />
      <Stack.Screen name="HistoryPhotoScreen" component={HistoryPhotoScreen} />
      <Stack.Screen name="ShowHistory" component={ShowHistory} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
