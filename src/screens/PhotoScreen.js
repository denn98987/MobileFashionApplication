import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  Linking,
  StyleSheet,
} from 'react-native';
import {Button} from 'react-native-paper';

const handleClick = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " + url);
    }
  });
};

const urlParse = urlText => {
  return urlText.split('/')[2];
};

const PhotoScreen = ({route, navigation}) => {
  const links = route.params.links.links;
  console.log('Params for PhotoScreen:', route.params);
  return (
    <ScrollView>
      <View style={styles.inputImageContainer}>
        <Image
          style={styles.inputImage}
          source={{uri: route.params.inputPhoto.uri}}
        />
      </View>
      <ScrollView style={styles.linksContainer} horizontal={true}>
        {links.map((link, i) => {
          return (
            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => handleClick(link.href)}
              key={i}>
              <Image source={{uri: link.icon}} style={styles.productIcon} />
              <Text>{urlParse(link.href)}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity>
        <Button
          style={styles.buttonStyle}
          mode="outlined"
          onPress={() => navigation.navigate('Camera')}>
          Сделать новое фото
        </Button>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  linkItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  linksContainer: {
    padding: 10,
  },
  productIcon: {
    width: 110,
    height: 140,
    margin: 7,
    borderRadius: 10,
  },
  inputImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputImage: {
    width: 300,
    height: 270,
  },
  buttonStyle: {
    marginHorizontal: 30,
    marginVertical: 5,
  },
});

export default PhotoScreen;
