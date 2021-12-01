import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {Camera} from 'expo-camera';

const CameraScreen = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  let camera: Camera;

  useEffect(() => {
    (async () => {
      console.log(
        'in camera permissions request. Permission state: ' + hasPermission,
      );
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
          navigation.navigate('PhotoScreen', {inputPhoto: photo});
          await sendBase64ToServer(photo);
        }}
      />
    </View>
  );
};

const UploadPhoto = async photoData => {
  let rawImage = photoData.base64;
  let body = new FormData();
  body.append('image', rawImage);
  //body.append('Content-Type', 'image/png');

  fetch('https://product-detecting.herokuapp.com/api/image', {
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    body: body,
  }).then(resp => {
    console.log(resp);
  });
};
const handleResponse = ({target}) => {
  console.log(target.responseText);
};

const sendBase64ToServer = photoData => {
  let image = {
    uri: photoData.uri,
    type: 'image/jpeg',
    name: 'photo.jpg',
  };
  const xhr = new XMLHttpRequest();
  const data = new FormData();

  data.append('image', image);
  xhr.addEventListener('load', handleResponse);
  xhr.open('POST', 'https://product-detecting.herokuapp.com/api/image');
  xhr.send(data);
};

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '90%',
  },
});

export default CameraScreen;
