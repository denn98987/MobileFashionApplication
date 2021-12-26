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
    console.log('permissions for access to gallery: ' + cameraRollRes);
    return true;
  } else {
    console.log('User didnt take permission for using his gallery');
    return false;
  }
};

const AddImageToAlbum = async photo => {
  const album = await MediaLibrary.getAlbumAsync(albumName);
  const asset = await MediaLibrary.createAssetAsync(photo.uri);
  if (album) {
    await MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
  } else {
    await MediaLibrary.createAlbumAsync(albumName, asset, false);
  }
};

const ShowHistory = () => {
  const [loading, setLoading] = React.useState(false);
  const [assetsInAlbum, updateAssetsList] = React.useState(null);

  useEffect(() => {
    const getAssets = async () => {
      if (await askPermission()) {
        const album = await MediaLibrary.getAlbumAsync(albumName);
        console.log(album);
        if (album) {
          const assetsInAlbum = await MediaLibrary.getAssetsAsync({album});
          console.log(assetsInAlbum);
          updateAssetsList(assetsInAlbum);
        }
      }
    };
    getAssets();
  }, []);

  if (assetsInAlbum && assetsInAlbum) {
    return (
      <ScrollView
        style={styles.ImageContainer}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
        horizontal={false}>
        {assetsInAlbum.assets.map((asset, i) => {
          return (
            <View
              style={{
                padding: 5,
              }}
              key={i}>
              <Image
                source={{uri: asset.uri}}
                style={[
                  styles.Image,
                  {
                    width: i % 2 === 1 ? 150 : 95,
                    height: i % 2 === 1 ? 150 : 95,
                  },
                ]}
                resizeMode="center"
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
    shadowColor: 'black',
    shadowOffset: {
      width: -10,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});

export {AddImageToAlbum, ShowHistory};
