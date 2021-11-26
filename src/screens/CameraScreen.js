import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {Camera} from 'expo-camera';

const CameraScreen = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  let camera: Camera;

  useEffect(() => {
    (async () => {
      console.log('in camera permissions request. Permission state: ' + hasPermission);
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
          const photo = await camera.takePictureAsync({base64: true});
          //console.log(photo);
          navigation.navigate('PhotoScreen', {inputPhoto: photo});
          UploadPhoto(photo);
        }}
      />
    </View>
  );
};

const UploadPhoto = photoData => {
  let rawImage = photoData.base64;
  let uploadData = new FormData();
  uploadData.append('image', rawImage);
  fetch('https://product-detecting.herokuapp.com/', {
    method: 'post',
    body: uploadData,
  }).then(resp => {
    console.log(resp);
  });
};

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '90%',
  },
});

export default CameraScreen;
