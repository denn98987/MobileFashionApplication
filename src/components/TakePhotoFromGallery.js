import React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import postData from './PostData';
import {AddImageToAlbum} from './HistoryAlbum';

const takePhotoFromGallery = () => {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      postData(response.assets[0]);
      AddImageToAlbum(response.assets[0]);
    }
  });
};

export default takePhotoFromGallery;
