import React from 'react';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

const albumName = 'FashionApp';

const askPermission = async () => {
  const isCameraRolledEnabled = await MediaLibrary.getAsync();
  if (isCameraRolledEnabled.granted) {
    return true;
  }
  const permission = await MediaLibrary.askAsync();
  if (permission.status === 'granted') {
    const cameraRollRes = await MediaLibrary.getAsync();
    console.log(cameraRollRes);
    return true;
  } else {
    console.log('User didnt take permission for using his gallery');
    return false;
  }
};

const AddImageToAlbum = async photo => {
  if (askPermission) {
    const album = await MediaLibrary.getAlbumAsync(albumName);
    const asset = await MediaLibrary.createAssetAsync(photo.uri);
    if (album) {
      await MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
    } else {
      await MediaLibrary.createAlbumAsync(albumName, asset, false);
    }
  }
};

export default AddImageToAlbum;
