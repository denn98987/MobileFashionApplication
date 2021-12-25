import React from 'react';
import {Button, TouchableOpacity, View} from 'react-native';
import takePhotoFromGallery from '../components/TakePhotoFromGallery';
import {ShowHistory} from '../components/HistoryAlbum';

const MainScreen = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity>
        <Button
          title="Launch Camera"
          onPress={() => navigation.navigate('Camera')}
        />
        <Button
          title="Take photo from gallery"
          onPress={() => {
            takePhotoFromGallery();
          }}
        />
        <ShowHistory />
      </TouchableOpacity>
    </View>
  );
};
export default MainScreen;
