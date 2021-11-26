import React from 'react';
import { Button, ImageBackground, TouchableOpacity, View } from "react-native";

const PhotoScreen = ({route, navigation}) => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',
      }}>
      <ImageBackground
        source={{uri: route.params.inputPhoto && route.params.inputPhoto.uri}}
        style={{
          flex: 1,
        }}
      />
      <TouchableOpacity>
        <Button
          title="Retake photo"
          onPress={() => navigation.navigate('Camera')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PhotoScreen;
