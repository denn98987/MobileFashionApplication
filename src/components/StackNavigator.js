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
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{title: 'Камера'}}
      />
      <Stack.Screen
        name="PhotoScreen"
        component={PhotoScreen}
        options={{title: 'Результат поиска'}}
      />
      <Stack.Screen name="HistoryPhotoScreen" component={HistoryPhotoScreen} />
      <Stack.Screen
        name="ShowHistory"
        component={ShowHistory}
        options={{title: 'История'}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
