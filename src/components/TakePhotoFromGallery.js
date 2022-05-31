import React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

const takePhotoFromGallery = async () => {
  let outputPhotoData;
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  await launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      outputPhotoData = response.assets[0];
    }
  });
  return outputPhotoData;
};

export default takePhotoFromGallery;
