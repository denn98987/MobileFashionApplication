import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-paper';
import takePhotoFromGallery from '../components/TakePhotoFromGallery';
import {
  AddImageToAlbum,
  ShowHistory,
  TakeAssetsFromAlbum,
} from '../components/HistoryAlbum';
import {useIsFocused} from '@react-navigation/core';
import postData from '../components/PostData';
import Spinner from 'react-native-loading-spinner-overlay';

const MainScreen = ({navigation}) => {
  const [assetsInAlbum, updateAssetsList] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
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
    <View style={{marginTop: 20}}>
      <TouchableOpacity>
        {loading && (
          <Spinner
            visible={loading}
            textContent={'Идет поиск...'}
            textStyle={styles.spinnerTextStyle}
          />
        )}
        <Button
          style={styles.buttonStyle}
          icon="camera"
          mode="contained"
          onPress={async () => {
            navigation.navigate('Camera');
            await updateHistory();
          }}>
          Сделать фото
        </Button>

        <Button
          style={styles.buttonStyle}
          icon="image"
          mode="outlined"
          onPress={async () => {
            const galleryPhoto = await takePhotoFromGallery();
            if (galleryPhoto) {
              console.log('Gallery photo in main screen:', galleryPhoto);
              setLoading(true);
              const response = await postData(galleryPhoto);
              setLoading(false);
              console.log(
                'Arguments in gallery screen for output:',
                response,
                galleryPhoto,
              );
              navigation.navigate('PhotoScreen', {
                inputPhoto: galleryPhoto,
                links: response,
              });
              await AddImageToAlbum(galleryPhoto);
              await updateHistory();
            }
          }}>
          Взять из галлереи
        </Button>
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
  buttonStyle: {
    marginHorizontal: 30,
    marginVertical: 5,
  },
});

export default MainScreen;
