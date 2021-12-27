import React, {useEffect} from 'react';
import {Button, TouchableOpacity, View} from 'react-native';
import takePhotoFromGallery from '../components/TakePhotoFromGallery';
import {ShowHistory, TakeAssetsFromAlbum} from '../components/HistoryAlbum';
import {useIsFocused} from '@react-navigation/core';

const MainScreen = ({navigation}) => {
  const [assetsInAlbum, updateAssetsList] = React.useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getAssets = async () => {
      const assets = await TakeAssetsFromAlbum();
      updateAssetsList(assets);
    };
    getAssets();
  }, [assetsInAlbum]);

  const updateHistory = async () => {
    const assets = await TakeAssetsFromAlbum();
    await updateAssetsList(assets);
  };

  return (
    <View>
      <TouchableOpacity>
        <Button
          title="Launch Camera"
          onPress={async () => {
            navigation.navigate('Camera');
            await updateHistory();
          }}
        />
        <Button
          title="Take photo from gallery"
          onPress={async () => {
            await takePhotoFromGallery();
            await updateHistory();
          }}
        />
        {isFocused && <ShowHistory assets={assetsInAlbum} />}
      </TouchableOpacity>
    </View>
  );
};
export default MainScreen;
