import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
          title="Подключить камеру"
          onPress={async () => {
            navigation.navigate('Camera');
            await updateHistory();
          }}
        />
        <Button
          title="Взять фото из галлереи"
          onPress={async () => {
            await takePhotoFromGallery();
            await updateHistory();
          }}
        />
        <Text style={styles.boldText}>Последние поиски</Text>
        {isFocused && (
          <ShowHistory assets={assetsInAlbum} navigation={navigation} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 10,
    marginLeft: 20,
  },
});

export default MainScreen;
