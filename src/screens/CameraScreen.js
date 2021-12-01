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
  body.append('photo', {
    image: rawImage,
    type: 'image/png',
  });
  body.append('Content-Type', 'image/png');

  fetch('https://product-detecting.herokuapp.com/api/image', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      otherHeader: 'foo',
    },
    body: body,
  }).then(resp => {
    console.log(resp);
  });
};

const sendBase64ToServer = photoData => {
  const rawImage = photoData.base64;

  let httpPost = new XMLHttpRequest();
  const path = 'https://product-detecting.herokuapp.com/api/image';
  const data = JSON.stringify({image: rawImage});

  httpPost.onreadystatechange = function (err) {
    if (this.readyState === 4 && this.status === 200) {
      console.log(this.responseText);
    } else {
      console.log(err);
    }
  };

  httpPost.open('POST', path, true);
  httpPost.setRequestHeader('Content-Type', 'application/json');
  httpPost.send(data);
};

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '90%',
  },
});

export default CameraScreen;
