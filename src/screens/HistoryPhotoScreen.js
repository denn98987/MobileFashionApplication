import React from 'react';
import {Button, ImageBackground, TouchableOpacity, View} from 'react-native';
import postData from '../components/PostData';

const HistoryPhotoScreen = ({route, navigation}) => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',
      }}>
      <ImageBackground
        source={{uri: route.params.inputPhotoUri}}
        style={{
          flex: 1,
        }}
      />
      <TouchableOpacity>
        <Button
          title="Вернуться на главную"
          onPress={() => navigation.navigate('MainScreen')}
        />
        <Button
          title="Начать поиск"
          onPress={async () => {
            await postData(route.params.inputPhotoUri);
            navigation.navigate('MainScreen');
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HistoryPhotoScreen;
