import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Camera} from 'expo-camera';
import {useIsFocused} from '@react-navigation/core';
import postData from '../components/PostData';
import {AddImageToAlbum} from '../components/HistoryAlbum';
import {Button} from 'react-native-paper';

const CameraScreen = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const isFocused = useIsFocused();
  let camera: Camera;

  useEffect(() => {
    (async () => {
      console.log(
        'in camera permissions request. Permission state: ' + hasPermission,
      );
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [hasPermission]);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  } else if (hasPermission !== null && isFocused) {
    return (
      <View style={styles.container}>
        {loading && (
          <Spinner
            visible={loading}
            textContent={'Идет поиск...'}
            textStyle={styles.spinnerTextStyle}
          />
        )}
        <Camera
          style={styles.camera}
          ref={r => {
            camera = r;
          }}
        />
        <Button
          style={styles.buttonStyle}
          mode="contained"
          icon="image-search"
          onPress={async () => {
            const photo = await camera.takePictureAsync();
            setLoading(true);
            const response = await postData(photo);
            setLoading(false);
            console.log(
              'Arguments in camera screen for output:',
              response,
              photo,
            );
            navigation.navigate('PhotoScreen', {
              inputPhoto: photo,
              links: response,
            });
            await AddImageToAlbum(photo);
          }}>
          Начать поиск
        </Button>
      </View>
    );
  } else {
    return <View />;
  }
};

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '90%',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  buttonStyle: {
    marginHorizontal: 30,
    marginVertical: 5,
  },
});

export default CameraScreen;
