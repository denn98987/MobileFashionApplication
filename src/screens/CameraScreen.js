import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {Camera} from 'expo-camera';
import {useIsFocused} from '@react-navigation/core';
import postData from '../components/PostData';
import AddImageToAlbum from '../components/HistoryAlbum';

const CameraScreen = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
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
        <Camera
          style={styles.camera}
          ref={r => {
            camera = r;
          }}
        />
        <Button
          title="Take photo"
          onPress={async () => {
            const photo = await camera.takePictureAsync();
            navigation.navigate('PhotoScreen', {inputPhoto: photo});
            await postData(photo);
            await AddImageToAlbum(photo);
          }}
        />
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
});

export default CameraScreen;
