import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  View,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

const albumName = 'FashionApp';

const askPermission = async () => {
  const isCameraRolledEnabled = await MediaLibrary.getPermissionsAsync();
  if (isCameraRolledEnabled.granted) {
    return true;
  }
  const permission = await MediaLibrary.requestPermissionsAsync();
  if (permission.status === 'granted') {
    const cameraRollRes = await MediaLibrary.getPermissionsAsync();
    return true;
  } else {
    console.log('User didnt take permission for using his gallery');
    return false;
  }
};

const TakeAssetsFromAlbum = async () => {
  if (await askPermission()) {
    const album = await MediaLibrary.getAlbumAsync(albumName);
    const assetsInAlbum = await MediaLibrary.getAssetsAsync({album});
    if (album) {
      return assetsInAlbum;
    } else {
      return null;
    }
  }
};

const AddImageToAlbum = async photo => {
  const album = await MediaLibrary.getAlbumAsync(albumName);
  const asset = await MediaLibrary.createAssetAsync(photo.uri);
  console.log('new image in album');
  if (album) {
    await MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
  } else {
    await MediaLibrary.createAlbumAsync(albumName, asset, false);
  }
};

const ShowHistory = ({assets}) => {
  const [loading, setLoading] = React.useState(false);
  const [permission, setPermissions] = React.useState(false);

  useEffect(() => {
    const getAssets = () => {
      const askPermissionResult = askPermission();
      setPermissions(askPermissionResult);
    };
    getAssets();
  }, []);

  if (assets && permission) {
    return (
      <ScrollView
        style={styles.ImageContainer}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
        horizontal={false}>
        {assets.assets.map((asset, i) => {
          return (
            <View key={i}>
              <Image
                source={{uri: asset.uri}}
                style={styles.Image}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
              />
              {loading && <ActivityIndicator color="green" size="large" />}
            </View>
          );
        })}
      </ScrollView>
    );
  } else {
    return <View />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageContainer: {
    marginHorizontal: 16,
    marginTop: 30,
    width: '100%',
  },
  Image: {
    width: 110,
    height: 140,
    margin: 10,
    borderRadius: 10,
  },
});

export {AddImageToAlbum, ShowHistory, TakeAssetsFromAlbum, albumName};
